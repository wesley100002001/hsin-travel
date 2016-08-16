export default class NavbarController {
  constructor ($state, $cookies, acl) {
    this.state = $state;
    this.cookies = $cookies;
    this.isLoggedIn = /*!!this.cookies.get('status')*/true;
  }

  logout () {
    this.cookies.remove('status');
    this.state.go('login');
  }
}

NavbarController.$inject = ['$state', '$cookies', 'acl'];
