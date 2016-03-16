import React, {Component} from 'react';
import BatchApi from 'utils/BatchApi';
import { Panel, FormControls } from 'react-bootstrap';

export default class BatchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batch: {}
    };
  }

  componentDidMount() {
    let self = this;
    BatchApi.findById(this.props.params.id, (err, batch) => {
      console.log(batch);
      self.setState({batch: batch});
    });
  }

  render() {
    let address = {};
    let contact = {};
    if (this.state.batch.station) {
      contact = this.state.batch.station._contacts[0];
      address = contact._address;
    }
    return (
      <div className="batch-page container">
        <p>您欲捐贈的物資已經登記，下一步請記下物資寄送的資訊，並且將物資寄送於此：</p>
        <Panel header="寄送資訊" bsStyle="primary">
          <form className="form-horizontal">
            <FormControls.Static label="地址"
              labelClassName="col-xs-2" wrapperClassName="col-xs-10"
              value={`${address.zipCode} ${address.city} ${address.district} ${address.detail}`} />
            <FormControls.Static label="收件人"
              labelClassName="col-xs-2" wrapperClassName="col-xs-10"
              value={`${contact.name} (編號：${this.state.batch.trackingNumber})`} />
            <FormControls.Static label="聯絡電話"
              labelClassName="col-xs-2" wrapperClassName="col-xs-10"
              value={`${contact.phone}`} />
          </form>
        </Panel>
      </div>
    );
  }
}
