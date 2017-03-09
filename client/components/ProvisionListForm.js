import React, {Component} from 'react';
import WizardButtons from './WizardButtons';

export default class ProvisionListForm extends Component {
  constructor(props) {
    super(props);

    this.forward = this.forward.bind(this);
    this.state = { provisions: [...this.props.provisions] };
  }

  onChange(evt, i) {
    let provision = this.state.provisions[i];
    const max = provision.total - provision.promised;
    let vol = parseInt(evt.target.value);
    if (isNaN(vol)) {
      vol = 0;
    }
    provision.volume = Math.min(Math.max(0, vol), max);
    this.setState({provisions: [...this.state.provisions]});
  }

  disableForward() {
    return this.state.provisions.every(p => p.volume === 0);
  }

  forward() {
    this.props.forward(this.state.provisions);
  }

  componentWillReceiveProps(nextProps) {
    this.state = { provisions: [...nextProps.provisions] };
  }

  renderProvisions() {
    let provisions = this.state.provisions.map((provision, index) => {
      const max = provision.total - provision.promised;
      return (
        <div key={index} className="form-group">
          <label htmlFor={`provision-${index}`}
                 className="col-sm-2 control-label">
            {provision.name}
          </label>
          <div className="col-sm-8">
            <div className="input-group">
              <input type="number" value={provision.volume} onChange={evt => this.onChange(evt, index)} className="form-control" id={`provision-${index}`} />
              <div className="input-group-addon">{provision.unit}</div>
            </div>
          </div>
          <div className="col-sm-2">
            <label className="control-label">仍需 {max}</label>
          </div>
        </div>
      );
    });

    return provisions;
  }

  render() {
    return (
      <div className="provision-list-form">
        <form className="form-horizontal">
          <h1>請填寫您想捐贈的物資數量</h1>
          <div className="provision-list">{this.renderProvisions()}</div>
          <WizardButtons
            disableForward={this.disableForward()}
            forward={this.forward}
            cancel={this.props.cancel}
            first={this.props.first}
          />
        </form>
      </div>
    );
  }
}
