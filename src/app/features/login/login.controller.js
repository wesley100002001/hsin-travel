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
      this.restful.getMockAdmin(this.username, this.password)
      .then(response => {
        if (response.status === 'loggedin') {
          cookies.put('status', response.status);
          cookies.put('id', response.id);
          cookies.put('isAdmin', response.isAdmin);
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
