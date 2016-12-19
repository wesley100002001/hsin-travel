import * as NavbarActions from '../../app/actions/navbar';

export default class NavbarController {
  constructor ($scope, $state, $cookies, acl, $translate, restful, $ngRedux) {
    this.$state = $state;
    this.cookies = $cookies;
    this.restful = restful;
    this.translate = $translate;
    this.isLoggedIn = acl.checkStatus(this.cookies.get('status'));

    if (!!this.cookies.get('id')) {
      this.userID = this.cookies.get('id');
    }

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), NavbarActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.fetchNotifications();
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      notifications: state.navbar,
    };
  }

  logout () {
    this.cookies.remove('status');
    this.$state.go('login');
  }

  changeLang (langKey) {
    this.translate.use(langKey);
  }
}

NavbarController.$inject = ['$scope', '$state', '$cookies', 'acl', '$translate',
'restful', '$ngRedux'];
