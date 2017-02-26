import React, {Component} from 'react';
import {Link} from 'react-router';
import TitleBar from '../components/TitleBar';
import StationModel from '../models/StationModel';

export default class Stations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: []
    };
  }

  componentDidMount() {
    let self = this;
    StationModel.find((err, stations) => {
      if (err) return console.error(err);
      self.setState({ stations: stations});
    });
  }

  render() {
    const rows = this.state.stations.map(s => {
      const contact = s._contacts[0];
      const link = `/stations/${s.id}`;
      const address = `${contact._address.zipCode} ${contact._address.city}${contact._address.district}${contact._address.detail}`;
      return (
        <tr key={s.id}>
          <td><Link to={link}>{s.name}</Link></td>
          <td>{contact.name}</td>
          <td>{address}</td>
        </tr>
      );
    });

    return (
      <div>
        <TitleBar />
        <div className="container">
          <h1>物資站列表</h1>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>物資站名稱</th>
                <th>聯絡人</th>
                <th>地址</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
