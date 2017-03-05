import React, {Component} from 'react';
import { ProgressBar, Input } from 'react-bootstrap';
import { Link } from 'react-router';

export default class StationList extends Component {
  handleMouseEnter(id) {
    this.props.onHover(id);
  }

  handleCheckbox() {
    this.props.handleOfficialStations(this.refs.checkbox.getChecked());
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
                           now={(station.promisedPercentage - station.shippedPercentage) * 100} />
            </ProgressBar>
          </div>
        </div>
      );
    });

    let officialStations;
    let officialStationsDescription;

    if (this.props.showOfficialStations) {
      officialStationsDescription = (
          <div className="alert alert-info" role="alert">
            庫存物資站為市政府在災害未發生前儲存物資的地方，僅提供庫存物資資訊，並不接受物資捐贈。
          </div>
      );

      officialStations = this.props.officialStations.map((station, i) => {
        return (
          <div className="station" key={i}
            onMouseEnter={this.handleMouseEnter.bind(this, `official-${i}`)}>
            <div className="name">
              <Link to={`/officialStations/${station.key}`}>{station.key}</Link>
            </div>
          </div>
        );
      });

    }

    return (
      <div className="station-list">
        { stations }
        <div className="official-list">
          <form>
            <Input type="checkbox" label="顯示庫存物資站" ref="checkbox"
              value={this.props.showOfficialStations}
              onChange={this.handleCheckbox.bind(this)}/>
          </form>
          <div className="official-stations">
            {officialStationsDescription}
            {officialStations}
          </div>
        </div>
      </div>
    );
  }
}
