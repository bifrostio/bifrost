import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from 'components/Header';
import Provision from 'components/Provision';
import Station from 'components/Station';
import StationList from 'components/StationList';
import ContactForm from 'components/ContactForm';
import StationMap from 'components/StationMap';
import Project from 'components/Project';

export default class Bifrost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const markers = [
      {key: 'marker1', position: [25.105, 121.51], children: 'My first popup'},
      {key: 'marker2', position: [25.1051, 121.52], children: 'My second popup'},
      {key: 'marker3', position: [25.1049, 121.505], children: 'My third popup'}
    ];
    return (
      <div>
        <StationMap markers={markers} />
        <ContactForm extra={['address']} />
        <Provision name="傘"
                   thumbnail="http://fakeimg.pl/100x100/"
                   total="100"
                   shipped="50"
                   promised="70"
                   unit="隻" />
        <Station contact={{name: '姓名', phone: '192384728', email: 'asdk@gmail.com', address: '台北市信義區三段123號'}} />
        <StationList stations={[{id: 1, name: 'Station name', shippedPercentage: 50, promisedPercentage: 70}]} />
        <Project projectName={'311大地震'} projectTime={'2015/01/03'} isClose={true} />
      </div>
    );
  }
}

ReactDOM.render(<Bifrost />, document.getElementById('bifrost'));
