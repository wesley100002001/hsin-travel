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
}

export default angular.module('services.restful', ['firebase'])
  .service('restful', Restful)
  .name;
