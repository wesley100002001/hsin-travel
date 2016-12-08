export default class NavbarController {
  constructor ($state, $cookies, acl, $translate, restful) {
    this.state = $state;
    this.cookies = $cookies;
    this.restful = restful;
    this.translate = $translate;
    this.isLoggedIn = acl.checkStatus(this.cookies.get('status'));

    if (!!this.cookies.get('id')) {
      this.userID = this.cookies.get('id');
    }

    this.restful.getMockNotification()
    .then(res => {
      this.notification = res;
    });
  }

  logout () {
    this.cookies.remove('status');
    this.state.go('login');
  }

  changeLang (langKey) {
    this.translate.use(langKey);
  }
}

NavbarController.$inject = ['$state', '$cookies', 'acl', '$translate', 'restful'];
