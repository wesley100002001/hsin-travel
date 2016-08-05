export default class HomeController {
  constructor ($state, $stateParams, $cookies, acl, $http, $scope, restful) {
    var scope = this;
    this.restful = restful;
    if (!acl.checkStatus($cookies.get('status'))) {
      $state.go('login');
    }

    $http({
      method: 'GET',
      url: 'http://localhost:5000/dashboard/api/v1/activities/' + $stateParams.actId
    }).then(function (response) {
      scope.info = response.data.activity;
      scope.info.start_time = new Date(scope.info.start_time);
      scope.info.end_time = new Date(scope.info.end_time);
      if (!!scope.info.other) {
        $scope.infoForm.other.$setDirty();
      }
      if (!!scope.info.url) {
        $scope.infoForm.url.$setDirty();
      }
    }, function (response) {});

    this.restful.getLastUpdateTime()
    .then(time => {
      this.lastImport = time;
    });
  }
}

HomeController.$inject = ['$state', '$stateParams', '$cookies', 'acl', '$http', '$scope', 'restful'];
