import 'isomorphic-fetch';
import {fetchJSON} from '../utils';
import debug from 'debug';

let log = debug('bifrost:StationModel');

export default class StationModel {
  static findById(id, done) {
    let filter = {
      where: {stationId: id},
      include: 'provisionActivities'
    };
    filter = encodeURIComponent(JSON.stringify(filter));

    let promises = [
      fetchJSON(`/api/stations/${id}`),
      fetchJSON(`/api/provisionRequirements?filter=${filter}`)
    ];

    Promise.all(promises)
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

    fetchJSON(`/api/stations?filter=${filter}`)
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
    fetchJSON(`/api/stations/${id}`, {method: 'DELETE'})
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
      fetchJSON(`/api/stations/${id}`, stationOptions),
      fetchJSON(`/api/stations/${id}/contacts/${contactId}`, contactOptions)
    ];

    Promise.all(promises)
    .then(results => {
      cb(null, results);
    })
    .catch(err => cb(err));
  }
}
