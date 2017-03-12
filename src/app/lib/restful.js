require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

import * as common from '../lib/common';
import config from '../../../config.json';

export function getHotels () {
  var token = localStorage.getItem('token');
  return fetch(config.heroku_host + '/hotels', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(response => {
    return response.json();
  });
}

export function getHotel (hotelId) {
  var token = localStorage.getItem('token');
  return fetch(config.heroku_host.concat('/hotel/').concat(hotelId), {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(response => {
    return response.json();
  });
}

export function getHotelRooms (hotelId) {
  var token = localStorage.getItem('token');
  return fetch(config.heroku_host.concat('/rooms?hotelId=').concat(hotelId), {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(response => {
    return response.json();
  });
}

export function postRequest (req) {
  var token = localStorage.getItem('token');
  return fetch(config.heroku_host + '/request', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(req)
  }).then(response => {
    return response.json();
  });
}

export function getRequest (requestId) {
  var token = localStorage.getItem('token');
  return fetch(config.heroku_host.concat('/request/').concat(requestId), {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(response => {
    return response.json();
  });
}

export function getRequests () {
  var token = localStorage.getItem('token');
  return fetch(config.heroku_host + '/requestMetas', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(response => {
    return response.json();
  });
}

export function getMockTWConversation (requestId) {
  return new Promise(function (resolve, reject) {
    var conversation = [
      { id: 'usert', comment: '新需求，再麻煩你們了～', timestamp: common.getJPDateWithHour(common.getNowTime())},
      { id: 'Wesley', comment: '沒問題', timestamp: common.getJPDateWithHour(common.getNowTime())}
    ];
    resolve(conversation);
  });
}

export function getMockJPConversation (requestId) {
  return new Promise(function (resolve, reject) {
    var conversation = [
      { id: 'usert', comment: 'お願いします', timestamp: common.getJPDateWithHour(common.getNowTime())},
      { id: 'Wesley', comment: '大丈夫', timestamp: common.getJPDateWithHour(common.getNowTime())}
    ];
    resolve(conversation);
  });
}

export function addComment (comment) {
  return new Promise(function (resolve, reject) {
    resolve(comment);
  })
}

// TODO: to be finished
export function putRequest (req) {
  return fetch(config.heroku_host.concat('/request/').concat(requestId), {
    method: 'PUT',

  });
}

export function postUserAuth (username, password) {
  return fetch(config.heroku_host + '/users/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
  }).then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });
}

export function getFare (roomId, timeFrame) {
  var token = localStorage.getItem('token');
  var fetchUrl = config.heroku_host.concat('/rooms/').concat(roomId).concat('/fare?dates=').concat(JSON.stringify(timeFrame));
  return fetch(fetchUrl, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(response => {
    return response.json();
  });
}

export function getAccommodation (accoId) {
  return new Promise(function (resolve, reject) {
    var acco = {
      accoId: 'aco01',
      date: '2016/09/20',
      hotelId: 'H003',
      hotelName: '國賓大飯店',
      roomId: 13,
      roomTitle: '雙人房',
      quantity: 20
    };
    resolve(acco);
  });
}

export function postAccommodation (requestId, acco) {
  var token = localStorage.getItem('token');
  console.log(JSON.stringify(acco));
  return fetch(config.heroku_host.concat('/request/').concat(requestId).concat('/accommodation'), {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(acco)
  }).then(response => {
    console.log(response);
    return response.json();
  });
}

export function deleteAccommodation (requestId, accoId) {
  var token = localStorage.getItem('token');
  var fetchUrl = config.heroku_host.concat('/request/').concat(requestId).concat('/accommodation/').concat(accoId);
  return fetch(fetchUrl, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(response => {
    return response.json();
  });
}
