import React, {Component} from 'react';
import { Glyphicon, ProgressBar } from 'react-bootstrap';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class Progress extends Component {
  render() {
    const shipped = this.props.shipped / this.props.total * 100;
    const promised = (this.props.promised) / this.props.total*100;
    return (
      <div className="progress">
        <ProgressBar>
          <ProgressBar bsStyle="success" now={shipped} />
          <ProgressBar bsStyle="warning" active now={promised} />
        </ProgressBar>
      </div>
    );
  }
}

export default class Provision extends Component {
  constructor(props) {
    super(props);

    this.state = {hover: false};
  }

  touch() {
    this.setState({hover: !this.state.hover});
  }

  render() {
    let status;
    let remain = this.props.total - this.props.shipped - this.props.promised;

    /* Status rendering */
    status = (
      <div className="status">
        <div className="total">總需：{this.props.total} {this.props.unit}</div>
        <div className="shipped">已收到：{this.props.shipped}</div>
        <div className="promised">已認領：{this.props.promised}</div>
      </div>
    );

    /* Name and description rendering */
    let name;
    if (this.props.description) {
      let tip = (
        <Tooltip id="description">{this.props.description}</Tooltip>
      );
      name = (
        <OverlayTrigger placement="right" overlay={tip}>
          <span className="name">{this.props.name}</span>
        </OverlayTrigger>
      );
    }
    else {
      name = (<span className="name">{this.props.name}</span>);
    }

    const className = 'row provision-item' + (this.state.hover ? ' hover' : '');

    return (
      <div className={className} onTouchStart={this.touch}>
        <div className="flipper">
          <div className="front">
            <Progress {...this.props} />
            {name}
            <div className="remain">
              仍需要 <span className="number">{remain}</span> {this.props.unit}
            </div>
            <Glyphicon className="icon" glyph="briefcase" />
          </div>
          <div className="back">
            {status}
          </div>
        </div>
      </div>
    );
  }
}
