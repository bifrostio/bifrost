import React, {Component} from 'react';
import { Link } from 'react-router';
import FileSaver from 'file-saver';

import StationContact from '../components/StationContact';
import TitleBar from '../components/TitleBar';
import UserModel from '../models/UserModel';
import BatchModel from '../models/BatchModel';
import RequirementModel from '../models/ProvisionRequirementModel';
import {getCSV} from '../utils'

export default class StationManager extends Component {
  state = {
    station: {},
    provisionRequirements: {},
    batches: []
  };

  componentWillMount() {
    UserModel.getStationInfo(this.props.params.id, this.handleReqSuccess, this.handleReqFail);
  }

  addProvision(req) {
    req.stationId = this.state.station.id;
    RequirementModel.create(req, (err) => {
      if (!err) {
        UserModel.getStationInfo(this.props.params.id,
          this.handleReqSuccess, this.handleReqFail);
      }
    });
  }

  removeProvision(id) {
    RequirementModel.remove(id, (err) => {
      if (!err) {
        UserModel.getStationInfo(this.props.params.id,
          this.handleReqSuccess, this.handleReqFail);
      }
    });
  }

  saveProvision(p) {
    RequirementModel.update(p, err => {
      if (!err) {
        UserModel.getStationInfo(this.props.params.id,
          this.handleReqSuccess, this.handleReqFail);
      }
    });
  }

  handleReqSuccess = (data) => {
    const provisionRequirements = {};
    const batches = {};

    data.provisionRequirements.forEach( item => {
      provisionRequirements[item.id] = item;
      item.shipped = 0;
      item.promised = 0;
      item.provisionActivities.forEach(activity => {
        ['shipped', 'promised'].forEach(key => {
          if (typeof(activity[key]) === 'number') {
            item[key] += activity[key];
          }
        });
      });
    });

    data.batches.forEach( item => {
      batches[item.id] = item;
    });

    this.setState({
      station: {id: data.id, name: data.name, _contacts: data._contacts, closed: data.closed},
      provisionRequirements: provisionRequirements,
      batches: batches
    });

  }

  toggleClosed = () => {
    const self = this;
    let properties = {closed: !self.state.station.closed};
    UserModel.updateStationInfo(self.state.station.id, properties,
    () => {
      UserModel.getStationInfo(self.props.params.id, self.handleReqSuccess, self.handleReqFail);
    });
  }

  handleReqFail= () => {}

  downloadCSV = () => {
    BatchModel.find()
    .then(batches => {
      const csv = getCSV(batches);
      const blob = new Blob([csv], {type: 'text/plain;charset=utf-8'});
      FileSaver.saveAs(blob, 'export.csv');
    });
  }

  render() {
    const station = this.state.station;
    let contacts = this.state.station._contacts || [];
    let closedToggleText = station.closed ?  '重新接受捐贈' : '關閉物資站';
    let closedToggleButton = (
      <button className="btn btn-danger" onClick={this.toggleClosed.bind(this)}>
        {closedToggleText}
      </button>
    );

    let titleLabel = station.closed ?
                     <span className="label label-warning">已關閉</span> :
                     <span className="label label-primary">接受捐贈中</span>;

    return (
      <div>
        <TitleBar />
        <div className="container">
          <div>
            <h1>{station.name} {titleLabel}</h1>
            {
              contacts.map((c, index) => {
                return (<StationContact key={index} contact={c} />);
              })
            }

            {closedToggleButton}
            <button className="btn btn-default btn-export" onClick={this.downloadCSV}>匯出 CSV</button>
          </div>
          <ul className="nav nav-tabs">
            <li>
              <Link to={`/manager/station/${station.id}/requirement`} activeClassName="active">需求物資清單</Link>
            </li>
            <li>
              <Link to={`/manager/station/${station.id}/activity`} activeClassName="active">點收物資</Link>
            </li>
          </ul>
          {
            this.props.children &&
            React.cloneElement(this.props.children, {
              provisionRequirements: this.state.provisionRequirements,
              batches: this.state.batches,
              addProvision: this.addProvision.bind(this),
              removeProvision: this.removeProvision.bind(this),
              saveProvision: this.saveProvision.bind(this)
            })
          }
        </div>
      </div>
    );
  }
}
