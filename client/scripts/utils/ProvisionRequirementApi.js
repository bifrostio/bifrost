import $ from 'jquery';

export default class ProvisionRequirementApi {
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
}
