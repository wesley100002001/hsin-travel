import moment from 'moment';

export default class RequestsController {
  constructor ($state, $cookies, acl, $stateParams, restful) {
    if (!acl.checkStatus($cookies.get('status'))) {
      $state.go('login');
    }

    this.list = [{a: 1, b: 2, c: 3}, {a: 45, b: 9, c: 10}];
  }
}

RequestsController.$inject = ['$state', '$cookies', 'acl', '$stateParams', 'restful'];
