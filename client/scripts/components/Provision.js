import React, {Component} from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';

export default class Provision extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: false};
  }

  render() {
    return (
      <div className="row">
        <div className="thumbnail col-xs-2">
          <img alt={this.props.name}
               src={this.props.thumbnail} />
        </div>
        <div className="progress-status col-xs-8">
          <div className="status">
            <span className="name">{this.props.name}</span>
            <div className="status">
              <span className="total">總需：{this.props.total}</span>、
              <span className="shipped">已收到：{this.props.shipped}</span>、
              <span className="promised">已認領：{this.props.promised}</span>
            </div>
            <div className="progress">
              <ProgressBar>
                <ProgressBar bsStyle="success"
                             now={this.props.shipped/this.props.total*100} />
                <ProgressBar bsStyle="warning" active
                             now={(this.props.promised-this.props.shipped)/this.props.total*100} />
              </ProgressBar>
            </div>
          </div>
        </div>
        <div className="edit col-xs-2">
          { this.state.edit ?
            <Input type="text" ref="input" label="捐贈數量" /> :
            null
          }
        </div>
      </div>
    );
  }
}
