import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import ProvisionForm from 'components/ProvisionForm';
import ManagementButtons from 'components/ManagementButtons';

export default class ProvisionRequirement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddProvisionPanel: false,
      newProvision: {total: 0}
    };
  }

  toggleAddProvisionPanel() {
    this.setState({showAddProvisionPanel: !this.state.showAddProvisionPanel});
  }

  remove(id) {
    this.props.removeProvision(id);
  }

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
          <td><ManagementButtons provisionId={item.id} confirm={this.remove.bind(this)}/></td>
        </tr>
      );
    });

    return provisions;
  }

  updateProvision(p) {
    this.setState({newProvision: p});
  }

  addProvision() {
    this.props.addProvision(this.state.newProvision);
    this.toggleAddProvisionPanel();
    this.setState({newProvision: {}});
  }

  render() {
    let addProvisionPanel, addButton;
    if (this.state.showAddProvisionPanel) {
      addProvisionPanel = (
        <div className="provision-form">
          <ProvisionForm
            updateProvision={this.updateProvision.bind(this)}
            provision={this.state.newProvision} />
            <Button onClick={this.addProvision.bind(this)} bsStyle="primary">確認</Button>&nbsp;
            <Button onClick={this.toggleAddProvisionPanel.bind(this)}>取消</Button>
        </div>
      );
    }
    else {
      addButton = (
        <Button bsStyle="primary"
                onClick={this.toggleAddProvisionPanel.bind(this)}>新增物資</Button>
      );
    }

    return (
      <div className="pro-requirement">
        {addButton}
        {addProvisionPanel}
        <table className="table">
         <thead>
           <tr>
             <th>物資名稱</th>
             <th>總數</th>
             <th>已收到</th>
             <th>已認領</th>
             <th>單位</th>
             <th>管理</th>
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
