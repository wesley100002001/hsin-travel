import * as LoginActions from '../../actions/login';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, LoginActions, RouterActions);

export default class LoginController {
  constructor (acl, $scope, $ngRedux) {
    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis (state) {
    console.log(state);
    return {};
  }

  verifyUser () {
    if (!!this.username && !!this.password) {
      this.login(this.username, this.password);
    } else {
      alert('請輸入帳號密碼');
    }
  }
}

LoginController.$inject = ['acl', '$scope', '$ngRedux'];
