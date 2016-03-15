import React, {Component} from 'react';
import StationMap from 'components/StationMap';
import ReactDOM from 'react-dom';
import StationList from 'components/StationList';
import StationApi from 'utils/StationApi';
import { Button } from 'react-bootstrap';

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      selected: null
    };
  }

  componentDidMount() {
    let self = this;
    StationApi.find((err, stations) => {
      self.setState({ stations: stations});
    });
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover(stationId) {
    this.setState({selected: stationId});
  }

  render() {
    let markers = [];
    let stations = [];

    this.state.stations.forEach(station => {
      markers.push({
        key: station.id,
        position: [station.latitude, station.longitude],
        children: station.name
      });

      let promised = 0;
      let shipped = 0;
      station.provisionRequirements.forEach(req => {
        shipped += req.shipped / req.total;
        promised += req.promised / req.total;
      });
      station.shippedPercentage = shipped / station.provisionRequirements.length;
      station.promisedPercentage = promised / station.provisionRequirements.length;
      stations.push(station);
    });

    return (
      <div>
        <StationList stations={stations} onHover={this.handleHover} />
        <StationMap markers={markers} selected={this.state.selected} />
        <Button className="login-btn" bsStyle="primary" href="#/login">
          登入
        </Button>
      </div>
    );
  }
}
