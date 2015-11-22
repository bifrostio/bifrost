import React, {Component} from 'react';
import { ProgressBar } from 'react-bootstrap';

export default class StationList extends Component {
  render() {
    var stations = this.props.stations.map(station => {
      return (
        <div key={station.id} className="station">
          <div className="name">{station.name}</div>
          <div className="progress">
            <ProgressBar>
              <ProgressBar bsStyle="success"
                           now={station.shippedPercentage} />
              <ProgressBar bsStyle="warning" active
                           now={station.promisedPercentage-station.shippedPercentage} />
            </ProgressBar>
          </div>
        </div>
      );
    });
    return <div>{ stations }</div>;
  }
}
