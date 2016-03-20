import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import ProvisionForm from 'components/ProvisionForm';
import ManagementButtons from 'components/ManagementButtons';

export default class ProvisionRequirement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddProvisionPanel: false,
      showEditModal: false,
      editingProvision: null,
      newProvision: {total: 0}
    };
  }

  toggleAddProvisionPanel() {
    this.setState({showAddProvisionPanel: !this.state.showAddProvisionPanel});
  }

  remove(provision) {
    this.props.removeProvision(provision.id);
  }

  showEditModal(provision) {
    this.setState({
      showEditModal: true,
      editingProvision: provision
    });
  }

  hideEditModal() {
    this.setState({
      showEditModal: false
    });
  }

  saveEditingProvision() {
    this.props.saveProvision(this.state.editingProvision);
    this.setState({
      showEditModal: false
    });
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
          <td>
            <ManagementButtons provision={item}
              edit={this.showEditModal.bind(this)}
              confirmDeletion={this.remove.bind(this)} />
          </td>
        </tr>
      );
    });

    return provisions;
  }

  updateAddingProvision(p) {
    this.setState({newProvision: p});
  }

  updateEditingProvision(p) {
    this.setState({editingProvision: p});
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
            updateProvision={this.updateAddingProvision.bind(this)}
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
        <Modal show={this.state.showEditModal} onHide={this.hideEditModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>編輯物資</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProvisionForm
              updateProvision={this.updateEditingProvision.bind(this)}
              provision={this.state.editingProvision} />
              <Button onClick={this.saveEditingProvision.bind(this)} bsStyle="primary">確認</Button>&nbsp;
              <Button onClick={this.hideEditModal.bind(this)}>取消</Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
