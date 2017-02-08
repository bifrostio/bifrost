import {fetchJSON, postJSON} from '../utils';

export default class ProvisionRequirementModel {
  static create(req, cb) {
    postJSON('/api/provisionRequirements', req)
    .then(json => cb(null, json))
    .catch(err => cb(err));
  }

  static remove(id, cb) {
    fetchJSON(`/api/provisionRequirements/${id}`, { method: 'DELETE' })
    .then(json => cb(null, json))
    .catch(err => cb(err));
  }

  static update(p, cb) {
    let id = p.id;
    delete p.id;
    fetchJSON(`/api/provisionRequirements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(p),
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
    .then(json => cb(null, json))
    .catch(err => cb(err));
  }
}
