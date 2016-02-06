import React, {Component} from 'react';
import StationMap from 'components/StationMap';
import ReactDOM from 'react-dom';
import Station from 'components/Station';
import Gallery from 'components/Gallery';
import { Router, Route, Link } from 'react-router';
import { createHistory, useBasename } from 'history';
import $ from 'jquery';

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
    this.serverRequest = $.get('/api/stations', function (result) {
      this.setState({ stations: result });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    let markers = this.state.stations.map(station => {
      return {
        key: station.id,
        position: [station.latitude, station.longitude],
        children: station.name
      };
    });

    return (
      <div>
        <h1>物資捐贈地圖</h1>
        <StationMap markers={markers} />
        <Link to="/gallery">gallery</Link> | <Link to='/stations/123'>stations 123</Link>
        <div>
          {this.props.children || 'Welcome to your Inbox'}
        </div>
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
