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
                           now={station.shippedPercentage*100} />
              <ProgressBar bsStyle="warning" active
                           now={station.promisedPercentage * 100} />
            </ProgressBar>
          </div>
        </div>
      );
    });
    return <div className="station-list">{ stations }</div>;
  }
}
