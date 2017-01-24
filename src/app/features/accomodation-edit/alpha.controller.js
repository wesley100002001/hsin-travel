import ambassador from '../../../assets/imgs/ambassador.jpg';
import moment from 'moment';
import * as ItemConfirmActions from '../../actions/itemconfirm';

export default class AlphaController {
  constructor ($scope, $ngRedux, $uibModalInstance, $stateParams) {
    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this),
      ItemConfirmActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.uibModal = $uibModalInstance;
    this.hotelId = $stateParams.hotelId;

    this.cover = ambassador;
    this.isOneDay = false;

    this.startOpened = false;
    this.endOpened = false;
    this.dateOpened = false;
    this.timeOption = {
      max: moment().subtract(1, 'days').format()
    };

    this.fetchHotel($stateParams.hotelId);
  }

  mapStateToThis(state) {
    console.log(state);
    return {
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
    this.addItem({roomId: 1});
    this.uibModal.close();
  }

  cancel () {
    this.uibModal.close();
  }
}

AlphaController.$inject = ['$scope', '$ngRedux', '$uibModalInstance', '$stateParams'];
