import $ from 'jquery';
import async from 'async';

export default class Batch {
  static generateTrackingNumber() {
    var text = '';
    var possible = '0123456789';

    for(let i=0; i < 6; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  static create(batch, activities, cb) {
    batch.trackingNumber = Batch.generateTrackingNumber();
    async.series([
      callback => {
        $.post('/api/batches', batch)
        .done(data => {
          batch = data;
          callback();
        })
        .fail(callback);
      },
      callback => {
        activities.forEach(a => a.batchId = batch.id);
        $.ajax({
          url: '/api/provisionActivities',
          type: 'POST',
          data: JSON.stringify(activities),
          contentType: 'application/json; charset=utf-8',
          dataType: 'json'
        })
        .done(data => {
          batch.provisionActivities = data;
          callback();
        })
        .fail(callback);
      }
    ], err => {
      cb(err, batch);
    });
  }

  static findById(id, cb) {
    let filter = {include: ['provisionActivities', 'station']};
    filter = encodeURIComponent(JSON.stringify(filter));
    $.get(`/api/batches/${id}?filter=${filter}`)
    .done(data => cb(null, data))
    .fail(cb);
  }
}
