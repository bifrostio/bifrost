import 'isomorphic-fetch';

function fetchJSON(url, init) {
  return fetch(url, init).then(res => res.json());
}

function fetchText(url, init) {
  return fetch(url, init).then(res => res.text());
}

export {fetchJSON, fetchText};
