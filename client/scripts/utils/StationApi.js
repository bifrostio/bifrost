import $ from 'jquery';
import async from 'async';
import debug from 'debug';

let log = debug('bifrost:StationApi');

export default class Station {
  static findById(id, done) {
    let station;
    let provisionRequirements;

    async.series([
      callback => {
        $.get(`/api/stations/${id}`)
        .done(function(result) {
          station = result;
          callback();
        })
        .fail(callback);
      },
      callback => {
        let filter = {
          where: {stationId: id},
          include: 'provisionActivities'
        };
        filter = encodeURIComponent(JSON.stringify(filter));
        $.get(`/api/provisionRequirements?filter=${filter}`)
        .done(function(result) {
          provisionRequirements = result;
          callback();
        })
        .fail(callback);
      }
    ], function(err) {
      if (station && provisionRequirements) {
        provisionRequirements.forEach(requirement => {
          let shipped = 0;
          let promised = 0;
          requirement.provisionActivities.forEach(activity => {
            log('activity', activity);
            if (activity.shipped !== undefined) {
              shipped += activity.shipped;
            }
            if (activity.promised !== undefined) {
              promised += activity.promised;
            }
          });
          requirement.shipped = shipped;
          requirement.promised = promised;
        });
        station.provisionRequirements = provisionRequirements;
      }
      done(err, station);
    });
  }

  static find(filter, done) {
    if (!done) {
      done = filter;
      filter = {};
    }

    filter = filter || {};

    let stations;

    async.series([
      callback => {
        filter.include = {'provisionRequirements': 'provisionActivities'};
        filter = encodeURIComponent(JSON.stringify(filter));
        $.get(`/api/stations?filter=${filter}`)
        .done(function(result) {
          stations = result;
          callback();
        })
        .fail(callback);
      },
      callback => {
        if (stations) {
          stations.forEach(station => {
            station.provisionRequirements.forEach(req => {
              let promised = 0;
              let shipped = 0;
              req.provisionActivities.forEach(activity => {
                if (activity.promised !== undefined) {
                  promised += activity.promised;
                }
                if (activity.shipped !== undefined) {
                  shipped += activity.shipped;
                }
              });
              req.promised = promised;
              req.shipped = shipped;
            });
          });
        }
        callback();
      }
    ], function(err) {
      done(err, Object.keys(stations).map(id => stations[id]));
    });
  }
}
