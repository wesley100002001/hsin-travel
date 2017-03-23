import * as NavbarActions from '../../app/actions/navbar';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, NavbarActions, RouterActions);

export default class NavbarController {
  constructor ($scope, $translate, $ngRedux) {
    this.translate = $translate;
    // TODO: maybe should use redux-persist to handle these
    this.isLoggedIn = localStorage.getItem('token');
    this.userID = localStorage.getItem('username');

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis (state) {
    return {
      notifications: state.navbar
    };
  }

  logout () {
    // TODO: maybe should use redux-persist to handle these
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('region');
    localStorage.removeItem('scope');
    this.stateGo('login');
  }

  changeLang (langKey) {
    this.translate.use(langKey);
  }
}

NavbarController.$inject = ['$scope', '$translate', '$ngRedux'];
