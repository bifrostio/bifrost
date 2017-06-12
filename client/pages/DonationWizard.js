import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';

import Steps from '../components/Steps';
import ProvisionListForm from '../components/ProvisionListForm';
import ContactForm from '../components/ContactForm';
import Confirmation from '../components/Confirmation';
import Success from '../components/Success';
import StationInformation from '../components/StationInformation';

import StationModel from '../models/StationModel';
import BatchModel from '../models/BatchModel';

export default class DonationWizard extends Component {
  constructor(props) {
    super(props);

    this.forward = this.forward.bind(this);
    this.back = this.back.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.state = {
      step : 0,
      provisions: [],
      station: {},
      contact: {},
      batch: {}
    };
  }

  forward(result) {
    if (this.state.step === 0) {
      this.setState({
        provisions: result,
        step: (this.state.step + 1)
      });
    }
    else if (this.state.step === 1) {
      this.setState({
        contact: result,
        step: (this.state.step + 1)
      });
    }
  }

  submit() {
    const self = this;
    let batch = {
      createdDate: Date(),
      updatedDate: Date(),
      stationId: this.state.station.id,
      note: this.state.contact.note,
      _contact: this.state.contact
    };
    let activities = this.state.provisions.map((req) => {
      let promised = req.volume;
      return {
        stationId: this.state.station.id,
        provisionRequirementId: req.id,
        promised: promised
      };
    });
    BatchModel.create(batch, activities, (err, data) => {
      if (!err) {
        self.setState({
          batch: data,
          step: (self.state.step + 1)
        });
      }
    });
  }

  back() {
    this.setState({step: (this.state.step - 1)});
  }

  cancel() {
    window.location.href = `/#/stations/${this.state.station.id}`;
  }

  componentWillMount() {
    const self = this;
    StationModel.findById(this.props.params.id, (err, station) => {
      station.provisionRequirements.forEach(req => req.volume = 0);
      self.setState({station: station});
    });
  }

  renderStepPage() {
    let provisions = this.state.station.provisionRequirements || [];
    switch (this.state.step) {
    case 0:
      return <ProvisionListForm
                cancel={this.cancel}
                provisions={provisions}
                forward={this.forward}
                first={true} />;
    case 1:
      return <ContactForm
                back={this.back}
                forward={this.forward}
                contact={this.state.contact} />;
    case 2:
      return <Confirmation
                back={this.back}
                submit={this.submit}
                contact={this.state.contact}
                provisions={this.state.provisions} />;
    case 3:
      return <Success
                station={this.state.station}
                batch={this.state.batch} />;
    }
  }

  render() {
    const steps = [ '選擇捐贈物', '填寫捐贈人資訊', '確認並送出資訊', '完成'];
    return (
      <div>
        <Grid className="station-page">
          <StationInformation station={this.state.station} />
          <Steps currentStep={this.state.step} steps={steps}  />
          {this.renderStepPage()}
        </Grid>
      </div>
    );
  }
}
