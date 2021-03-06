import React, {Component} from 'react';
import { Panel, FormControls } from 'react-bootstrap';
import {Link} from 'react-router';

export default class Success extends Component {
  render() {
    let contact = {};
    let address;
    if (this.props.station._contacts) {
      contact = this.props.station._contacts[0];
      address = `${contact._address.zipCode} ${contact._address.city} ` +
                `${contact._address.district} ${contact._address.detail}`;
    }

    return (
      <div className="success-page">
        <p>您欲捐贈的物資已經登記，請記下物資寄送的資訊，並且將物資寄送於此：</p>
        <Panel header="寄送資訊" bsStyle="primary">
          <form className="form-horizontal">
            <FormControls.Static label="地址"
              labelClassName="col-xs-2" wrapperClassName="col-xs-10"
              value={`${address} (編號：${this.props.batch.trackingNumber})`} />
            <FormControls.Static label="收件人"
              labelClassName="col-xs-2" wrapperClassName="col-xs-10"
              value={`${contact.name}`} />
            <FormControls.Static label="聯絡電話"
              labelClassName="col-xs-2" wrapperClassName="col-xs-10"
              value={`${contact.phone}`} />
          </form>
        </Panel>

        <p>您的捐贈與寄送資訊稍後也會寄送一封電子郵件至您的信箱。</p>
        <div className="text-center">
          <Link
            to={`/stations/${this.props.station.id}`}
            className="btn btn-primary btn-lg">
            回到物資站
          </Link>
        </div>
      </div>
    );
  }
}
