import moment from 'moment';
import * as RequestsActions from '../../actions/requests';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, RequestsActions, RouterActions);

export default class RequestsController {
  constructor ($stateParams, $ngRedux, $scope) {
    if (!localStorage.getItem('token')) {
      this.stateGo('login');
    }

    this.userID = localStorage.getItem('username');
    this.editable = this.userID === 'usert';

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.fetchRequests();
  }

  mapStateToThis (state) {
    console.log('requests');
    console.log(state);
    return {
      requests: state.requests,
      isLoggedIn: state.login.isLoggedIn
    };
  }

  createRequest () {
    this.stateGo('request', { requestId: 0 });
  }
}

RequestsController.$inject = ['$stateParams', '$ngRedux', '$scope'];
