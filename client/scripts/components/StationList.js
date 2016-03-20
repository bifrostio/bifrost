import React, {Component} from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router';

export default class StationList extends Component {
  handleMouseEnter(id) {
    this.props.onHover(id);
  }

  render() {
    const prefixPath = this.props.managerMode ? '/manager/station' : '/stations';
    var stations = this.props.stations.map(station => {
      return (
        <div className="station" key={station.id} onMouseEnter={this.handleMouseEnter.bind(this, station.id)}>
          <div className="name">
            <Link to={`${prefixPath}/${station.id}`}>{station.name}</Link>
          </div>
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
