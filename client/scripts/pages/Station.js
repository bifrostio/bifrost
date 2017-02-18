import React, {Component} from 'react';
import { ButtonGroup, Alert, Grid, Row, Col, Button } from 'react-bootstrap';
import { Map, Marker, TileLayer } from 'react-leaflet';
import validator from 'validator';
import StationContact from '../components/StationContact';
import ContactForm from '../components/ContactForm';
import Provision from '../components/Provision';
import Confirmation from '../components/Confirmation';
import StationModel from '../models/StationModel';
import BatchModel from '../models/BatchModel';
import AidSyncModel from '../models/AidSyncModel';

export default class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: {},
      edit: false,
      showConfirmation: false,
      donor: {},
      official: false
    };
  }

  componentDidMount() {
    let self = this;
    if (this.props.route.path.indexOf('officialStations') !== -1) {
      AidSyncModel.findById(this.props.params.id, (err, station) => {
        station.longitude = station.geometry.location.lng;
        station.latitude = station.geometry.location.lat;
        station.name = station.key;
        station._contacts = [
          {address: station.formatted_address}
        ];
        self.setState({
          official: true,
          station: station
        });
      });
    }
    else {
      StationModel.findById(this.props.params.id, (err, station) => {
        station.provisionRequirements.forEach(req => req.volume = 0);
        self.setState({station: station});
      });
    }
  }

  toggleEditMode() {
    this.setState({edit: !this.state.edit});
  }

  toggleConfirmation() {
    this.setState({showConfirmation: !this.state.showConfirmation});
  }

  disableNext() {
    let donor = this.state.donor;
    if (!donor.name || !donor.phone || !donor.email) {
      return true;
    }

    if (!validator.isEmail(donor.email)) {
      return true;
    }

    if (!validator.isNumeric(donor.phone)) {
      return true;
    }

    return false;
  }

  updateDonor(donor) {
    this.setState({donor: donor});
  }

  updateVolume(index, volume) {
    this.state.station.provisionRequirements[index].volume = volume;
  }

  createBatch() {
    this.toggleConfirmation();
    let batch = {
      createdDate: Date(),
      updatedDate: Date(),
      stationId: this.state.station.id,
      note: this.state.donor.note,
      _contact: this.state.donor
    };
    let activities = this.state.station.provisionRequirements.map(req => {
      let promised = req.volume;
      return {
        stationId: this.state.station.id,
        provisionRequirementId: req.id,
        promised: promised
      };
    });
    BatchModel.create(batch, activities, (err, data) => {
      if (!err) {
        window.location = `/#/batches/${data.id}`;
      }
    });
  }

  render() {
    let self = this;
    let createProvision = (provision, index) => {
      return (
        <Col key={index} xs={6} md={4}>
          <Provision
            index={index}
            official={self.state.official}
            edit={self.state.edit}
            name={provision.name}
            description={provision.description}
            category={provision.category}
            expired={provision.expired}
            thumbnail={provision.thumbnail}
            total={provision.total}
            shipped={provision.shipped}
            promised={provision.promised}
            unit={provision.unit}
            updateVolume={this.updateVolume.bind(this)}
          />
        </Col>
      );
    };

    let contacts = this.state.station._contacts || [];
    let provisions = this.state.station.provisionRequirements || [];
    let position;

    position = this.state.station.latitude ?
       [this.state.station.latitude, this.state.station.longitude] :
       [0, 0];
    let buttons, editDescription, contactForm;

    if (this.state.edit) {
      editDescription = <Alert className="station-edit-desc" bsStyle="info">請填寫您所要捐贈的物資數量與您的聯絡資訊並按下一步 </Alert>;
      buttons = (
        <ButtonGroup bsSize="large">
          <Button bsStyle="default" onClick={this.toggleEditMode.bind(this)}>取消</Button>
          <Button disabled={this.disableNext()} bsStyle="primary" onClick={this.toggleConfirmation.bind(this)}>下一步</Button>
        </ButtonGroup>
      );
      contactForm = (
        <Row>
          <ContactForm contact={this.state.donor}
                       updateContact={this.updateDonor.bind(this)}></ContactForm>
        </Row>
      );
    }
    else if (this.state.official) {
      buttons = (
        <Button bsSize="large" href='#/map'>返回地圖瀏覽</Button>
      );
    }
    else {
      buttons = (
        <ButtonGroup bsSize="large">
          <Button href='#/map'>返回地圖瀏覽</Button>
          <Button bsStyle="primary" onClick={this.toggleEditMode.bind(this)}>捐贈</Button>
        </ButtonGroup>
      );
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
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  subdomains='abc'
                />
                <Marker position={position}>
                </Marker>
              </Map>
            </Col>
          </Row>
          {editDescription}
          <Row className="provision-items-row">
            {provisions.map(createProvision)}
          </Row>
          {contactForm}
          <Row className="text-right station-buttons">
            {buttons}
          </Row>
        </Grid>

        <Confirmation
          contact={this.state.donor}
          provisions={this.state.station.provisionRequirements}
          submit={this.createBatch.bind(this)}
          hide={this.toggleConfirmation.bind(this)}
          show={this.state.showConfirmation} />

      </div>
    );
  }
}
