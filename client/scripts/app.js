import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from 'components/Header';
import Provision from 'components/Provision';
import Station from 'components/Station';
import StationList from 'components/StationList';
import ContactForm from 'components/ContactForm';

export default class Bifrost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <ContactForm extra={['address']} />
        <Provision name="傘"
                   thumbnail="http://fakeimg.pl/100x100/"
                   total="100"
                   shipped="50"
                   promised="70"
                   unit="隻" />
        <Station contact={{name: '姓名', phone: '192384728', email: 'asdk@gmail.com', address: '台北市信義區三段123號'}} />
        <StationList stations={[{id: 1, name: 'Station name', shippedPercentage: 50, promisedPercentage: 70}]} />
      </div>
    );
  }
}

ReactDOM.render(<Bifrost />, document.getElementById('bifrost'));
