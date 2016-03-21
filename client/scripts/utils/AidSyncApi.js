import $ from 'jquery';
import Papa from 'papaparse';
import async from 'async';

export default class AidSyncApi {

  static getOfficialStations(cb) {
    async.parallel([
      function(done) {
        var url = 'https://raw.githubusercontent.com/g0v-data/aid-sync/gh-pages/aid.csv';
        $.get(url)
        .done(function(result) {
          var json = Papa.parse(result);
          done(null, json);
        })
        .fail(done);
      },
      function(done) {
        $.get('/places.json')
        .done(function(result) {
          done(null, result);
        })
        .fail(done);
      }
    ], function(err, results) {
      var stations = results[1];
      var provisions = results[0].data;

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

        stations[stationName].provisionRequirements =
          stations[stationName].provisionRequirements || [];
        stations[stationName].provisionRequirements.push(provision);
        stations[stationName].key = stationName;
      });

      if (window.localStorage) {
        window.localStorage.setItem('stations', JSON.stringify(stations));
      }

      cb(err, stations);
    });
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
      AidSyncApi.getOfficialStations((err, stations) => {
        cb(err, stations[key]);
      });
    }
  }
}
