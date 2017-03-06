import {fetchJSON, postJSON} from '../utils';

export default class ProjectModel {
  static getProjects(doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    fetchJSON(`/api/projects?access_token=${token}`)
      .then(doneCallback)
      .catch(failCallback);
  }

  static getProjectInfo(id, doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    fetchJSON(`/api/projects/${id}?access_token=${token}`)
      .then(doneCallback)
      .catch(failCallback);
  }

  static getStationsOfProject(id, doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    fetchJSON(`/api/projects/${id}/stations?access_token=${token}`)
      .then(doneCallback)
      .catch(failCallback);
  }

  static createProject(body, doneCallback, failCallback) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      failCallback(401);
      return;
    }

    postJSON(`/api/projects?access_token=${token}`, body)
      .then(doneCallback)
      .catch(failCallback);
  }
}
