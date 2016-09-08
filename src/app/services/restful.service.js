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

  getUnshippedAmount () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/').orderByChild('ship_status')
      .equalTo('notyet').once('value', function (snapshot) {
        resolve(Object.keys(snapshot.val()).length);
      });
    });
  }

  getShippedAmount () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/').orderByChild('ship_status')
      .equalTo('shipped').once('value', function (snapshot) {
        resolve(Object.keys(snapshot.val()).length);
      });
    });
  }

  getSuccessPaidAmount () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/').orderByChild('status')
      .equalTo('success').once('value', function (snapshot) {
        if (!!snapshot.val()) {
          resolve(Object.keys(snapshot.val()).length);
        } else {
          resolve(0);
        }
      });
    });
  }

  getFailedPaidAmount () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/').orderByChild('status')
      .equalTo('failed').once('value', function (snapshot) {
        if (!!snapshot.val()) {
          resolve(Object.keys(snapshot.val()).length);
        } else {
          resolve(0);
        }
      });
    });
  }

  getRecurringPaidAmount () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/').orderByChild('status')
      .equalTo('recurring').once('value', function (snapshot) {
        if (!!snapshot.val()) {
          resolve(Object.keys(snapshot.val()).length);
        } else {
          resolve(0);
        }
      });
    });
  }

  getLastUpdateTime () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('lastupdate/').on('value', function(snapshot) {
        if (!snapshot.val()) {
          resolve(moment().format('YYYY 年 MM 月 DD 日 HH:mm:ss'));
        } else {
          resolve(moment(snapshot.val().time).format('YYYY 年 MM 月 DD 日 HH:mm:ss'));
        }
      });
    });
  }

  updateLastUpdateTime () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('lastupdate/').update({
        time: moment().format()
      }).then(function () {
        resolve('Success');
      });
    });
  }

  getUnshippedLabels () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/').orderByChild('ship_status')
      .equalTo('notyet').once('value', function (snapshot) {
        var labels = [];
        angular.forEach(snapshot.val(), function (value, key) {
          labels.push({
            receiver_name: value.receiver_name,
            receiver_phone: value.receiver_phone,
            receiver_address: value.receiver_address
          });
        });
        resolve(labels);
      });
    });
  }

  getErrorLabels () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/').orderByChild('ship_status')
      .equalTo('error').once('value', function (snapshot) {
        var labels = [];
        angular.forEach(snapshot.val(), function (value, key) {
          labels.push({
            receiver_name: value.receiver_name,
            receiver_phone: value.receiver_phone,
            receiver_address: value.receiver_address
          });
        });
        resolve(labels);
      });
    });
  }

  getOrders () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/').on('value', function (snapshot) {
        var orders = [];
        angular.forEach(snapshot.val(), function (value, key) {
          value.pay_time = value.pay_time === '無' ? '無' : moment(value.pay_time).format('YYYY 年 MM 月 DD 日 HH:mm:ss');
          orders.push(value);
        });
        resolve(orders);
      });
    });
  }

  getOrder (orderId) {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/' + orderId).on('value', function (snapshot) {
        resolve(snapshot.val());
      });
    });
  }

  queryOrders (query) {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/')
      .orderByChild('pay_time')
      .startAt(moment(query.startTime).format())
      .endAt(moment(query.endTime).format())
      .once('value', function (snapshot) {
        var orders = [];
        angular.forEach(snapshot.val(), function (value, key) {
          value.pay_time = value.pay_time === '無' ? '無' : moment(value.pay_time).format('YYYY 年 MM 月 DD 日 HH:mm:ss');
          orders.push(value);
        });
        resolve(orders);
      })
    });
  }

  getUnshippedOrders () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/').orderByChild('ship_status').equalTo('notyet')
      .on('value', function (snapshot) {
        var orders = [];
        angular.forEach(snapshot.val(), function (value, key) {
          value.pay_time = value.pay_time === '無' ? '無' : moment(value.pay_time).format('YYYY 年 MM 月 DD 日 HH:mm:ss');
          orders.push(value);
        });
        resolve(orders);
      });
    });
  }

  updateOrder (orderId, obj) {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/' + orderId).update(obj)
      .then(function () {
        resolve('Success');
      })
    });
  }

  getMockAdmin () {
    return this.$q(function (resolve, reject) {
      resolve(true);
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
}

export default angular.module('services.restful', ['firebase'])
  .service('restful', Restful)
  .name;
