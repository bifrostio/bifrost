import React, {Component} from 'react';
import moment from 'moment';
import {ProgressBar, Alert, Button, Modal, Input, Label} from 'react-bootstrap';
import UserModel from '../models/UserModel';
import BatchModel from '../models/BatchModel';

moment.locale(window.navigator.language);

export default class ProvisionActivity extends Component {
  state = {
    stationId: parseInt(this.props.params.id),
    batchId: 0,
    searchKey: '',
    batches: this.props.batches,
    curBatchActivities: [],
    showAlert: false,
    showSuccessAlert: false,
    showSearchNoResultAlert: false,
    showModal: false,
    isFormValidate: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({batches: nextProps.batches});
  }

  handleSearch = (event) => {
    const {searchKey} = this.state;

    BatchModel.searchByTrackingNumber(searchKey)
      .then((data) => {
        if (data && data.length > 0) {
          const batch = data[0];

          this.setState({
            batchId: batch.id,
            curBatchActivities: batch.provisionActivities,
            showModal: true
          });
        } else {
          // did not find any match batch
          this.setState({showSearchNoResultAlert: true});
        }
      })
      .catch(() => {
        this.setState({showAlert: true});
      });

    event.preventDefault();
  }

  handleSearchKeyChange = (event) => {
    this.setState({searchKey: event.target.value});
  }

  handleSearchNoResultAlertDismiss = () => {
    this.setState({
      showSearchNoResultAlert: false
    });
  }

  handleAlertDismiss = () => {
    this.setState({
      showAlert: false
    });
  }

  handleSuccessAlertDismiss = () => {
    this.setState({
      showSuccessAlert: false
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  }

  handleClickBatch = (id) => {
    const batch = this.state.batches[id];

    if (!batch || !batch.provisionActivities) {
      return;
    }


    this.setState({
      showModal: true,
      batchId: id,
      curBatchActivities: batch.provisionActivities,
      isFormValidate: false
    });
  }

  handleUpdateCount = () => {
    let body = [];

    Object.keys(this.props.provisionRequirements)
    .filter(key => {
      return !!this.refs[`act${key}`];
    })
    .forEach( key => {
      const shipped = parseInt(this.refs[`act${key}`].getValue()) || 0;

      if (shipped > 0) {
        const obj = {
          shipped: shipped,
          provisionRequirementId: key,
          batchId: this.state.batchId,
          stationId: this.state.stationId
        };

        body.push(obj);
      }
    });

    if (body.length <= 0) {
      this.handleCloseModal();
      return;
    }

    UserModel.updateProvisionActivity(body, this.handleUpdateSuccess, this.handleUpdateFail);

    this.handleCloseModal();
  }

  handleUpdateSuccess = (newProvisionActivities) => {
    if (!newProvisionActivities || newProvisionActivities.length <= 0) {
      return;
    }

    const {batchId} = newProvisionActivities[0];
    let newBatches = {...this.state.batches};

    let newBatch = newBatches[batchId];

    newProvisionActivities.forEach((provisionActivity) => {
      newBatch.provisionActivities.push(provisionActivity);
    });

    this.setState({
      showSuccessAlert: true,
      batches: newBatches
    });
  }

  handleUpdateFail = () => {
    this.setState({
      showAlert: true
    });
  }

  renderBatches() {
    const {batches} = this.state;
    let batchesTable = Object.keys(batches).map(key => {

      const item = batches[key];
      const contact = item._contact || {};
      let requirements = {};

      item.provisionActivities.forEach(activity => {
        let rid = activity.provisionRequirementId;
        if (!requirements[rid]) {
          requirements[rid] = {
            shipped: 0,
            promised: 0
          };
        }
        if (typeof(activity.shipped) === 'number') {
          requirements[rid].shipped += activity.shipped;
        }
        if (typeof(activity.promised) === 'number') {
          requirements[rid].promised += activity.promised;
        }
      });
      let percent = 0;
      let count = 0;

      Object.keys(requirements).forEach(key => {
        let req = requirements[key];
        if (req.promised > 0) {
          count++;
          percent += (req.shipped / req.promised);
        }
      });
      percent = percent / count * 100;

      return (
        <tr key={item.id} className="batches-item" onClick={this.handleClickBatch.bind(this, item.id)}>
          <td>{item.trackingNumber}</td>
          <td>{contact.name}</td>
          <td>{contact.email}</td>
          <td>{contact.phone}</td>
          <td>{moment(item.createdDate).format('LLL')}</td>
          <td>{item.note}</td>
          <td><ProgressBar now={percent} /></td>
        </tr>
      );
    });

    return batchesTable;
  }

  handleKeyPress = (e) => {
    const key = e.which;
    if (key === 101 || key === 45) {
      e.preventDefault();
    }
  }

  checkValidate = () => {
    const inputNum = Object.keys(this.props.provisionRequirements).length;
    let isValid = false;

    for (let i=1 ; i < inputNum ; i++) {
      const value = parseInt(this.refs[`act${i}`].getValue());
      if (value && value !== 0 && value > 0) {
        isValid = true;
        break;
      }
    }

    this.setState({isFormValidate: isValid});
  }

  renderSearchNoResultAlert() {
    if (!this.state.showSearchNoResultAlert) {
      return;
    }

    return (
      <Alert bsStyle="danger" onDismiss={this.handleSearchNoResultAlertDismiss}>
        <h4>{`沒有找到追蹤編號 ${this.state.searchKey} 的資料`}</h4>
      </Alert>
    );
  }

  renderErrorAlert() {
    if (!this.state.showAlert) {
      return;
    }

    return (
      <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
        <h4>Oops! You got an error!</h4>
        <p>Please wait a moment, and try again!</p>
      </Alert>
    );
  }

  renderSuccessAlert() {
    if (!this.state.showSuccessAlert) {
      return;
    }

    return (
      <Alert bsStyle="success" onDismiss={this.handleSuccessAlertDismiss}>
        <h4>Update Success!</h4>
      </Alert>
    );
  }

  renderActivity() {
    if (!this.state.showModal) {
      return;
    }

    const labelCol = 'col-xs-4';
    const inputCol = 'col-xs-8';
    const curActivities = this.state.curBatchActivities;
    const requirements = this.props.provisionRequirements;
    let reqCount = {};

    curActivities.forEach( item => {
      const pId = item.provisionRequirementId;
      const shipped = item.shipped || 0;
      const promised = item.promised || 0;

      if (reqCount[pId]) {
        reqCount[pId] = {
          shipped: reqCount[pId].shipped + shipped,
          promised: reqCount[pId].promised + promised
        };
      } else {
        reqCount[pId] = {shipped: shipped, promised: promised};
      }
    });

    const activities = Object.keys(requirements)
    .filter(key => {
      const promised = reqCount[key] && reqCount[key].promised || 0;
      return promised > 0;
    })
    .map( key => {
      const requirement = requirements[key];
      const promised = reqCount[key] && reqCount[key].promised || 0;
      const shipped = reqCount[key] && reqCount[key].shipped || 0;
      const remain = (promised - shipped) < 0 ? 0 : promised - shipped;

      return (
        <div key={key}>
          <label className={`form-control-static ${labelCol}`}>
            <span>{requirement && requirement.name}</span>
          </label>
          <div className={`form-control-static ${inputCol}`}>
            <span className="not-received">{`尚未收到：${remain}`}</span>
            <span><small>{`(預計捐贈：${promised}，已收到：${shipped})`}</small></span>
          </div>
        </div>
      );
    });

    const confirmForm = Object.keys(requirements)
    .filter(key => {
      const promised = reqCount[key] && reqCount[key].promised || 0;
      return promised > 0;
    })
    .map( key => {
      const requirement = requirements[key];

      return (
        <Input
          key={key}
          type="number"
          ref={`act${key}`}
          labelClassName={`${labelCol} align-left`}
          wrapperClassName={inputCol}
          label={requirement && requirement.name}
          onKeyPress={this.handleKeyPress}/>
      );
    });

    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>點收物資</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4><Label bsStyle="info">預計收到物資數量</Label></h4>
            {activities}
            <hr />

            <h4><Label bsStyle="success">實際收到物資數量</Label></h4>
            <form className="form-horizontal">
              {confirmForm}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseModal}>取消</Button>
            <Button bsStyle="primary" onClick={this.handleUpdateCount}>確認</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  render() {
    return (
      <div className="pro-activity">
        {this.renderErrorAlert()}
        {this.renderSuccessAlert()}
        {this.renderSearchNoResultAlert()}
        <div className="search-toolbar col-lg-3">
          <form onSubmit={this.handleSearch}>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                placeholder="搜尋追蹤編號..."
                value={this.state.searchKey}
                onChange={this.handleSearchKeyChange} />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-info">搜尋</button>
              </span>
            </div>
          </form>
        </div>
        <table className="table">
         <thead>
           <tr>
             <th>追蹤編號</th>
             <th>聯絡人</th>
             <th>信箱</th>
             <th>電話</th>
             <th>日期</th>
             <th>備註</th>
             <th>寄送進度</th>
           </tr>
         </thead>
         <tbody>
           {this.renderBatches()}
         </tbody>
        </table>
        {this.renderActivity()}
      </div>
    );
  }
}
