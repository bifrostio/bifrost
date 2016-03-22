import React, {Component} from 'react';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import { icon } from 'leaflet';
import { LatLngBounds } from 'leaflet';

class StationMarker extends Component {
  constructor(props) {
    super(props);

    let popupAnchor = [0, -40];

    this.normalIcon = icon({
      iconUrl: '/images/markers-blue.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor:  popupAnchor
    });

    this.highlightedIcon = icon({
      iconUrl: '/images/markers-orange.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor:  popupAnchor
    });

    this.officialIcon = icon({
      iconUrl: '/images/markers-green.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor:  popupAnchor
    });
  }

  render() {
    let ico;
    if (this.props.selected) {
      ico = this.highlightedIcon;
    }
    else if(this.props.official) {
      ico = this.officialIcon;
    }
    else {
      ico = this.normalIcon;
    }
    return (
      <Marker
        icon={ico}
        map={this.props.map}
        position={this.props.position}>
        <Popup>
          <span>{this.props.children}</span>
        </Popup>
      </Marker>
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
      let official = false;

      if (key === selectedId) {
        selected = true;
      }

      if (typeof(key) === 'string' && key.indexOf('official') !== -1) {
        official = true;
      }

      return <StationMarker official={official} key={key} {...props} selected={selected} />;
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
