import $ from 'jquery';
import async from 'async';

export default class ManagerApi {
  static login(body, doneCallback, failCallback) {

    $.post('/api/managers/login', body)
    .done(function(result) {
      doneCallback(result.id);
    })
    .fail(function(e) {
      failCallback(e.status);
    });
  }

  static updateProvisionAvtivity(body, doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    $.ajax({
      url: `/api/provisionActivities?access_token=${token}`,
      type: 'POST',
      data: JSON.stringify(body),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    })
    .done(function(result) {
      doneCallback(result);
    })
    .fail(function(e) {
      failCallback(e.status);
    });
  }

  static addStation(station, contact, cb) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    async.series([
      callback => {
        $.post(`/api/stations?access_token=${token}`, station)
        .done(data => {
          station = data;
          callback();
        })
        .fail(callback);
      },
      callback => {
        contact.id = station.id;
        $.ajax({
          url: `/api/stations/${station.id}/contacts?access_token=${token}`,
          type: 'POST',
          data: JSON.stringify(contact),
          contentType: 'application/json; charset=utf-8',
          dataType: 'json'
        })
        .done(data => {
          station._contacts.push(data);
          callback();
        })
        .fail(callback);
      }
    ], err => {
      cb(err, station);
    });
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

    $.get(path)
    .done(function(result) {
      doneCallback(result);
    })
    .fail(function(e) {
      failCallback(e.status);
    });
  }

  static getStationBatches(id, doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    const path = `/api/stations/${id}/batches?access_token=${token}`;

    $.get(path)
    .done(function(result) {
      doneCallback(result);
    })
    .fail(function(e) {
      failCallback(e.status);
    });
  }
}
