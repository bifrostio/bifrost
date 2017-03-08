import 'isomorphic-fetch';

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

export {fetchJSON, fetchText, postJSON, post, postForm, putJSON};
