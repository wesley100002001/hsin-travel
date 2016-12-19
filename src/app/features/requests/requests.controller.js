import moment from 'moment';
import * as RequestsActions from '../../actions/requests'

export default class RequestsController {
  constructor ($state, $cookies, acl, $stateParams, restful, $ngRedux, $scope) {

    if (!acl.checkStatus($cookies.get('status'))) {
      $state.go('login');
    }
    this.$state = $state;
    this.restful = restful;

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), RequestsActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.fetchRequests();
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      list: state.requests,
    };
  }

  createRequest () {
    this.$state.go('requestCreate', {requestId: 0});
  }
}

RequestsController.$inject = ['$state', '$cookies', 'acl', '$stateParams', 'restful', '$ngRedux', '$scope'];
