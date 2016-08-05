export default class PwdController {
  constructor ($state, $cookies, acl, $http, restful, $q) {
    var scope = this;
    scope.state = $state;
    scope.cookies = $cookies;
    this.restful = restful;
    this.$q = $q;

    if (!acl.checkStatus(this.cookies.get('status'))) {
      this.state.go('login');
    }
  }

  changePwd () {
    if (!!this.oldpwd && !!this.newpwd) {
      this.restful.getAdminPwd()
      .then(response => {
        if (response === this.oldpwd) {
          return this.restful.setAdminPwd(this.newpwd)
        } else {
          alert('舊密碼錯誤，請重新輸入');
          return this.$q(function (resolve, reject) {
            resolve('Error');
          });
        }
      }).then(response => {
        if (response !== 'Error') {
          alert('新密碼設定完成');
        }
      });
    } else {
      alert('舊密碼及新密碼不可為空白');
    }
  }
}

PwdController.$inject = ['$state', '$cookies', 'acl', '$http', 'restful', '$q'];
