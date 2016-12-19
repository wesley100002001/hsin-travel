import * as ItemSelectActions from '../../actions/itemselect';

export default class HotelSelectController {
  constructor ($state, $cookies, acl, restful, $scope, $uibModalInstance,
    $ngRedux) {
    this.state = $state;
    this.cookies = $cookies;
    this.restful = restful;
    this.uibModal = $uibModalInstance;

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), ItemSelectActions)(this);
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
    this.state.go('requestCreate.itemconfirm', { hotelId: id });
  }

  cancel () {
    this.uibModal.close();
  }
}

HotelSelectController.$inject = ['$state', '$cookies', 'acl', 'restful',
'$scope', '$uibModalInstance', '$ngRedux'];
