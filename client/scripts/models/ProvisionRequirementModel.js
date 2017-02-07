import $ from 'jquery';

export default class ProvisionRequirementModel {
  static create(req, cb) {
    $.post('/api/provisionRequirements', req)
    .done(data => {
      cb(null, data);
    })
    .fail(cb);
  }

  static remove(id, cb) {
    $.ajax({
      url: `/api/provisionRequirements/${id}`,
      type: 'DELETE'
    })
    .done(data => cb(null, data))
    .fail(cb);
  }

  static update(p, cb) {
    let id = p.id;
    delete p.id;
    $.ajax({
      url: `/api/provisionRequirements/${id}`,
      type: 'PUT',
      data: JSON.stringify(p),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    })
    .done(data => cb(null, data))
    .fail(cb);
  }
}
