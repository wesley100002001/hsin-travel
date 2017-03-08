import loading from '../../../assets/imgs/loadingAnimation.gif';
import * as LoginActions from '../../actions/login';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, LoginActions, RouterActions);

export default class LoginController {
  constructor ($scope, $ngRedux) {
    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    if (!!localStorage.getItem('token') && !!localStorage.getItem('username')) {
      this.stateGo('requests');
    }

    this.loading = loading;
  }

  mapStateToThis (state) {
    // console.log('login');
    // console.log(state);
    return {
      logging: state.login.isLogging,
      failed: state.login.failed
    };
  }

  verifyUser () {
    if (!!this.username && !!this.password) {
      this.login(this.username, this.password);
    } else {
      alert('請輸入帳號密碼');
    }
  }
}

LoginController.$inject = ['$scope', '$ngRedux'];
