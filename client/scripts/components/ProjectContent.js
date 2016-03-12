import React, {Component} from 'react';
import {FormControls, Button, Input} from 'react-bootstrap';
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
    debugger;
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
    const contacts = this.state.project && this.state.project._contacts;

    if (!contacts) {
      return;
    }

    return (
      contacts.map((contact, index) => {
        return (
          <form className="form-horizontal contact-info" key={contact.id}>
            <div className="contact-header">{`聯絡人${index+1}`}</div>
            <FormControls.Static label="名字" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={contact.name} />
            <FormControls.Static label="信箱" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={contact.email} />
            <FormControls.Static label="電話" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={contact.phone} />
            <FormControls.Static label="地址" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={''} />
          </form>
        );
      })
    );
  }

  render() {
    let stationList;
    const { name: projectName, _contacts: contacts } = this.state.project;
    const userName = contacts && contacts.name;
    const email = contacts && contacts.email;
    const phone = contacts && contacts.phone;

    if (!this.state.stations.length) {
        stationList = (<div className="empty-stations-list">目前尚無任何收容所據點！</div>);
    } else {
      stationList = <StationList stations={this.state.stations} onHover={ () => {}} />
    }

    return (
        <div className="container project-content">
          <h1>{projectName}</h1>
          {this.renderContacts()}
          {stationList}
        </div>
    );
  }
}

ProjectContent.defaultProps = {
  stations: []
}
