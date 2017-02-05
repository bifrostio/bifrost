import 'isomorphic-fetch';
import async from 'async';
import debug from 'debug';

let log = debug('bifrost:StationApi');

export default class Station {
  static findById(id, done) {
    let filter = {
      where: {stationId: id},
      include: 'provisionActivities'
    };
    filter = encodeURIComponent(JSON.stringify(filter));

    let promises = [
      fetch(`/api/stations/${id}`),
      fetch(`/api/provisionRequirements?filter=${filter}`)
    ];

    Promise.all(promises)
    .then(values => Promise.all(values.map(val => val.json())))
    .then(([station, provisionRequirements]) => {
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
      return done(null, station);
    })
    .catch(err => done(err));
  }

  static find(filter, done) {
    if (!done) {
      done = filter;
      filter = {};
    }

    filter = filter || {};
    filter.include = {'provisionRequirements': 'provisionActivities'};
    filter = encodeURIComponent(JSON.stringify(filter));

    fetch(`/api/stations?filter=${filter}`)
    .then(res => res.json())
    .then((stations) => {
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
      done(null, Object.keys(stations).map(id => stations[id]));
    })
    .catch(err => done(err));
  }

  static remove(id, cb) {
    fetch(`/api/stations/${id}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(json => cb(null, json))
    .catch(err => cb(err));
  }

  static update(station, cb) {
    let id = station.id;
    let contact = station.contact;
    let contactId = contact.id;
    let headers = {
      'Content-Type': 'application/json; charset=utf-8'
    };

    delete station.id;
    delete station.contact;

    let stationOptions = {
      method: 'PUT',
      headers,
      body: JSON.stringify(station)
    };
    let contactOptions = {
      method: 'PUT',
      headers,
      body: JSON.stringify(contact)
    };

    let promises = [
      fetch(`/api/stations/${id}`, stationOptions),
      fetch(`/api/stations/${id}/contacts/${contactId}`, contactOptions)
    ];

    Promise.all(promises)
    .then(values => Promise.all(values.map(val => val.json())))
    .then(results => {
      cb(null, results);
    })
    .catch(err => cb(err));
  }
}
