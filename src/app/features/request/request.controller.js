import moment from 'moment';
import * as RequestActions from '../../actions/request';

export default class RequestController {
  constructor ($state, $cookies, acl, $stateParams, restful, $ngRedux, $scope) {
    this.restful = restful;
    this.$state = $state;
    /*
    if (!acl.checkStatus($cookies.get('status'))) {
      $state.go('login');
    }*/

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), RequestActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.items = [];
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      items: state.request
    };
  }

  confirm () {
    if (this.items.length < 1) {
      alert('尚未新增任何項目');
    } else {
      this.addRequest({});
      this.$state.go('requests');
    }
  }

  cancel () {
    this.$state.go('requests');
  }
}

RequestController.$inject = ['$state', '$cookies', 'acl', '$stateParams', 'restful', '$ngRedux', '$scope'];
