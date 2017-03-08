import * as HotelsActions from '../../app/actions/hotels';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, HotelsActions, RouterActions);

export default class HotelsController {
  constructor ($scope, $uibModalInstance, $ngRedux) {
    this.uibModal = $uibModalInstance;
    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.fetchHotels();
  }

  mapStateToThis (state) {
    return {
      hotels: state.hotels
    };
  }

  pickItem (id) {
    this.stateGo('request.hotel', { hotelId: id, accoId: 0 });
  }

  cancel () {
    this.uibModal.close();
  }
}

HotelsController.$inject = ['$scope', '$uibModalInstance', '$ngRedux'];
