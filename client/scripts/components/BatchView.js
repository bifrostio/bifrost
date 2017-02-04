import React, {Component} from 'react';
import BatchApi from '../utils/BatchApi';
import { Button, Panel, FormControls } from 'react-bootstrap';
import ProvisionInformation from './ProvisionInformation';

export default class BatchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batch: {},
      showInformation: false
    };
  }

  componentDidMount() {
    let self = this;
    BatchApi.findById(this.props.params.id, (err, batch) => {
      console.log(batch);
      self.setState({batch: batch});
    });
  }

  toggle() {
    this.setState({showInformation: !this.state.showInformation});
  }

  render() {
    let address = {};
    let contact = {};
    let stationUrl;
    let provisions;
    let donor = {};
    if (this.state.batch.station) {
      contact = this.state.batch.station._contacts[0];
      address = contact._address;
      stationUrl = `#/stations/${this.state.batch.station.id}`;
      provisions = this.state.batch.provisionActivities.map(activity => {
        return {
          name: activity.provisionRequirement.name,
          volume: activity.promised
        };
      });
      donor = this.state.batch._contact;
    }
    return (
      <div className="batch-page container">
        <p>您欲捐贈的物資已經登記，請記下物資寄送的資訊，並且將物資寄送於此：</p>
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

        <p>
          您也可以 <Button onClick={this.toggle.bind(this)}>按此</Button> 查看您送出的物資資訊，或 <Button href={stationUrl}>回到物資站頁面</Button>。
        </p>
        <Panel collapsible expanded={this.state.showInformation}>
          <ProvisionInformation
            contact={donor}
            provisions={provisions}
          />
        </Panel>
      </div>
    );
  }
}
