export default class OrdersController {
  constructor ($state, $cookies, acl, $http, restful, $filter, $scope, $q) {
    var scope = this;
    scope.restful = restful;
    scope.state = $state;
    scope.cookies = $cookies;

    if (!acl.checkStatus(this.cookies.get('status'))) {
      this.state.go('login');
    }

    var list = [];
    scope.restful.getOrders()
    .then(orders => {
      angular.forEach(orders, function (value, key) {
        list.push(value);
      });
      scope.list = list;
      createCurPage();
    });

    scope.pageSize = 10;
    scope.maxSize = 10;
    scope.currentPage = 1;
    var createCurPage = function () {
      scope.currentMemberList =
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
