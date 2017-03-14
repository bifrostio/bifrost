import 'isomorphic-fetch';
import json2csv from 'json2csv';

function fetchJSON(url, init) {
  return fetch(url, init).then(res => res.json());
}

function fetchText(url, init) {
  return fetch(url, init).then(res => res.text());
}

function postJSON(url, json) {
  return fetchJSON(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(json)
  });
}

function post(url, json) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(json)
  });
}

function postForm(url, formData) {
  let data = new FormData();
  Object.keys(formData)
    .forEach(key => data.append(key, formData[key]));

  return fetch(url, { method: 'POST', body: data });
}

function putJSON(url, json) {
  return fetchJSON(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(json)
  });
}

function getCSV(batches) {
  if (batches.length === 0) return;

  let requirements = batches[0].station.provisionRequirements;
  let items = batches.map(batch => {
    let item = {
      '姓名': batch._contact.name,
      '電話': batch._contact.phone,
      '電子郵件': batch._contact.email,
      '追蹤編號': batch.trackingNumber,
    };

    let provisions = {};
    requirements.forEach(requirement => {
      provisions[requirement.id] = {
        promised: 0,
        shipped: 0,
        id: requirement.id,
        name: requirement.name
      };
    });

    batch.provisionActivities.forEach(activity => {
      ['promised', 'shipped'].forEach(prop => {
        if (activity[prop] !== undefined) {
          const rid = activity.provisionRequirementId;
          provisions[rid][prop] = activity[prop];
        }
      });
    });

    Object.keys(provisions).forEach(id => {
      const provision = provisions[id];
      item[provision.name + '（收到）'] = provision.shipped;
      item[provision.name + '（認領）'] = provision.promised;
    });

    return item;
  });

  let fields = ['姓名', '電話', '電子郵件', '追蹤編號'];
  requirements.forEach(r => {
    fields.push(r.name + '（認領）');
    fields.push(r.name + '（收到）');
  });
  const result = json2csv({ data: items, fields });

  return result;
}

export {getCSV, fetchJSON, fetchText, postJSON, post, postForm, putJSON};
