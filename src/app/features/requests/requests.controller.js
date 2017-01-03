import moment from 'moment';
import * as RequestsActions from '../../actions/requests';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, RequestsActions, RouterActions);

export default class RequestsController {
  constructor ($cookies, acl, $stateParams, restful, $ngRedux, $scope) {
    if (!localStorage.getItem('token')) {
      this.stateGo('login');
    }

    this.restful = restful;

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

RequestsController.$inject = ['$cookies', 'acl', '$stateParams', 'restful',
'$ngRedux', '$scope'];
