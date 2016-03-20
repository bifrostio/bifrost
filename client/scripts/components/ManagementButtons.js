import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Overlay, Popover} from 'react-bootstrap';

export default class ManagementButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRemovePopover: false
    };
  }

  toggleRemovePopover() {
    this.setState({showRemovePopover: !this.state.showRemovePopover});
  }

  confirmDeletion() {
    this.props.confirmDeletion(this.props.provision);
  }

  edit() {
    this.props.edit(this.props.provision);
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <a className="manager-button" onClick={this.edit.bind(this)}>編輯</a>&nbsp;
        <a className="manager-button" ref="target"
           onClick={this.toggleRemovePopover.bind(this)}>刪除</a>
        <Overlay
          show={this.state.showRemovePopover}
          onHide={() => this.setState({ showRemovePopover: false })}
          placement="bottom"
          rootClose={true}
          container={this}
          target={() => ReactDOM.findDOMNode(this.refs.target)}>
          <Popover id="remove-confirmation" title="確認刪除">
            <a onClick={this.confirmDeletion.bind(this)} className="manager-button">是</a>
            &nbsp;/&nbsp;
            <a onClick={this.toggleRemovePopover.bind(this)} className="manager-button">否</a>
          </Popover>
        </Overlay>
      </div>
    );
  }
}
