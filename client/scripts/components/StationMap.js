import React, {Component} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { icon } from 'leaflet';
import { LatLngBounds } from 'leaflet';

class StationMarker extends Component {
  constructor(props) {
    super(props);

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

  render() {
    return (
      <Marker
        icon={this.props.selected ? this.highlightedIcon : this.normalIcon}
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
    const selectedId = this.props.selected;

    if (this.props.markers.length > 0) {
      bounds = new LatLngBounds(this.props.markers.map(m => m.position));
    }

    let markers = this.props.markers.map(({ key, ...props }) => {
      let selected = false;

      if (key === selectedId) {
        selected = true;
      }

      return <StationMarker key={key} {...props} selected={selected} />
    });

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
