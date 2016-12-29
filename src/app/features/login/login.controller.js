import * as RouterActions from 'redux-ui-router';

export default class LoginController {
  constructor ($cookies, acl, restful, $scope, $ngRedux) {
    this.cookies = $cookies;
    this.restful = restful;

    if (acl.checkStatus(this.cookies.get('status'))) {
      this.stateGo('home');
    }

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), RouterActions)(this);
    $scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis (state) {
    console.log(state);
    return {};
  }

  verifyUser () {
    this.logging = true;
    var cookies = this.cookies;
    // this.restful.getAdmin(this.username, this.password)
    if (!!this.username && !!this.password) {
      this.restful.getMockAdmin(this.username, this.password)
      .then(response => {
        if (response.status === 'loggedin') {
          cookies.put('status', response.status);
          cookies.put('id', response.id);
          cookies.put('isAdmin', response.isAdmin);
          this.stateGo('requests');
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

LoginController.$inject = ['$cookies', 'acl', 'restful', '$scope', '$ngRedux'];
