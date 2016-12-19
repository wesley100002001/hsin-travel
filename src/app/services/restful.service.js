//import config from '../../../config.js';
import angular from 'angular';
import moment from 'moment';

class Restful {
  constructor ($http, $q) {
    this.http = $http;
    this.$q = $q;
    var init = {
      apiKey: 'config.firebase.apiKey',
      authDomain: 'config.firebase.authDomain',
      databaseURL: 'config.firebaseio.com',
      storageBucket: 'config.firebase.storageBucket',
    };
    firebase.initializeApp(init);
  }

  getAdmin (account, pwd) {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('admin/').on('value', function (snapshot) {
        resolve(snapshot.val().account === account && snapshot.val().password === pwd);
      });
    });
  }

  getAdminPwd () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('admin/').on('value', function (snapshot) {
        resolve(snapshot.val().password);
      });
    });
  }

  setAdminPwd (pwd) {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('admin/').update({
        password: pwd
      }).then(function () {
        resolve('Success');
      })
    });
  }

  getMockAdmin (username, pwd) {
    return this.$q(function (resolve, reject) {
      if (username === 'admin') {
        resolve({
          status: 'loggedin',
          id: username,
          isAdmin: true
        });
      } else {
        resolve({
          status: 'loggedin',
          id: username,
          isAdmin: false
        });
      }
    });
  }

  getHerokuLogin () {
    return this.http({
      method: 'POST',
      url: 'https://intense-brook-59902.herokuapp.com/login',
      data: {
        username: 'user_j',
        password: 'auth_j'
      }
    }).then(function (res) {
      console.log(res);
      return res.data;
    }, function (err) {
      console.log(err);
      return err.data;
    });
  }

  getHerokuHotel () {
    return this.http({
      method: 'GET',
      url: 'https://intense-brook-59902.herokuapp.com/order'
    }).then(function (res) {
      console.log(res);
      return res.data;
    }, function (err) {
      console.log(err);
      return err.data;
    });
  }
}

export default angular.module('services.restful', ['firebase'])
  .service('restful', Restful)
  .name;
