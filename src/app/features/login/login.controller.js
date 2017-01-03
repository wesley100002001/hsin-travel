import * as LoginActions from '../../actions/login';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, LoginActions, RouterActions);

export default class LoginController {
  constructor ($cookies, acl, restful, $scope, $ngRedux) {
    this.cookies = $cookies;

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis (state) {
    console.log(state);
    return {};
  }

  verifyUser () {
    this.logging = true;
    var cookies = this.cookies;
    if (!!this.username && !!this.password) {
      this.login(this.username, this.password);
    } else {
      alert('請輸入帳號密碼');
    }
  }
}

LoginController.$inject = ['$cookies', 'acl', 'restful', '$scope', '$ngRedux'];
