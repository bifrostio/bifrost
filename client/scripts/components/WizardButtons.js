import React, {Component} from 'react';

export default class WizardButtons extends Component {
  render() {
    let buttons = [];
    const forward = <button disabled={this.props.disableForward} key="forward" onClick={this.props.forward} type="button" className="btn btn-primary">下一步</button>;
    const back = <button key="back" onClick={this.props.back} type="button" className="btn btn-default">上一步</button>;
    const submit = <button key="submit" onClick={this.props.submit} type="button" className="btn btn-primary">送出</button>;
    const cancel = <button key="cancel" onClick={this.props.cancel} type="button" className="btn btn-default">取消</button>;
    const submitting = <button key="submitting" disabled="disabled" type="button" className="btn btn-primary">送出中</button>;

    if (this.props.submitting) {
      buttons.push(submitting);
    }
    else if (this.props.first) {
      buttons.push(cancel);
      buttons.push(forward);
    }
    else if (this.props.submit) {
      buttons.push(back);
      buttons.push(submit);
    }
    else {
      buttons.push(back);
      buttons.push(forward);
    }

    return (
      <div className="wizard-buttons">
        <div className="btn-group btn-group-lg" role="group" aria-label="Wizard buttons">
          {buttons}
        </div>
      </div>
    );
  }
}
