import 'isomorphic-fetch';
import {fetchJSON, postJSON, post} from '../utils';

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
    postJSON('/api/batches', batch)
    .then(json => batch = json)
    .then(() => {
      activities.forEach(a => a.batchId = batch.id);
      return postJSON('/api/provisionActivities', activities);
    })
    .then(json => {
      batch.provisionActivities = json;
    })
    .then(() => post('/api/batches/notify', { batchId: batch.id, type: 'promised' }))
    .then(() => cb(null, batch))
    .catch(err => cb(err));
  }

  static findById(id, cb) {
    let filter = {
      include: [
        { provisionActivities: 'provisionRequirement' },
        'station'
      ]
    };
    filter = encodeURIComponent(JSON.stringify(filter));
    fetchJSON(`/api/batches/${id}?filter=${filter}`)
    .then(json => cb(null, json))
    .catch(err => cb(err));
  }

  static searchByTrackingNumber(number) {
    const token = sessionStorage.getItem('token');

    let filter = {
      where: {trackingNumber: number},
      include: ['provisionActivities']
    };
    filter = encodeURIComponent(JSON.stringify(filter));

    return fetchJSON(`/api/batches?filter=${filter}&access_token=${token}`);
  }
}
