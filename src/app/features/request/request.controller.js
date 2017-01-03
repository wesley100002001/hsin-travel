import moment from 'moment';
import * as RequestActions from '../../actions/request';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, RequestActions, RouterActions);

export default class RequestController {
  constructor ($cookies, acl, $stateParams, restful, $ngRedux, $scope) {
    this.restful = restful;

    if (!localStorage.getItem('token')) {
      this.stateGo('login');
    }

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.startOpened = false;
    this.endOpened = false;
    this.timeOption = {
      max: moment().subtract(1, 'days').format()
    };

    this.items = [];
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      items: state.request
    };
  }

  startOpen ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.startOpened = !this.startOpened;
  };

  endOpen ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.endOpened = !this.endOpened;
  };

  confirm () {
    if (this.items.length < 1) {
      alert('尚未新增任何項目');
    } else {
      this.addRequest({});
      this.stateGo('requests');
    }
  }
}

RequestController.$inject = ['$cookies', 'acl', '$stateParams', 'restful',
'$ngRedux', '$scope'];
