import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class ProvisionRequirement extends Component {

  renderProvisions() {
    const provisionRequirements = this.props.provisionRequirements;

    if (!provisionRequirements && Object.keys(provisionRequirements).length === 0) {
      return;
    }

    let provisions = Object.keys(provisionRequirements).map(key => {
      const item = provisionRequirements[key];

      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.total}</td>
          <td>{item.shipped}</td>
          <td>{item.promised}</td>
          <td>{item.unit}</td>
        </tr>
      );
    });

    return provisions;
  }
  render() {
    return (
      <div className="pro-requirement">
        <Button bsStyle="primary">新增物資</Button>
        <table className="table">
         <thead>
           <tr>
             <th>物資名稱</th>
             <th>總數</th>
             <th>已收到</th>
             <th>已認領</th>
             <th>單位</th>
           </tr>
         </thead>
         <tbody>
           {this.renderProvisions()}
         </tbody>
        </table>
      </div>
    );
  }
}
