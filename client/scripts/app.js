import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';

import Station from './pages/Station';
import Landing from './pages/Landing';
import StationManager from './pages/StationManager';
import MapView from './pages/MapView';
import BatchView from './pages/BatchView';
import Login from './pages/Login';
import ProjectList from './pages/ProjectList';
import ProjectContent from './pages/ProjectContent';
import ProvisionRequirement from './pages/ProvisionRequirement';
import ProvisionActivity from './pages/ProvisionActivity';

export default class Bifrost extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={Bifrost}>
      <IndexRoute component={Landing}/>
      <Route path='map' component={MapView} />
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
      <Route path='*' component={Landing} />
    </Route>
  </Router>
), document.getElementById('bifrost'));
