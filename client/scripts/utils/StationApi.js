import $ from 'jquery';
import async from 'async';

export default class Station {
  static findById(id, done) {
    let station;
    let provisions = {};

    async.series([
      callback => {
        let filter = { include: 'provisions'};
        filter = encodeURIComponent(JSON.stringify(filter));
        $.get(`/api/stations/${id}?filter=${filter}`)
        .done(function(result) {
          station = result;
          station.provisions.forEach(p => {
            provisions[p.id] = p;
          });
          callback();
        })
        .fail(callback);
      },
      callback => {
        let filter = { where: {stationId: id} };
        filter = encodeURIComponent(JSON.stringify(filter));
        $.get(`/api/provisionQuantities?filter=${filter}`)
        .done(function(result) {
          result.forEach(q => {
            provisions[q.provisionId].shipped = q.shipped;
            provisions[q.provisionId].promised = q.promised;
            provisions[q.provisionId].total = q.total;
          });
          callback();
        })
        .fail(callback);
      }
    ], function(err) {
      done(err, station);
    });
  }

  static find(filter, done) {
    if (!done) {
      done = filter;
      filter = {};
    }

    let stations = {};

    async.series([
      callback => {
        let filter = { include: 'provisions'};
        filter = encodeURIComponent(JSON.stringify(filter));
        $.get(`/api/stations?filter=${filter}`)
        .done(function(result) {
          result.forEach(station => {
            stations[station.id] = station;
            station.provisionQuantity = [];
          });
          callback();
        })
        .fail(callback);
      },
      callback => {
        let filter = {
          where: { or: Object.keys(stations).map(id => {
            return {stationId: id};
          })}
        };
        filter = encodeURIComponent(JSON.stringify(filter));
        $.get(`/api/provisionQuantities?filter=${filter}`)
        .done(function(result) {
          result.forEach(q => stations[q.stationId].provisionQuantity.push(q));
          callback();
        })
        .fail(callback);
      }
    ], function(err) {
      done(err, Object.keys(stations).map(id => stations[id]));
    });
  }
}
