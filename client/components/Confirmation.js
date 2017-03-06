import React, {Component} from 'react';
import ProvisionInformation from './ProvisionInformation';
import WizardButtons from './WizardButtons';

export default class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {submitting: false};
  }

  submit() {
    this.setState({submitting: true});
    this.props.submit();
  }

  render() {
    return (
      <div className="confirmation">
        <p>請確認以下的資訊無誤，按下送出後將會記錄此筆捐贈資訊。</p>

        <hr />
        <div className="panel panel-info">
          <div className="panel-heading">確認資訊</div>
          <div className="panel-body">
            <ProvisionInformation {...this.props} />
          </div>
        </div>

        <WizardButtons
          submitting={this.state.submitting}
          submit={this.submit}
          back={this.props.back}
        />
      </div>
    );
  }
}
