import * as ItemSelectActions from '../../actions/itemselect';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, ItemSelectActions, RouterActions);

export default class HotelSelectController {
  constructor (acl, $scope, $uibModalInstance, $ngRedux) {
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
    this.stateGo('requestCreate.acco-edit', { hotelId: id });
  }

  cancel () {
    this.uibModal.close();
  }
}

HotelSelectController.$inject = ['acl', '$scope', '$uibModalInstance', '$ngRedux'];
