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
      accomodation: state.new_accomodation,
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
    if (!this.accomodation.roomTitle || !this.accomodation.startTime ||
      !this.accomodation.endTime || !this.accomodation.quantity) {
      alert('資料輸入不完全');
      return;
    }
    this.accomodation.startTime = moment(this.accomodation.startTime).format('YYYY-MM-DD');
    this.accomodation.endTime = moment(this.accomodation.endTime).format('YYYY-MM-DD');
    this.accomodation.hotel = '國賓大飯店';
    this.createAccomodation(this.accomodation);
    this.uibModal.close();
  }

  cancel () {
    this.uibModal.close();
  }
}

AlphaController.$inject = ['$scope', '$ngRedux', '$uibModalInstance',
'$stateParams'];
