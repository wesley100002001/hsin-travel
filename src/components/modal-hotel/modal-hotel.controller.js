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
      minDate: new Date(this.timeframe.startsOn),
      maxDate: new Date(this.timeframe.endsOn)
    };

    this.fetchHotel($stateParams.hotelId);
    this.fetchHotelRooms($stateParams.hotelId);
    if (!this.accoId === 0) {
      this.fetchAccommodation($stateParams.accoId);
    }

    this.fares = [];
    this.selectedRooms = [];
  }

  mapStateToThis(state) {
    console.log('modal-hotel');
    console.log(state);
    return {
      breakfast: state.hotel_info.breakfast,
      extraBed: state.hotel_info.extraBed,
      fareRef: state.hotel_info.fare,
      isLoading: state.isLoading,
      name: state.hotel_info.name,
      rooms: state.hotel_info.rooms,
      timeframe: state.timeframe
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

  changeDate (scope) {
    scope.hotelForm.$setValidity('date', !moment(this.accommodation.checkinAt).isAfter(this.accommodation.checkoutAt));
  }

  showFareInput () {
    this.fareInputVisible = true;
    this.fareInput = {};
  }

  cancelAddFare () {
    this.fareInputVisible = false;
    delete this.fareInput;
  }

  submitFare () {
    this.fares.push({
      price: this.fareInput.price,
      amount: this.fareInput.amount
    });
    this.fareInputVisible = false;
    delete this.fareInput;
  }

  showRoomInput () {
    this.roomInputVisible = true;
    this.roomInput = {};
  }

  cancelAddRoom () {
    this.roomInputVisible = false;
    delete this.roomInput;
  }

  submitRoom () {
    var roomObj = Object.assign({}, this.roomInput.room, {
      amount: this.roomInput.amount
    });
    this.selectedRooms.push(roomObj);
    this.roomInputVisible = false;
    delete this.roomInput;
  }

  confirm () {
    if (!this.accommodation.checkinAt || !this.accommodation.checkoutAt || this.fares.length < 0) {
      alert('資料輸入不完全');
      return;
    }
    if (this.requestId === '0') {
      this.createAccommodation(this.sanitizeTempAcco());
      this.clearAccommodation();
    } else {
      this.submitAccommodation(this.requestId, this.sanitizeAcco());
    }
    
    this.uibModal.close();
  }

  sanitizeTempAcco () { 
    // Request is not yet created
    var reqObj = {
      checkinAt: moment(this.accommodation.checkinAt).format('YYYY-MM-DD'),
      checkoutAt: moment(this.accommodation.checkoutAt).format('YYYY-MM-DD'),
      rooms: [],
      fares: []
    };
    reqObj.rooms = this.selectedRooms.map(room => {
      return {
        roomId: room.id,
        numRooms: room.amount,
        type: room.type
      };
    });
    reqObj.fares = this.fares.map(fare => {
      return {
        amount: fare.price,
        multiplier: fare.amount
      };
    });
    reqObj.hotelName = this.name;
    return reqObj;
  }

  sanitizeAcco () {
    // Request is created
    var reqObj = {
      checkinAt: moment(this.accommodation.checkinAt).format('YYYY-MM-DD'),
      checkoutAt: moment(this.accommodation.checkoutAt).format('YYYY-MM-DD'),
      rooms: [],
      fares: []
    };
    reqObj.rooms = this.selectedRooms.map(room => {
      return {
        roomId: room.id,
        numRooms: room.amount
      };
    });
    reqObj.fares = this.fares.map(fare => {
      return {
        amount: fare.price,
        multiplier: fare.amount
      };
    });
    return reqObj;
  }

  cancel () {
    this.uibModal.close();
  }
}

HotelController.$inject = ['$scope', '$ngRedux', '$uibModalInstance',
'$stateParams'];
