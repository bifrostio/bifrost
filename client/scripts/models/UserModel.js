import { fetchJSON, postJSON} from '../utils';

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

  static updateProvisionAvtivity(body, doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    postJSON(`/api/provisionActivities?access_token=${token}`, body)
    .then(doneCallback)
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
