import React, {Component} from 'react';
import { Glyphicon, ProgressBar } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import Range from 'react-range';

class Progress extends Component {
  render() {
    return (
      <div className="progress">
        <ProgressBar>
          <ProgressBar bsStyle="success"
                       now={this.props.shipped/this.props.total*100} />
          <ProgressBar bsStyle="warning" active
                       now={(this.props.promised)/this.props.total*100} />
        </ProgressBar>
      </div>
    );
  }
}

class Volume extends Component {
  handleChange(e) {
    this.props.updateVolume(e.target.value);
  }

  render() {
    let max = this.props.total - this.props.shipped - this.props.promised;
    return (
      <div className="volume">
        <Range value={this.props.volume} max={max}
               onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

class VolumeInputBox extends Component {
  handleChange() {
    this.props.updateVolume(this.refs.input.getValue());
  }

  render() {
    return (
      <Input onChange={this.handleChange.bind(this)} value={this.props.volume}
             type="text" ref="input" label="捐贈數量" />
    );
  }
}

export default class Provision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 0
    };
  }

  updateVolume(vol) {
    this.setState({volume: vol});
    this.props.updateVolume(this.props.index, vol);
  }

  render() {
    let secondPane, editPane;

    if (this.props.edit) {
      secondPane = <Volume
                      {...this.props}
                       volume={this.state.volume}
                       updateVolume={this.updateVolume.bind(this)} />;

      editPane = <VolumeInputBox
                    volume={this.state.volume}
                    updateVolume={this.updateVolume.bind(this)} />;
    }
    else {
      secondPane = <Progress {...this.props} />;
    }

    return (
      <div className="row">
        <div className="col-xs-2">
          <Glyphicon className="icon" glyph="briefcase" />
        </div>
        <div className="progress-status col-xs-7">
          <div className="status">
            <span className="name">{this.props.name}</span>
            <div className="status">
              <div className="total">總需：{this.props.total}</div>
              <div className="shipped">已收到：{this.props.shipped}</div>
              <div className="promised">已認領：{this.props.promised}</div>
            </div>
            { secondPane }
          </div>
        </div>
        <div className="edit col-xs-3">
          { editPane }
        </div>
      </div>
    );
  }
}
