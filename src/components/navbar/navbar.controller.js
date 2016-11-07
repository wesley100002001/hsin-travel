export default class NavbarController {
  constructor ($state, $cookies, acl) {
    this.state = $state;
    this.cookies = $cookies;
    this.isLoggedIn = acl.checkStatus(this.cookies.get('status'));

    if (!!this.cookies.get('id')) {
      this.userID = this.cookies.get('id');
    }
  }

  logout () {
    this.cookies.remove('status');
    this.state.go('login');
  }
}

NavbarController.$inject = ['$state', '$cookies', 'acl'];
