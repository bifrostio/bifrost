import { fetchJSON, postJSON, post, putJSON} from '../utils';

export default class UserModel {
  static login(body, doneCallback, failCallback) {

    postJSON('/api/users/login', body)
    .then(json => {
      if (json.error) {
        return failCallback(json.error.status);
      }
      else {
        return doneCallback(json.id);
      }
    })
    .catch(err => {
      failCallback(err);
    });
  }

  static updateProvisionActivity(body, doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');
    let result;

    if (!token) {
      failCallback(401);
      return;
    }

    let batchIds = [];
    body.forEach(activity => {
      if (batchIds.indexOf(activity.batchId) === -1) {
        batchIds.push(activity.batchId);
      }
    });

    postJSON(`/api/provisionActivities?access_token=${token}`, body)
    .then(json => result = json)
    .then(() => {
      const type = 'shipped';
      return Promise.all(batchIds.map(batchId => post('/api/batches/notify', {batchId, type})));
    })
    .then(() => doneCallback(result))
    .catch(failCallback);
  }

  static addStation(station, contact, cb) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      return;
    }

    postJSON(`/api/stations?access_token=${token}`, station)
    .then(json => station = json)
    .then(() => {
      const url = `/api/stations/${station.id}/contacts?access_token=${token}`;
      contact.id = station.id;
      return postJSON(url, contact);
    })
    .then(json => station._contacts.push(json))
    .then(() => cb(null, station))
    .catch(err => cb(err));
  }

  static updateStationInfo(id, properties, done, fail) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      fail(401);
      return;
    }

    const path = `/api/stations/${id}?access_token=${token}`;
    return putJSON(path, properties)
    .then(res => done(res))
    .catch(err => fail(err));
  }

  static getStationInfo(id, doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    let filter = {
      'include': [
        {'provisionRequirements': 'provisionActivities'},
        {'batches': 'provisionActivities'}
      ]
    };
    filter = encodeURIComponent(JSON.stringify(filter));

    const path = `/api/stations/${id}?filter=${filter}&access_token=${token}`;

    fetchJSON(path)
    .then(doneCallback)
    .catch(failCallback);
  }

  static getStationBatches(id, doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    const path = `/api/stations/${id}/batches?access_token=${token}`;

    fetchJSON(path)
    .then(doneCallback)
    .catch(failCallback);
  }
}
