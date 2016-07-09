export default class OrderController {
  constructor ($state, $cookies, acl, $stateParams, restful) {
    if (!acl.checkStatus($cookies.get('status'))) {
      $state.go('login');
    }
    var scope = this;
    var orderId = $stateParams.orderId;

    scope.restful = restful;
    scope.restful.getOrder(orderId)
    .then(response => {
      scope.info = response;
    });
  }
}

OrderController.$inject = ['$state', '$cookies', 'acl', '$stateParams', 'restful'];
