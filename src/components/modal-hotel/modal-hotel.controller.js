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
    this.timeOption = {
      max: moment().subtract(1, 'days').format()
    };

    this.fetchHotel($stateParams.hotelId);
    this.fetchHotelRooms($stateParams.hotelId);
    if (!this.accoId === 0) {
      this.fetchAccommodation($stateParams.accoId);
    }

    this.accommodation = {};
  }

  mapStateToThis(state) {
    console.log('modal-hotel');
    console.log(state);
    return {
      breakfast: state.hotel_info.breakfast,
      extraBed: state.hotel_info.extraBed,
      fare: state.hotel_info.fare,
      name: state.hotel_info.name,
      rooms: state.hotel_info.rooms
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

  checkPrice () {
    if (!this.accommodation.roomId || !this.accommodation.checkinAt || !this.accommodation.checkoutAt) {
      alert('資料輸入不完全');
      return;
    }
    var duration = moment(this.accommodation.checkoutAt).diff(moment(this.accommodation.checkinAt), 'days');
    var timeFrame = [];
    for (var i = 0; i <= duration; i++) {
      timeFrame.push(moment(this.accommodation.checkinAt).add(i, 'days').format('YYYY-MM-DD'));
    }
    this.fetchFare(this.accommodation.roomId, timeFrame);
  }

  confirm () {
    if (!this.accommodation.roomId || !this.accommodation.checkinAt || !this.accommodation.checkoutAt || !this.accommodation.quantity) {
      alert('資料輸入不完全');
      return;
    }
    this.accommodation.checkinAt = moment(this.accommodation.checkinAt).format('YYYY-MM-DD');
    this.accommodation.checkoutAt = moment(this.accommodation.checkoutAt).format('YYYY-MM-DD');
    if (this.requestId === '0') {
      this.accommodation.roomType = this.rooms.find(room => {
        return room.roomId = this.accommodation.roomId;
      }).type;
      this.accommodation.hotelName = this.name;
      this.createAccommodation(this.accommodation);
      this.clearAccommodation();
    } else {
      // A dirty hack for now
      this.accommodation.room = {
        hotel: {
          name: this.name
        },
        type: this.rooms.find(room => {
          return room.roomId = this.accommodation.roomId;
        }).type
      };
      this.submitAccommodation(this.requestId, this.accommodation);
    }
    this.uibModal.close();
  }

  cancel () {
    this.uibModal.close();
  }
}

HotelController.$inject = ['$scope', '$ngRedux', '$uibModalInstance',
'$stateParams'];
