import * as NavbarActions from '../../app/actions/navbar';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, NavbarActions, RouterActions);

export default class NavbarController {
  constructor ($scope, $cookies, acl, $translate, restful, $ngRedux) {
    this.cookies = $cookies;
    this.restful = restful;
    this.translate = $translate;

    // if (!!this.cookies.get('id')) {
    //   this.userID = this.cookies.get('id');
    // }

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.fetchNotifications();
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      notifications: state.navbar,
      isLoggedIn: state.login.isLoggedIn,
      userID: state.login.username
    };
  }

  logout () {
    this.stateGo('login');
  }

  changeLang (langKey) {
    this.translate.use(langKey);
  }
}

NavbarController.$inject = ['$scope', '$cookies', 'acl', '$translate',
'restful', '$ngRedux'];
