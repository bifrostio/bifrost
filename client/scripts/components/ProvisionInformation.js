import React, {Component} from 'react';
import { FormControls } from 'react-bootstrap';

export default class ProvisionInformation extends Component {
  render() {
    let labelCol = 'col-xs-2';
    let inputCol = 'col-xs-10';

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
      provisions = this.props.provisions
                       .filter(p => parseInt(p.volume) !== 0)
                       .map(createProvisionFormItem);
      if (provisions.length === 0) {
        provisions = (
          <p className="provision-total-warning">
            您尚未填寫捐贈物資的數量，請回上頁填寫捐贈數量
          </p>
        );
      }
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
