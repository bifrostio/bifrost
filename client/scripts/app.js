import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Station from 'components/Station';
import Gallery from 'components/Gallery';
import { Router, Route, Link } from 'react-router';

export default class Bifrost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <Link to="/gallery">gallery</Link>
        <Link to='/stations/123'>stations 123</Link>
        <div>
          {this.props.children || 'Welcome to your Inbox'}
        </div>
      </div>
    );
  }
}

ReactDOM.render((
  <Router>
    <Route path='/' component={Bifrost}>
      <Route path='stations/:id' component={Station} />
      <Route path='gallery' component={Gallery} />
    </Route>
  </Router>
), document.getElementById('bifrost'));
