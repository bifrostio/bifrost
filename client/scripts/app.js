import React, {Component} from 'react';
import StationMap from 'components/StationMap';
import ReactDOM from 'react-dom';
import Station from 'components/Station';
import StationList from 'components/StationList';
import Gallery from 'components/Gallery';
import { Router, Route, Link } from 'react-router';
import { createHistory, useBasename } from 'history';
import $ from 'jquery';
import async from 'async';

const history = useBasename(createHistory)({
  basename: '/'
});

export default class Bifrost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: []
    };
  }

  componentDidMount() {
    let stations = {};
    let self = this;

    async.series([
      callback => {
        let filter = { include: 'provisions'};
        filter = encodeURIComponent(JSON.stringify(filter));
        $.get(`/api/stations?filter=${filter}`)
        .done(function(result) {
          result.forEach(station => {
            stations[station.id] = station;
            station.provisionQuantity = [];
          });
          callback();
        })
        .fail(callback);
      },
      callback => {
        let filter = {
          where: { or: Object.keys(stations).map(id => {
            return {stationId: id};
          })}
        };
        filter = encodeURIComponent(JSON.stringify(filter));
        $.get(`/api/provisionQuantities?filter=${filter}`)
        .done(function(result) {
          result.forEach(q => stations[q.stationId].provisionQuantity.push(q));
          callback();
        })
        .fail(callback);
      }
    ], function() {
      self.setState({ stations: Object.keys(stations).map(id => stations[id]) });
    });
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
      station.provisionQuantity.forEach(q => {
        shipped += q.shipped / q.total;
        promised += q.promised / q.total;
      });
      station.shippedPercentage = shipped / station.provisionQuantity.length;
      station.promisedPercentage = promised / station.provisionQuantity.length;
      stations.push(station);
    });

    return (
      <div>
        <StationList stations={stations} />
        <StationMap markers={markers} />
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={history}>
    <Route path='/' component={Bifrost}>
      <Route path='stations/:id' component={Station} />
      <Route path='gallery' component={Gallery} />
    </Route>
  </Router>
), document.getElementById('bifrost'));
