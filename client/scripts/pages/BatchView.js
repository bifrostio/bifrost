import React, {Component} from 'react';
import { Button, Panel, FormControls } from 'react-bootstrap';
import TitleBar from '../components/TitleBar';
import ProvisionInformation from '../components/ProvisionInformation';
import BatchModel from '../models/BatchModel';

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
    BatchModel.findById(this.props.params.id, (err, batch) => {
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
      <div>
        <TitleBar />
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
            您的捐贈與寄送資訊稍後也會寄送一封電子郵件至您的信箱。
          </p>
        </div>
      </div>
    );
  }
}
