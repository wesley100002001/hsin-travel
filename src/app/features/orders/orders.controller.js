import moment from 'moment';

export default class OrdersController {
  constructor ($state, $cookies, acl, $http, restful, $filter, $scope, $q) {
    var scope = this;
    this.restful = restful;
    this.state = $state;
    this.cookies = $cookies;

    if (!acl.checkStatus(this.cookies.get('status'))) {
      this.state.go('login');
    }

    this.restful.getOrders()
    .then(orders => {
      this.list = orders;
      createCurPage();
    });

    this.pageSize = 10;
    this.maxSize = 10;
    this.currentPage = 1;
    var createCurPage = function () {
      scope.currentOrderList =
        $filter('filter')(scope.list, scope.searchText)
        .slice((scope.currentPage - 1) * scope.pageSize);
    };

    $scope.$watch(angular.bind(this, function () {
      return this.currentPage;
    }), function (newVal) {
      if (!!scope.list) {
        createCurPage();
      }
    });

    $scope.$watch(angular.bind(this, function () {
      return this.searchText;
    }), function (newVal) {
      if (!!scope.list) {
        createCurPage();
      }
    });
  }
}

OrdersController.$inject = ['$state', '$cookies', 'acl', '$http', 'restful', '$filter', '$scope', '$q'];
