import moment from 'moment';

export default class OrdersController {
  constructor ($state, $cookies, acl, $http, restful, $filter, $scope, $q,
    $rootScope) {
    var scope = this;
    this.restful = restful;
    this.state = $state;
    this.cookies = $cookies;
    this.rs = $rootScope;
    this.searchObj = {};

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
        $filter('filter')(scope.list, scope.searchObj)
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
      // $ means apply for all property
      if (!!scope.list && newVal.length > 0) {
        scope.searchObj = {
          $: newVal
        };
        createCurPage();
      }
    });

    this.rs.$on('filterShipStatus', function (event, request) {
      scope.searchText = '';
      scope.searchObj = !!scope.searchObj.ship_status &&
        scope.searchObj.ship_status === request ? {} : { ship_status: request };
      createCurPage();
    });

    this.rs.$on('filterStatus', function (event, request) {
      scope.searchText = '';
      scope.searchObj = !!scope.searchObj.status &&
        scope.searchObj.status === request ? {} : { status: request };
      createCurPage();
    });
  }

  showUnshippedOrders () {
    this.rs.$broadcast('filterShipStatus', 'notyet');
  }

  showShippedOrders () {
    this.rs.$broadcast('filterShipStatus', 'shipped');
  }

  showSuccessOrders () {
    this.rs.$broadcast('filterStatus', 'success');
  }

  showPendingOrders () {
    this.rs.$broadcast('filterStatus', 'pending');
  }

  showFailedOrders () {
    this.rs.$broadcast('filterStatus', 'failed');
  }
}

OrdersController.$inject = ['$state', '$cookies', 'acl', '$http', 'restful',
'$filter', '$scope', '$q', '$rootScope'];
