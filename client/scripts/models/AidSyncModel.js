import Papa from 'papaparse';
import {fetchJSON, fetchText} from '../utils';

export default class AidSyncModel {

  static getOfficialStations(cb) {
    const promises = [
      fetchText('https://raw.githubusercontent.com/g0v-data/aid-sync/gh-pages/aid.csv'),
      fetchJSON('/places.json')
    ];

    Promise.all(promises)
    .then(([csv, stations]) => {
      let provisions = Papa.parse(csv).data;

      provisions.forEach((p, i) => {
        if (i === 0 || (!p[0] && !p[1])) {
          return;
        }

        let stationName = p[1].replace('臺', '台').trim();
        let provision = {
          name: p[4].trim(),
          unit: p[7].trim(),
          category: p[2].trim(),
          total: parseInt(p[6].trim())
        };

        if (p[8].trim()) {
          let d = p[8].trim();
          let year = 1911 + parseInt(d.substr(0, 3));
          let month = parseInt(d.substr(3, 2));
          let day = parseInt(d.substr(5, 2));
          provision.expired = new Date(year, month, day).toString();
        }

        if (stations[stationName]) {
          stations[stationName].provisionRequirements =
            stations[stationName].provisionRequirements || [];
          stations[stationName].provisionRequirements.push(provision);
          stations[stationName].key = stationName;
        }
      });

      if (window.localStorage) {
        window.localStorage.setItem('stations', JSON.stringify(stations));
      }

      cb(null, stations);
    })
    .catch(err => cb(err));
  }

  static findById(key, cb) {
    let stations;

    if (window.localStorage) {
      let raw = window.localStorage.getItem('stations');
      if (raw) {
        stations = JSON.parse(raw);
      }
    }

    if (stations) {
      cb(null, stations[key]);
    }
    else {
      AidSyncModel.getOfficialStations((err, stations) => {
        cb(err, stations[key]);
      });
    }
  }
}
