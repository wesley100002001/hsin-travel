import moment from 'moment';

export default class OrderExportController {
  constructor ($state, $cookies, acl, $http, restful) {
    var scope = this;
    scope.state = $state;
    scope.cookies = $cookies;

    this.startOpened = false;
    this.endOpened = false;
    this.timeOption = {
      max: moment().subtract(1, 'days').format()
    };

    if (!acl.checkStatus(this.cookies.get('status'))) {
      this.state.go('login');
    }
  }

  startOpen ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.startOpened = !this.startOpened;
  };

  endOpen ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.endOpened = !this.endOpened;
  };
}

OrderExportController.$inject = ['$state', '$cookies', 'acl', '$http', 'restful'];
