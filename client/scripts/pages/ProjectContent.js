/* global google */

import React, {Component} from 'react';
import {FormControls, Button, Modal, Alert} from 'react-bootstrap';
import { Link } from 'react-router';
import validator from 'validator';
import GoogleMapsLoader from 'google-maps/lib/Google.min';
import StationForm from '../components/StationForm';
import Titlebar from '../components/Titlebar';
import ManagementButtons from '../components/ManagementButtons';
import ProjectModel from '../models/ProjectModel';
import StationModel from '../models/StationModel';
import UserModel from '../models/UserModel';


export default class ProjectContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      stations: [],
      editStationInfo: null,
      latestStation: {},
      showStationForm: false,
      showAlert: false,
      showSuccessAlert: false,
      isFormValidate: false,
      isEdit: false
    };

    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFail = this.handleFail.bind(this);
    this.handleGetStationsSuccess = this.handleGetStationsSuccess.bind(this);
    this.handleGetStationsFail = this.handleGetStationsFail.bind(this);
    this.handleAddStation = this.handleAddStation.bind(this);
    this.handleEditStation = this.handleEditStation.bind(this);
    this.showStationForm = this.showStationForm.bind(this);
    this.hideStationForm = this.hideStationForm.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.handleSuccessAlertDismiss = this.handleSuccessAlertDismiss.bind(this);
    this.checkValidate = this.checkValidate.bind(this);
  }
  componentWillMount() {
    const id = this.props.params.id;
    ProjectModel.getProjectInfo(id, this.handleSuccess, this.handleFail);
    ProjectModel.getStationsOfProject(id, this.handleGetStationsSuccess, this.handleGetStationsFail);
  }

  componentDidMount() {
    GoogleMapsLoader.LIBRARIES = ['places'];
    GoogleMapsLoader.LANGUAGE = 'zh-tw';
    GoogleMapsLoader.load();
  }

  handleSuccess(project) {
    this.setState({
      project: project
    });
  }

  handleFail() {
  }

  handleGetStationsSuccess(stations) {
    this.setState({
      stations: stations
    });
  }

  handleGetStationsFail() {
  }

  handleAddStation() {
    let station = this.refs.stationForm.getFormValue();
    let latitude = 0;
    let longitude = 0;

    const geocoder = new google.maps.Geocoder();
    const address = `${station.city}${station.district}${station.detail}`;

    geocoder.geocode({'address': address}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
      }

      const body = {
        name: station.stationName,
        latitude: latitude,
        longitude: longitude,
        projectId: this.props.params.id
      };

      const contacts = {
        name: station.name,
        email: station.email,
        phone: station.phone,
        _address: {
          zipCode: station.zipCode,
          city: station.city,
          district: station.district,
          detail: station.detail
        }
      };

      UserModel.addStation(body, contacts, (err, station) => {
        if (err) {
          this.setState({
            showAlert: true,
            showStationForm: false
          });
          return;
        }

        const stations = this.state.stations;
        stations.push(station);

        this.setState({
          stations: stations,
          latestStation: {name: station.name, link: `manager/station/${station.id}`},
          showSuccessAlert: true,
          showStationForm: false
        });
      });
    });

  }

  handleEditStation() {
    let self = this;
    let input = this.refs.stationForm.getFormValue();
    let station = {
      id: this.state.editStationInfo.id,
      name: input.stationName,
      contact: {
        id: this.state.editStationInfo._contacts[0].id,
        name: input.name,
        email: input.email,
        phone: input.phone,
        _address: {
          zipCode: input.zipCode,
          city: input.city,
          district: input.district,
          detail: input.detail
        }
      }
    };
    StationModel.update(station, () => {
      self.hideStationForm();
      let id = this.state.editStationInfo.projectId;
      ProjectModel.getStationsOfProject(id,
        self.handleGetStationsSuccess, self.handleGetStationsFail);
    });
  }

  showStationForm() {
    this.setState({
      showStationForm: true,
      editStationInfo: null,
      isEdit: false
    });
  }

  hideStationForm() {
    this.setState({
      showStationForm: false
    });
  }

  handleAlertDismiss() {
    this.setState({
      showAlert: false
    });
  }

  handleSuccessAlertDismiss() {
    this.setState({
      showSuccessAlert: false
    });
  }

  showEditModal(station) {
    this.setState({
      showStationForm: true,
      isFormValidate: false,
      isEdit: true,
      editStationInfo: station
    });
  }

  deleteStation(station) {
    let self = this;
    StationModel.remove(station.id, function() {
      ProjectModel.getStationsOfProject(self.props.params.id,
        self.handleGetStationsSuccess, self.handleGetStationsFail);
    });
  }

  checkValidate(data) {
    if (!this.refs.stationForm) {
      return false;
    }

    const station = data;
    let ret = true;
    Object.keys(station).forEach(key => {
      let value = station[key];

      if (typeof(value) === 'undefined') {
        ret = false;
        return;
      } else if ((key === 'stationName' || key === 'name') && value.length < 0) {
        ret = false;
        return;
      } else if (key === 'email' && !validator.isEmail(value)) {
        ret = false;
        return;
      } else if ((key === 'phone' || key === 'zipCode') && !validator.isNumeric(value)) {
        ret = false;
        return;
      } else if ((typeof(value) === 'string') && value.length < 0) {
        ret = false;
        return;
      }
    });

    this.setState({isFormValidate: ret});
  }

  renderContacts() {
    const contacts = this.state.project && this.state.project._contacts || [];

    return (
      contacts.map((contact, index) => {
        const {id, name, email, phone} = contact;

        return (
          <form className="form-horizontal contact-info" key={id}>
            <div className="contact-header">{`聯絡人 ${index+1}`}</div>
            <FormControls.Static label="名字" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={name} />
            <FormControls.Static label="信箱" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={email} />
            <FormControls.Static label="電話" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={phone} />
            <FormControls.Static label="地址" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={''} />
          </form>
        );
      })
    );
  }

  renderStationList() {
    if (!this.state.stations.length) {
      return (<div className="empty-stations-list">目前尚無任何物資站！</div>);
    }

    const prefixPath = '/manager/station';
    const stations = this.state.stations.map( station => {
      return (
        <li className="list-group-item" key={station.id}>
          <Link to={`${prefixPath}/${station.id}`}>{station.name}</Link>
          <ManagementButtons provision={station}
            edit={this.showEditModal.bind(this)}
            confirmDeletion={this.deleteStation.bind(this)} />
        </li>
      );
    });

    return (
      <ul className="list-group">{stations}</ul>
    );
  }

  renderAddStationBtn() {
    if (this.state.showStationForm) {
      return;
    }

    return (
      <Button bsStyle="primary" onClick={this.showStationForm}>
        新增物資站
      </Button>
    );
  }

  renderStationForm() {
    if (!this.state.showStationForm) {
      return;
    }
    const title = this.state.isEdit ? '編輯物資站' : '新增物資站';
    const station = this.state.editStationInfo;
    let props = {};

    if (station) {
      const contact = station && station._contacts[0];
      const address = contact._address;

      props = {
        stationName: station.name,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        zipCode: address && address.zipCode,
        city: address && address.city,
        district: address && address.district,
        detail: address && address.detail
      };
    }

    return (
      <Modal bsSize="large" show={this.state.showStationForm}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <StationForm ref="stationForm" onChange={this.checkValidate} {...props} />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={this.hideStationForm}>取消</Button>
          { !this.state.isEdit && <Button bsStyle="primary" disabled={!this.state.isFormValidate} onClick={this.handleAddStation}>新增</Button>}
          { this.state.isEdit && <Button bsStyle="primary" disabled={!this.state.isFormValidate} onClick={this.handleEditStation}>編輯</Button>}
        </Modal.Footer>
      </Modal>
    );
  }

  renderAlert() {
    if (!this.state.showAlert) {
      return;
    }

    return (
      <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
        <h4>Oh snap! You got an error!</h4>
        <p>Please wait a moment, and try again!</p>
      </Alert>
    );
  }

  renderSuccessAlert() {
    if (!this.state.showSuccessAlert) {
      return;
    }

    const latestStation = this.state.latestStation || {};

    return (
      <Alert bsStyle="success" onDismiss={this.handleSuccessAlertDismiss}>
        <h4>新增 <Link to={latestStation.link}>{latestStation.name}</Link> 成功!</h4>
      </Alert>
    );
  }

  render() {
    const { name: projectName } = this.state.project;

    return (
      <div>
        <Titlebar />
        <div className="container project-content">
          <div className="page-header">
            <h1>{projectName}</h1>
          </div>
          {this.renderAlert()}
          {this.renderSuccessAlert()}
          <div className="btn-wrap">
            {this.renderAddStationBtn()}
          </div>
          {this.renderStationForm()}
          {this.renderStationList()}
          {this.renderContacts()}
        </div>
      </div>
    );
  }
}

ProjectContent.defaultProps = {
  stations: []
};
