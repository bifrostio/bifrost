import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import StationModel from '../models/StationModel';

export default class TitleBar extends Component {
  constructor(props) {
    super(props);

    this.state = { stations: []};
  }
  componentWillMount() {
    StationModel.find((err, stations) => {
      this.setState({stations});
    });
  }

  render() {
    const feedback = 'https://docs.google.com/forms/d/e/1FAIpQLSencOao29NfIs4lXG9Ik5w_XY7ubcbDbZwpcTQn6nAZgNXO8A/viewform';
    const token = sessionStorage.getItem('token');
    const adminLink = token ? '/#/projects' : '/#/login';
    const stationLink = this.state.stations.length === 1 ?
                        `/#/stations/${this.state.stations[0].id}` :
                        '/#/stations';

    return (
      <div className="title-bar">
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/#/">物資捐贈地圖</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/#/">首頁</NavItem>
              <NavItem eventKey={2} href="/#/map">地圖</NavItem>
              <NavItem eventKey={3} href={stationLink}>物資站</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} target="_blank" href={feedback}>
                <i className="fa fa-commenting" aria-hidden="true"></i> 意見回饋
              </NavItem>
              <NavItem eventKey={2} href={adminLink}>管理</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
