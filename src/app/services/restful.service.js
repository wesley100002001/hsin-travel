import angular from 'angular';
import config from '../../../config';

class Restful {
  constructor ($http) {
    this.http = $http;
    this.api = 'http://pilot-hi-1.4free.com.tw/api/';
    this.mockApi = 'http://localhost:5000/dashboard/api/v1/';
    var config = {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      databaseURL: config.databaseURL,
      storageBucket: config.storageBucket,
    };
    firebase.initializeApp(config);
  }

  getTest () {
    var userId = '12345';
    var name = 'Wesley';
    var email = 'woeifjwoeifjowi@gmail';
    firebase.database().ref('admin/').set({
      account: 'admin',
      password: '1234'
    }).then(function () {
      alert('Success');
    });
    // ref.child('first').set('Ada').then(function () {
    //   alert('Success');
    // });
    // ref.child('last').set('Lovelace');
    // alert('kkk');
    firebase.database().ref('admin/').on('value', function(snapshot) {
      alert(JSON.stringify(snapshot.val()));
    });
    // alert('jijoij');
  }

  getAdmin (account, pwd) {
    return new Promise(function (resolve, reject) {
      firebase.database().ref('admin/').on('value', function(snapshot) {
        resolve(snapshot.val().account === account && snapshot.val().password === pwd);
      });
    });
  }

  getSites () {
    return this.http({
      method: 'GET',
      url: this.api + 'sites/'
    });
  }

  getActs () {
    return this.http({
      method: 'GET',
      url: this.mockApi + 'activities/'
    });
  }

  getAttrs () {
    return this.http({
      method: 'GET',
      url: this.mockApi + 'attractions/'
    });
  }
}

export default angular.module('services.restful', ['firebase'])
  .service('restful', Restful)
  .name;
