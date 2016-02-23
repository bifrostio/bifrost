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
}
