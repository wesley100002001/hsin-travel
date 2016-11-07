export default class LoginController {
  constructor ($state, $cookies, acl, restful, $scope) {
    this.state = $state;
    this.cookies = $cookies;
    this.restful = restful;

    if (acl.checkStatus(this.cookies.get('status'))) {
      this.state.go('home');
    }
  }

  verifyUser () {
    this.logging = true;
    var cookies = this.cookies;
    var state = this.state;
    // this.restful.getAdmin(this.username, this.password)
    if (!!this.username && !!this.password) {
      this.restful.getMockAdmin()
      .then(passed => {
        if (passed) {
          cookies.put('status', 'loggedin');
          cookies.put('id', this.username);
          state.go('requests');
        } else {
          this.logging = false;
          this.isLoginFail = true;
        }
      });
    } else {
      alert('請輸入帳號密碼');
    }
  }
}

LoginController.$inject = ['$state', '$cookies', 'acl', 'restful', '$scope'];
