export default class OrderController {
  constructor ($state, $cookies, acl) {
    if (!acl.checkStatus($cookies.get('status'))) {
      $state.go('login');
    }
    var scope = this;

  }
}

OrderController.$inject = ['$state', '$cookies', 'acl'];
