import React, {Component} from 'react';
import { Modal, Button, FormControls } from 'react-bootstrap';

export default class Confirmation extends Component {
  render() {
    let labelCol = 'col-xs-4';
    let inputCol = 'col-xs-8';

    let createProvisionFormIten = (p, index) => {
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
      provisions = this.props.provisions.map(createProvisionFormIten);
    }

    return (
      <Modal show={this.props.show} onHide={this.props.hide.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>捐贈資訊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>請確認以下的資訊無誤，按下送出後將會記錄此筆捐贈資訊，並且發送 email 到您的信箱。</p>

          <hr />
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hide.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
