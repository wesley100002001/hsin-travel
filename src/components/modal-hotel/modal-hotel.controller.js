import ambassador from '../../assets/imgs/ambassador.jpg';
import moment from 'moment';
import * as HotelActions from '../../app/actions/hotel';

export default class HotelController {
  constructor ($scope, $ngRedux, $uibModalInstance, $stateParams) {
    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this),
      HotelActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.uibModal = $uibModalInstance;
    this.hotelId = $stateParams.hotelId;
    this.requestId = $stateParams.requestId;

    this.cover = ambassador;
    this.isOneDay = false;

    this.startOpened = false;
    this.endOpened = false;
    this.dateOpened = false;
    this.timeOption = {
      max: moment().subtract(1, 'days').format()
    };

    this.fetchHotel($stateParams.hotelId);
    if (!this.accoId === 0) {
      this.fetchAccommodation($stateParams.accoId);
    }
  }

  mapStateToThis(state) {
    console.log(state);
    return {
      accommodation: state.new_accommodation,
      address: state.hotel_info.address,
      phone: state.hotel_info.phone,
      isNewAccommodation: state.request.isNewAccommodation
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
    if (this.isNewAccommodation) {
      if (!this.accommodation.roomTitle || !this.accommodation.date || !this.accommodation.quantity) {
        alert('資料輸入不完全');
        return;
      }
      this.accommodation.date = moment(this.accommodation.date).format('YYYY-MM-DD');
      this.accommodation.hotelName = '國賓大飯店';
      this.createAccommodation(this.accommodation);
      this.clearAccommodation();
      this.uibModal.close();
    } else {
      // this.submitAccommodation(this.accommodation, this.requestId);
    }
  }

  cancel () {
    this.uibModal.close();
  }
}

HotelController.$inject = ['$scope', '$ngRedux', '$uibModalInstance',
'$stateParams'];
