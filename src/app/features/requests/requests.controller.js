import moment from 'moment';
import * as RequestsActions from '../../actions/requests';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, RequestsActions, RouterActions);
const PAGE_SIZE = 5;
const MAX_SIZE = 10;

export default class RequestsController {
  constructor ($stateParams, $ngRedux, $scope, $filter) {
    if (!localStorage.getItem('token')) {
      this.stateGo('login');
    }

    this.filter = $filter;
    this.pageSize = PAGE_SIZE;
    this.maxSize = MAX_SIZE;
    this.currentPage = 1;

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.checkScope('issueRequests');
    this.loadRequestsPage();
    // $scope.pageable = ActModel.activities.length > $scope.pageSize;
  }

  mapStateToThis (state) {
    console.log('requests');
    console.log(state);
    return {
      creatable: state.authority.issueRequests,
      requests: state.requests,
      currentRequests: this.filter('filter')(state.requests, this.searchText).slice((this.currentPage - 1) * this.pageSize),
      isLoggedIn: state.login.isLoggedIn,
      isLoading: state.isLoading
    };
  }

  changePage () {
    this.currentRequests = this.requests.slice((this.currentPage - 1) * this.pageSize);
  }

  search () {
    this.currentPage = 1;
    this.currentRequests = this.filter('filter')(this.requests, this.searchText).slice((this.currentPage - 1) * this.pageSize);
  }

  createRequest () {
    this.stateGo('request', { requestId: 0 });
  }
}

RequestsController.$inject = ['$stateParams', '$ngRedux', '$scope', '$filter'];
