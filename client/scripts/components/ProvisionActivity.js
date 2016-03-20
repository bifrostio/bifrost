import React, {Component} from 'react';
import {Alert, Button} from 'react-bootstrap';
import ManagerApi from 'utils/ManagerApi';

export default class ProvisionActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      batches: [],
      showAlert: false
    };

    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.handleClickBatch = this.handleClickBatch.bind(this);
  }

  handleAlertDismiss() {
    this.setState({
      showAlert: false
    });
  }

  handleClickBatch() {
  }

  renderBatches() {
    const batches = this.props.batches;
    let batchesTable = Object.keys(batches).map(key => {
      const item = batches[key];
      const contact = item._contact;

      return (
        <tr key={item.id} className="batches-item" onClick={this.handleClickBatch.bind(item.id)}>
          <td>{item.trackingNumber}</td>
          <td>{contact.name}</td>
          <td>{contact.email}</td>
          <td>{contact.phone}</td>
          <td>{item.createdDate}</td>
        </tr>
      );
    });

    return batchesTable;
  }

  renderAlert() {
    if (!this.state.showAlert) {
      return;
    }

    return (
      <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
        <h4>Oh snap! You got an error!</h4>
        <p>Please wait a moment, and try again!</p>
      </Alert>
    );
  }

  render() {
    return (
      <div className="pro-activity">
        {this.renderAlert()}
        <table className="table">
         <thead>
           <tr>
             <th>追蹤編號</th>
             <th>聯絡人</th>
             <th>信箱</th>
             <th>電話</th>
             <th>日期</th>
           </tr>
         </thead>
         <tbody>
           {this.renderBatches()}
         </tbody>
        </table>
      </div>
    );
  }
}
