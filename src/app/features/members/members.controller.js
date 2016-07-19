export default class MembersController {
  constructor ($state, $cookies, acl, $http, restful, $filter, $scope) {
    var scope = this;
    this.$scope = $scope;
    this.state = $state;
    this.cookies = $cookies;
    this.restful = restful;

    if (!acl.checkStatus(this.cookies.get('status'))) {
      this.state.go('login');
    }

    this.columnOrder = ['sponsor_name', 'sponsor_email', 'receiver_phone',
    'nation', 'city', 'postcode', 'receiver_name', 'receiver_email', 'address'];

    this.columnHead = ['贊助者姓名', '贊助者email', '收件者電話', '所在國家',
    '居住城市', '郵遞區號', '收件者姓名', '收件者email', '收件者地址'];

    var list = [];
    this.restful.getOrders()
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

  exportMembers () {
    return this.restful.getOrders()
    .then(orders => {
      var memberCsv = orders.map(function (order) {
        return {
          sponsor_name: order.sponsor_name,
          sponsor_email: order.sponsor_email,
          receiver_phone: order.receiver_phone,
          nation: order.nation,
          city: order.city,
          postcode: order.postcode,
          receiver_name: order.receiver_name,
          receiver_email: order.receiver_email,
          address: order.address
        };
      });
      return memberCsv;
    })
  }
}

MembersController.$inject = ['$state', '$cookies', 'acl', '$http', 'restful', '$filter', '$scope'];
