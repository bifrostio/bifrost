import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';

import Station from './components/Station';
import StationManager from './components/StationManager';
import MapView from './components/MapView';
import BatchView from './components/BatchView';
import Login from './components/Login';
import ProjectList from './components/ProjectList';
import ProjectContent from './components/ProjectContent';
import ProvisionRequirement from './components/ProvisionRequirement';
import ProvisionActivity from './components/ProvisionActivity';

export default class Bifrost extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={Bifrost}>
      <IndexRoute component={MapView}/>
      <Route path='stations/:id' component={Station} />
      <Route path='officialStations/:id' component={Station} />
      <Route path='manager/station/:id' component={StationManager} >
        <IndexRedirect to='requirement' />
        <Route path='requirement' component={ProvisionRequirement} />
        <Route path='activity' component={ProvisionActivity} />
      </Route>
      <Route path='login' component={Login} />
      <Route path='projects' component={ProjectList} />
      <Route path='projects/:id' component={ProjectContent} />
      <Route path='batches/:id' component={BatchView} />
    </Route>
  </Router>
), document.getElementById('bifrost'));
