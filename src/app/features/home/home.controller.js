export default class HomeController {
  constructor ($state, $stateParams, $cookies, acl, $http, $scope, restful) {
    var scope = this;
    this.restful = restful;
    if (!acl.checkStatus($cookies.get('status'))) {
      $state.go('login');
    }

    this.restful.getLastUpdateTime()
    .then(time => {
      this.lastImport = time;
      return this.restful.getUnshippedAmount();
    }).then(unship => {
      this.unshipped = unship;
      return this.restful.getShippedAmount();
    }).then(ship => {
      this.shipped = ship;
      return this.restful.getSuccessPaidAmount();
    }).then(success => {
      this.success = success;
      return this.restful.getFailedPaidAmount();
    }).then(failed => {
      this.failed = failed;
      return this.restful.getRecurringPaidAmount();
    }).then(recurring => {
      this.recurring = recurring;
    });
  }
}

HomeController.$inject = ['$state', '$stateParams', '$cookies', 'acl', '$http', '$scope', 'restful'];
