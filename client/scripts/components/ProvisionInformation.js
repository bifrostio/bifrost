import React, {Component} from 'react';
import { FormControls } from 'react-bootstrap';

export default class ProvisionInformation extends Component {
  render() {
    let labelCol = 'col-xs-4';
    let inputCol = 'col-xs-8';

    let createProvisionFormItem = (p, index) => {
      return (
        <FormControls.Static
          key={index}
          labelClassName={labelCol}
          wrapperClassName={inputCol}
          label={p.name}
          value={p.volume} />
      );
    };

    let provisions;
    if (this.props.provisions) {
      provisions = this.props.provisions.map(createProvisionFormItem);
    }

    return (
      <form className="form-horizontal">
      <h4>捐贈物資資訊</h4>
        {provisions}
      <h4>您的聯絡資訊</h4>
        <FormControls.Static
          label="姓名"
          labelClassName={labelCol}
          wrapperClassName={inputCol}
          value={this.props.contact.name} />
        <FormControls.Static
          label="電子郵件"
          labelClassName={labelCol}
          wrapperClassName={inputCol}
          value={this.props.contact.email} />
        <FormControls.Static
          label="電話"
          labelClassName={labelCol}
          wrapperClassName={inputCol}
          value={this.props.contact.phone} />
        <FormControls.Static
          label="註記"
          labelClassName={labelCol}
          wrapperClassName={inputCol}
          value={this.props.contact.note} />
      </form>
    );
  }
}
