import ambassador from '../../../assets/imgs/ambassador.jpg';
import moment from 'moment';
import * as ItemConfirmActions from '../../actions/itemconfirm';

export default class BetaController {
  constructor ($ngRedux, $scope, $uibModalInstance, $stateParams) {
    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this),
      ItemConfirmActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.uibModal = $uibModalInstance;
    this.requestId = $stateParams.requestId;
    this.hotelId = $stateParams.hotelId;

    this.cover = ambassador;
    this.isOneDay = true;

    this.startOpened = false;
    this.endOpened = false;
    this.dateOpened = false;
    this.timeOption = {
      max: moment().subtract(1, 'days').format()
    };

    this.fetchAccomodation($stateParams.accoId);
    this.fetchHotel($stateParams.hotelId);
  }

  mapStateToThis(state) {
    console.log(state);
    return {
      accomodation: state.accomodation,
      address: state.accoEdit_Hotel.address,
      phone: state.accoEdit_Hotel.phone
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

  dateOpen ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dateOpened = !this.dateOpened;
  };

  confirm () {
    this.submitAccomodation(this.accomodation, this.requestId);
    this.uibModal.close();
  }

  cancel () {
    this.uibModal.close();
  }
}

BetaController.$inject = ['$ngRedux', '$scope', '$uibModalInstance', '$stateParams'];
