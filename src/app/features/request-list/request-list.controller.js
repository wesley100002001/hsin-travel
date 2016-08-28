import moment from 'moment';
import * as RequestListActions from '../../actions/request-list'

export default class RequestListController {
  constructor ($state, $cookies, acl, $stateParams, restful, $ngRedux, $scope) {
    /*
    if (!acl.checkStatus($cookies.get('status'))) {
      $state.go('login');
    }*/
    this.$state = $state;

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), RequestListActions)(this);
    $scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      list: state.requestList,
    };
  }

  createRequest () {
    this.$state.go('request', {requestId: 0});
  }
}

RequestListController.$inject = ['$state', '$cookies', 'acl', '$stateParams', 'restful', '$ngRedux', '$scope'];
