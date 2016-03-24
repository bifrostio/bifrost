import React, {Component} from 'react';
import { Glyphicon, ProgressBar } from 'react-bootstrap';
import { Input, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Range from 'react-range';

class Progress extends Component {
  render() {
    return (
      <div className="progress">
        <ProgressBar>
          <ProgressBar bsStyle="success"
                       now={this.props.shipped/this.props.total*100} />
          <ProgressBar bsStyle="warning" active
                       now={(this.props.promised-this.props.shipped)/this.props.total*100} />
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
    let max = this.props.total - this.props.promised;
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
    let secondPane, editPane, status;

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

    if (!this.props.official) {
      status = (
        <div className="status">
          <div className="total">總需：{this.props.total} {this.props.unit}</div>
          <div className="shipped">已收到：{this.props.shipped}</div>
          <div className="promised">已認領：{this.props.promised}</div>
        </div>
      );
    }
    else {
      let date;

      let closeExpired;

      if (this.props.expired) {
        let d = new Date(this.props.expired);
        let today = new Date();
        date = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;

        today.setDate(1);
        today.setMonth(today.getMonth() + 6);
        closeExpired = today > d ? 'expired-warning' : '';
      }

      status = (
        <div className="status">
          數量： <span className="official-total">{this.props.total} {this.props.unit}</span>
          {
            date ?
            <div className="expired">期限：<span className={closeExpired}>{date}</span></div> :
            null
          }
          <div className="category">分類：{this.props.category}</div>
        </div>
      );
      secondPane = null;
    }



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


    return (
      <div className="row provision-item">
        <div className="col-xs-2">
          <Glyphicon className="icon" glyph="briefcase" />
        </div>
        <div className="progress-status col-xs-6">
          <div className="status">
            { name }
            { status }
            { secondPane }
          </div>
        </div>
        <div className="edit col-xs-4">
          { editPane }
        </div>
      </div>
    );
  }
}
