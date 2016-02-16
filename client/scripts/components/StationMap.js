import React, {Component} from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';

const StationMarker = ({ map, position, children }) => (
  <Marker map={map} position={position}>
    <Popup>
      <span>{children}</span>
    </Popup>
  </Marker>
);

const StationMarkerList = ({ map, markers }) => {
  let items;
  if (markers.length > 0) {
    items = markers.map(({ key, ...props }) => (
      <StationMarker key={key} map={map} {...props} />
    ));
  }

  return <div style={{display: 'none'}}>{items}</div>;
};

export default class StationMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let bounds;
    if (this.props.markers.length > 0) {
      bounds = new LatLngBounds(this.props.markers.map(m => m.position));
    }

    return (
      <Map bounds={bounds} boundsOptions={{paddingTopLeft: [500, 0]}}>
        <TileLayer
          attribution='Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url='http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg'
          subdomains='1234'
        />
        <StationMarkerList markers={this.props.markers} />
      </Map>
    );
  }
}
