import moment from 'moment';
import * as RequestsActions from '../../actions/requests';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, RequestsActions, RouterActions);

export default class RequestsController {
  constructor ($cookies, acl, $stateParams, $ngRedux, $scope) {
    if (!localStorage.getItem('token')) {
      this.stateGo('login');
    }

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.fetchRequests();
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      list: state.requests,
      isLoggedIn: state.login.isLoggedIn
    };
  }
}

RequestsController.$inject = ['$cookies', 'acl', '$stateParams', '$ngRedux',
'$scope'];
