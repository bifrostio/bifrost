import React, {Component} from 'react';
import {Link} from 'react-router';
import StationModel from '../models/StationModel';

export default class Header extends Component {
  state = {
    stations: []
  };

  componentWillMount() {
    StationModel.find((err, stations) => {
      this.setState({stations});
    });
  }

  render() {
    const feedback = 'https://docs.google.com/forms/d/e/1FAIpQLSencOao29NfIs4lXG9Ik5w_XY7ubcbDbZwpcTQn6nAZgNXO8A/viewform';
    const token = sessionStorage.getItem('token');
    const adminLink = token ? '/manager/projects' : '/login';
    const stationLink = this.state.stations.length === 1 ?
                        `/stations/${this.state.stations[0].id}` :
                        '/stations';

    return (
      <div className="title-bar">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button"
                      className="navbar-toggle collapsed"
                      data-toggle="collapse"
                      data-target="#bifrost-navbar-collapse"
                      aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">物資捐贈地圖</Link>
            </div>
            <div className="collapse navbar-collapse" id="bifrost-navbar-collapse">
              <ul className="nav navbar-nav">
                <li><Link to="/">首頁</Link></li>
                <li><Link to="/map">地圖</Link></li>
                <li><Link to={stationLink}>物資站</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href={feedback} target="_blank">
                    <i className="fa fa-commenting" aria-hidden="true"></i> 意見回饋
                  </a>
                </li>
                <li><Link to={adminLink}>管理</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
