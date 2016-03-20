import React, {Component} from 'react';
import {FormControls, Button, Input, Panel} from 'react-bootstrap';
import { Link } from 'react-router';
import ProjectApi from 'utils/ProjectApi';
import StationList from 'components/StationList';

export default class ProjectContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      stations: []
    };

    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFail = this.handleFail.bind(this);
    this.handleGetStationsSuccess = this.handleGetStationsSuccess.bind(this);
    this.handleGetStationsFail = this.handleGetStationsFail.bind(this);
  }
  componentWillMount() {
    const id = this.props.params.id;
    ProjectApi.getProjectInfo(id, this.handleSuccess, this.handleFail);
    ProjectApi.getStationsOfProject(id, this.handleGetStationsSuccess, this.handleGetStationsFail);
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
      return (<div className="empty-stations-list">目前尚無任何收容所據點！</div>);
    }

    const prefixPath = '/manager/station';
    const stations = this.state.stations.map( station => {
      return (
        <li className="list-group-item" key={station.id}>
          <Link to={`${prefixPath}/${station.id}`}>{station.name}</Link>
        </li>
      );
    });

    return (
      <ul className="list-group">{stations}</ul>
    );
  }

  render() {
    let stationList;
    const { name: projectName, _contacts: contacts } = this.state.project;
    const userName = contacts && contacts.name;
    const email = contacts && contacts.email;
    const phone = contacts && contacts.phone;

    return (
        <div className="container project-content">
          <div className="page-header">
            <h1>{projectName}</h1>
          </div>
          <div className="btn-wrap">
            <Button bsStyle="primary">新增收容所</Button>
          </div>
          {this.renderStationList()}
          {this.renderContacts()}
        </div>
    );
  }
}

ProjectContent.defaultProps = {
  stations: []
}
