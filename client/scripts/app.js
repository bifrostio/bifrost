import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Station from 'components/Station';
import StationManager from 'components/StationManager';
import Gallery from 'components/Gallery';
import MapView from 'components/MapView';
import Login from 'components/Login';
import ProjectList from 'components/ProjectList';
import ProjectContent from 'components/ProjectContent';
import ProvisionRequirement from 'components/ProvisionRequirement';
import ProvisionActivity from 'components/ProvisionActivity';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';

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
      <Route path='manager/station/:id' component={StationManager} >
        <IndexRedirect to='requirement' />
        <Route path='requirement' component={ProvisionRequirement} />
        <Route path='activity' component={ProvisionActivity} />
      </Route>
      <Route path='gallery' component={Gallery} />
      <Route path='login' component={Login} />
      <Route path='projects' component={ProjectList} />
      <Route path='projects/:id' component={ProjectContent} />
    </Route>
  </Router>
), document.getElementById('bifrost'));
