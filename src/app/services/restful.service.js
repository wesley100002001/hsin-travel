import config from '../../../config';
import angular from 'angular';
import moment from 'moment';

class Restful {
  constructor ($http, $q) {
    this.http = $http;
    this.$q = $q;
    var config = {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      databaseURL: config.databaseURL,
      storageBucket: config.storageBucket,
    };
    firebase.initializeApp(config);
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
    })
  }

  getOrders () {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/').on('value', function (snapshot) {
        resolve(snapshot.val());
      });
    })
  }

  getOrder (orderId) {
    return this.$q(function (resolve, reject) {
      firebase.database().ref('order/' + orderId).on('value', function (snapshot) {
        resolve(snapshot.val());
      });
    })
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
    })
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
