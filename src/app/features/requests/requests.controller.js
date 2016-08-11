import moment from 'moment';
import * as RequestsActions from '../../actions/requests'

export default class RequestsController {
  constructor ($state, $cookies, acl, $stateParams, restful, $ngRedux, $scope) {
    /*
    if (!acl.checkStatus($cookies.get('status'))) {
      $state.go('login');
    }*/

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), RequestsActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.list = [];

  }

  mapStateToThis(state) {
    console.log(state);
    return {
      list: state.requests
    };
  }
}

RequestsController.$inject = ['$state', '$cookies', 'acl', '$stateParams', 'restful', '$ngRedux', '$scope'];
