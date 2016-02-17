import React, {Component} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { icon } from 'leaflet';
import { LatLngBounds } from 'leaflet';

class StationMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: false
    };

    this.normalIcon = icon({
      iconUrl: '/images/markers-blue.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    this.highlightedIcon = icon({
      iconUrl: '/images/markers-orange.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });
  }

  highlight(bool) {
    this.setState({highlighted: bool});
  }

  render() {
    return (
      <Marker
        icon={this.state.highlighted ? this.highlightedIcon : this.normalIcon}
        map={this.props.map}
        position={this.props.position} />
    );
  }
}

export default class StationMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let bounds;
    if (this.props.markers.length > 0) {
      bounds = new LatLngBounds(this.props.markers.map(m => m.position));
    }

    let markers = this.props.markers.map(({ key, ...props }) => (
      <StationMarker key={key} {...props} />
    ));

    return (
      <Map bounds={bounds} boundsOptions={{paddingTopLeft: [500, 0]}}>
        <TileLayer
          attribution='Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url='http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg'
          subdomains='1234'
        />

        {markers}
      </Map>
    );
  }
}
