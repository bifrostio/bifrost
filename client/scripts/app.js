import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Station from 'components/Station';
import Gallery from 'components/Gallery';
import MapView from 'components/MapView';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory, useBasename } from 'history';

const history = useBasename(createHistory)({
  basename: '/'
});

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
  <Router>
    <Route path='/' component={Bifrost}>
      <IndexRoute component={MapView}/>
      <Route path='stations/:id' component={Station} />
      <Route path='gallery' component={Gallery} />
    </Route>
  </Router>
), document.getElementById('bifrost'));
