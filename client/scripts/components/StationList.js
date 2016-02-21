import React, {Component} from 'react';
import { ProgressBar } from 'react-bootstrap';

class StationListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="station">
        <div className="name">{this.props.station.name}</div>
        <div className="progress">
          <ProgressBar>
            <ProgressBar bsStyle="success"
                         now={this.props.station.shippedPercentage*100} />
            <ProgressBar bsStyle="warning" active
                         now={this.props.station.promisedPercentage * 100} />
          </ProgressBar>
        </div>
      </div>
    );
  }
}

export default class StationList extends Component {
  handleMouseEnter(id) {
    this.props.onHover(id);
  }

  render() {
    var stations = this.props.stations.map(station => {
      return (
        <div className="station" key={station.id} onMouseEnter={this.handleMouseEnter.bind(this, station.id)}>
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
