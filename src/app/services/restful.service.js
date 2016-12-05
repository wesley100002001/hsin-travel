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

  getMockHotels () {
    return this.$q(function (resolve, reject) {
      var hotels = [
        { id: 1, name: 'Hotel 1', address: '台北市中山北路二段50號' },
        { id: 2, name: 'Hotel 2', address: '台北市延平南路三段243號' },
        { id: 3, name: 'Hotel 3', address: '新北市板橋區懷德街390號' },
        { id: 4, name: 'Hotel 4', address: '台北市中山北路二段50號' },
        { id: 5, name: 'Hotel 5', address: '新北市板橋區懷德街390號' },
        { id: 6, name: 'Hotel 6', address: '台北市中山北路二段50號' },
        { id: 7, name: 'Hotel 7', address: '新北市板橋區懷德街390號' },
        { id: 8, name: 'Hotel 8', address: '新北市板橋區懷德街390號' },
        { id: 9, name: 'Hotel 9', address: '台北市中山北路二段50號' },
        { id: 10, name: 'Hotel 10', address: '新北市板橋區懷德街390號' },
        { id: 11, name: 'Hotel 11', address: '新北市板橋區懷德街390號' },
        { id: 12, name: 'Hotel 12', address: '台北市中山北路二段50號' },
        { id: 13, name: 'Hotel 13', address: '新北市板橋區懷德街390號' }
      ];
      resolve(hotels);
    });
  }

  getMockRequests () {
    return this.$q(function (resolve, reject) {
      var requests = [
        { requestId: 'A001', title: '北台灣五天四夜', startTime: '2016/08/09', endTime: '2016/08/13', requester: 'Wesley', people: '20', createTime: '2016/08/10' },
        { requestId: 'A002', title: '南台灣四天三夜', startTime: '2016/09/20', endTime: '2016/09/23', requester: 'Christine', people: '20', createTime: '2016/08/11' },
        { requestId: 'A003', title: '北台灣五天四夜', startTime: '2016/08/09', endTime: '2016/08/13', requester: 'Christine', people: '20', createTime: '2016/08/13' },
        { requestId: 'A004', title: '南台灣四天三夜', startTime: '2016/09/20', endTime: '2016/09/23', requester: 'Christine', people: '20', createTime: '2016/08/13' },
        { requestId: 'A005', title: '北台灣五天四夜', startTime: '2016/08/09', endTime: '2016/08/13', requester: 'Wesley', people: '20', createTime: '2016/08/16' },
        { requestId: 'A006', title: '南台灣四天三夜', startTime: '2016/09/20', endTime: '2016/09/23', requester: 'Kevin', people: '20', createTime: '2016/08/17' },
        { requestId: 'A007', title: '北台灣五天四夜', startTime: '2016/08/09', endTime: '2016/08/13', requester: 'Wesley', people: '20', createTime: '2016/08/21' },
        { requestId: 'A008', title: '南台灣四天三夜', startTime: '2016/09/20', endTime: '2016/09/23', requester: 'Kevin', people: '20', createTime: '2016/08/22' },
        { requestId: 'A009', title: '北台灣五天四夜', startTime: '2016/08/09', endTime: '2016/08/13', requester: 'Wesley', people: '20', createTime: '2016/08/23' },
        { requestId: 'A010', title: '南台灣四天三夜', startTime: '2016/09/20', endTime: '2016/09/23', requester: 'John', people: '20', createTime: '2016/08/29' }
      ];
      resolve(requests);
    });
  }

  getMockRequest () {
    return this.$q(function (resolve, reject) {
      var request = {
        title: '花東縱谷七天六夜',
        people: 20,
        hotel: [
          { date: '2016/09/20', hotelId: 'H003', hotelName: '國賓大飯店', roomId: 13, roomTitle: '雙人房', quantity: 20 },
          { date: '2016/09/21', hotelId: 'H003', hotelName: '國賓大飯店', roomId: 13, roomTitle: '雙人房', quantity: 20 },
          { date: '2016/09/22', hotelId: 'H003', hotelName: '國賓大飯店', roomId: 13, roomTitle: '雙人房', quantity: 20 }
        ],
        comments: [

        ]
      };
      resolve(request);
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
