import * as ItemSelectActions from '../../actions/itemselect';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, ItemSelectActions, RouterActions);

export default class FrozenController {
  constructor ($cookies, acl, restful, $scope, $uibModalInstance,
    $ngRedux) {
    this.cookies = $cookies;
    this.restful = restful;
    this.uibModal = $uibModalInstance;

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.fetchHotels();
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      hotels: state.itemselect,
    };
  }

  pickItem (id) {
    this.stateGo('request.itemconfirm', { hotelId: id });
  }

  cancel () {
    this.uibModal.close();
  }
}

FrozenController.$inject = ['$cookies', 'acl', 'restful', '$scope',
'$uibModalInstance', '$ngRedux'];
