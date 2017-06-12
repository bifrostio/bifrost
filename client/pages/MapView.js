import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import StationMap from '../components/StationMap';
import StationList from '../components/StationList';
import StationModel from '../models/StationModel';
import AidSyncModel from '../models/AidSyncModel';

let log = debug('bifrost:MapView');

export default class MapView extends Component {
  state = {
    stations: [],
    officialStations: [],
    selected: null,
    showOfficialStations: false
  };

  componentDidMount() {
    let self = this;
    StationModel.find((err, stations) => {
      self.setState({ stations: stations});
    });
    AidSyncModel.getOfficialStations((err, officialStations) => {
      let stationsList = Object.keys(officialStations).map(name => {
        return officialStations[name];
      });
      self.setState({officialStations: stationsList});
    });
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover(stationId) {
    this.setState({selected: stationId});
  }

  handleOfficialStations(bool) {
    this.setState({showOfficialStations: bool});
  }

  render() {
    let markers = [];
    let stations = [];

    this.state.stations.forEach(station => {
      markers.push({
        key: station.id,
        position: [station.latitude, station.longitude],
        children: (<a href={`/#/stations/${station.id}`}>{station.name}</a>)
      });

      let promised = 0;
      let shipped = 0;
      station.provisionRequirements.forEach(req => {
        log(req.name, `shipped: ${req.shipped}, promised: ${req.promised}`);
        shipped += req.shipped / req.total;
        promised += req.promised / req.total;
      });
      station.shippedPercentage = shipped / station.provisionRequirements.length;
      station.promisedPercentage = promised / station.provisionRequirements.length;
      stations.push(station);
    });

    if (this.state.showOfficialStations) {
      this.state.officialStations.forEach((station, i) => {
        let location = station.geometry.location;
        markers.push({
          key: 'official-' + i,
          position: [location.lat, location.lng],
          children: (<a href={`/#/officialStations/${station.key}`}>{station.name}</a>)
        });
      });
    }

    return (
      <div className="map-view">
        <StationList
          showOfficialStations={this.state.showOfficialStations}
          stations={stations}
          handleOfficialStations={this.handleOfficialStations.bind(this)}
          officialStations={this.state.officialStations}
          onHover={this.handleHover} />
        <StationMap markers={markers} selected={this.state.selected} />
      </div>
    );
  }
}
