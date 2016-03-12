import React, {Component} from 'react';
import StationContact from 'components/StationContact';
import ContactForm from 'components/ContactForm';
import Provision from 'components/Provision';
import { Modal, ButtonGroup, Alert, Grid, Row, Col, Button } from 'react-bootstrap';
import { Map, Marker, TileLayer } from 'react-leaflet';
import StationApi from 'utils/StationApi';

export default class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: {},
      edit: false,
      showConfirmation: false,
      donor: {}
    };
  }

  componentDidMount() {
    let self = this;
    StationApi.findById(this.props.params.id, (err, station) => {
      self.setState({station: station});
    });
  }

  toggleEditMode() {
    this.setState({edit: !this.state.edit});
  }

  toggleConfirmation() {
    this.setState({showConfirmation: !this.state.showConfirmation});
  }

  updateDonor(donor) {
    this.setState({donor: donor});
  }

  render() {
    let self = this;
    let createProvision = (provision, index) => {
      return (
        <Col key={index} xs={6} md={4}>
          <Provision
            edit={self.state.edit}
            name={provision.name}
            thumbnail={provision.thumbnail}
            total={provision.total}
            shipped={provision.shipped}
            promised={provision.promised}
            unit={provision.unit}
          />
        </Col>
      );
    };

    let contacts = this.state.station._contacts || [];
    let provisions = this.state.station.provisions || [];
    let position = this.state.station.latitude ?
                   [this.state.station.latitude, this.state.station.longitude] :
                   [0, 0];
    let buttons, editDescription, contactForm;
    if (this.state.edit) {
      editDescription = <Alert bsStyle="info">請填寫您所要捐贈的物資數量與您的聯絡資訊並按下一步 </Alert>;
      buttons = (
        <ButtonGroup bsSize="large">
          <Button bsStyle="default" onClick={this.toggleEditMode.bind(this)}>取消</Button>
          <Button bsStyle="primary" onClick={this.toggleConfirmation.bind(this)}>下一步</Button>
        </ButtonGroup>
      );
      contactForm = (
        <Row>
          <ContactForm contact={this.state.donor}
                       updateContact={this.updateDonor.bind(this)}></ContactForm>
        </Row>
      );
    }
    else {
      buttons = <Button bsStyle="primary" bsSize="large" onClick={this.toggleEditMode.bind(this)}>捐贈</Button>;
    }

    return (
      <div>
        <Grid className="station-page">
          <Row>
            <Col xs={12} md={6}>
              <h1>{this.state.station.name}</h1>
              {contacts.map((c, index) => {
                return (<StationContact key={index} contact={c} />);
              })}
            </Col>
            <Col xs={12} md={6} className="minimap">
              <Map center={position} zoom={13}>
                <TileLayer
                  attribution='Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url='http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg'
                  subdomains='1234'
                />
                <Marker position={position}>
                </Marker>
              </Map>
            </Col>
          </Row>
          {editDescription}
          <Row>
            {provisions.map(createProvision)}
          </Row>
          {contactForm}
          <Row className="text-right">
            {buttons}
          </Row>
        </Grid>

        <Modal show={this.state.showConfirmation} onHide={this.toggleConfirmation.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>捐贈資訊</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>請確認以下的資訊無誤，按下送出後將會記錄此筆捐贈資訊，並且發送 email 到您的信箱。</p>

            <hr />

            <h4>捐贈物資資訊</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <h4>您的聯絡資訊</h4>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleConfirmation.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
