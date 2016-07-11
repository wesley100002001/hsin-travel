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
    });
  }
}

HomeController.$inject = ['$state', '$stateParams', '$cookies', 'acl', '$http', '$scope', 'restful'];
