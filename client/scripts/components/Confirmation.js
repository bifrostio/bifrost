import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import ProvisionInformation from 'components/ProvisionInformation';

export default class Confirmation extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.hide.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>捐贈資訊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>請確認以下的資訊無誤，按下送出後將會記錄此筆捐贈資訊。</p>

          <hr />
          <ProvisionInformation {...this.props} />
        </Modal.Body>
        <Modal.Footer>
          <Button  bsStyle="primary" onClick={this.props.submit}>送出</Button>
          <Button onClick={this.props.hide.bind(this)}>關閉</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
