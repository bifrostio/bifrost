import $ from 'jquery';
import async from 'async';

export default class ProjectApi {
  static getProjects(doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    const path = `/api/projects?access_token=${token}`;

    $.get(path)
    .done(function(result) {
      doneCallback(result);
    })
    .fail(function(e) {
      failCallback(e.status);
    });
  }

  static getProjectInfo(id, doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    const path = `/api/projects/${id}?access_token=${token}`;

    $.get(path)
    .done(function(result) {
      doneCallback(result);
    })
    .fail(function(e) {
      failCallback(e.status);
    });
  }

  static getStationsOfProject(id, doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    const path = `/api/projects/${id}/stations?access_token=${token}`;

    $.get(path)
    .done(function(result) {
      doneCallback(result);
    })
    .fail(function(e) {
      failCallback(e.status);
    });
  }

  static createProject(body, doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    const path = `/api/projects?access_token=${token}`;

    $.post(path, body)
    .done(function(result) {
      doneCallback(result);
    })
    .fail(function(e) {
      failCallback(e.status);
    });
  }
}
