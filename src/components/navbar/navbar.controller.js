export default class NavbarController {
  constructor ($state, $cookies, acl, $translate) {
    this.state = $state;
    this.cookies = $cookies;
    this.translate = $translate;
    this.isLoggedIn = acl.checkStatus(this.cookies.get('status'));

    if (!!this.cookies.get('id')) {
      this.userID = this.cookies.get('id');
    }
  }

  logout () {
    this.cookies.remove('status');
    this.state.go('login');
  }

  changeLang (langKey) {
    this.translate.use(langKey);
  }
}

NavbarController.$inject = ['$state', '$cookies', 'acl', '$translate'];
