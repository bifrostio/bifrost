import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from 'components/Header';

export default class Bifrost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

ReactDOM.render(<Bifrost />, document.getElementById('bifrost'));
