import React, {Component} from 'react';

export default class Steps extends Component {
  render() {
    const steps = this.props.steps.map((step, index) => {
      let className = 'step';
      if (index <= this.props.currentStep) {
        className += ' finished-step';
      }

      const stepStyle = { left: `${1 / (this.props.steps.length - 1) * index * 100}%`};

      return (
        <div style={stepStyle} key={index} className={className}>
          <div className="circle">{index+1}</div>
          <div>{step}</div>
        </div>
      );
    });

    const width = this.props.currentStep / (this.props.steps.length - 1) * 100;
    const barStyle = {width: `${width}%`};

    return (
      <div className="steps">
        <div className="total"></div>
        <div className="finished" style={barStyle}></div>
        <div className="steps-container">
          {steps}
        </div>
      </div>
    );
  }
}
