export default class HomeController {
  constructor ($state, $stateParams, $cookies, acl, $http, $scope) {
    var scope = this;

    if (!acl.checkStatus($cookies.get('status'))) {
      $state.go('login');
    }

    // Datepicker options
    scope.startOpened = false;
    scope.endOpened = false;
    scope.timeOption = {
        max: new Date()
    };
    scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    scope.altInputFormats = ['M!/d!/yyyy'];

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
  }

  startOpen () {
    this.startOpened = !this.startOpened;
  }

  endOpen () {
    this.endOpened = !this.endOpened;
  }
}

HomeController.$inject = ['$state', '$stateParams', '$cookies', 'acl', '$http', '$scope'];
