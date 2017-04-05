import moment from 'moment';
import * as HotelActions from '../../app/actions/hotel';

export default class HotelController {
  constructor ($scope, $ngRedux, $uibModalInstance, $stateParams) {
    this.uibModal = $uibModalInstance;
    this.hotelId = $stateParams.hotelId;
    this.requestId = $stateParams.requestId;
    this.accoId = $stateParams.accoId;

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this),
      HotelActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.isOneDay = false;
    this.isNew = this.accoId == 0;
    // Default 可以編輯 for new Acco；Defaut 不能編輯 for old Acco
    this.dateEditable = this.isNew ? null : false;

    this.startOpened = false;
    this.endOpened = false;
    this.timeOption = {
      minDate: new Date(this.timeframe.startsOn),
      maxDate: new Date(this.timeframe.endsOn)
    };

    // this.fetchRequest($stateParams.requestId);
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
    var accommodation = (!!state.tour_package.accommodations && state.tour_package.accommodations.length > 0) ? 
      state.tour_package.accommodations.find((element, index) => {
        return element.id == this.accoId;
      }) : null;
    
    var stateObj = {
      breakfast: state.hotel_info.breakfast,
      extraBed: state.hotel_info.extraBed,
      fareRef: state.hotel_info.fare,
      isLoading: state.isLoading,
      name: state.hotel_info.name,
      rooms: state.hotel_info.rooms,
      timeframe: state.timeframe,
    };
    if (!!accommodation) {
      stateObj.checkinAt = new Date(accommodation.checkinAt);
      stateObj.checkoutAt = new Date(accommodation.checkoutAt);
      stateObj.fares = accommodation.fares;
      stateObj.selectedRooms = accommodation.rooms.map(room => {
        return {
          roomId: room.id,
          numRooms: room.numRooms,
          type: room.room.type
        };
      });
    }
    return stateObj;
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
    if (!this.accommodation.roomId || !this.checkinAt || !this.checkoutAt) {
      alert('資料輸入不完全');
      return;
    }
    var duration = moment(this.checkoutAt).diff(moment(this.checkinAt), 'days');
    var timeFrame = [];
    for (var i = 0; i <= duration; i++) {
      timeFrame.push(moment(this.checkinAt).add(i, 'days').format('YYYY-MM-DD'));
    }
    this.fetchFare(this.accommodation.roomId, timeFrame);
  }

  changeDate (scope) {
    scope.hotelForm.$setValidity('date', !moment(this.checkinAt).isAfter(this.checkoutAt));
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
      amount: this.fareInput.amount,
      multiplier: this.fareInput.multiplier
    });
    this.fareInputVisible = false;
    delete this.fareInput;
  }

  // FIXME: should pass fareId rather than index
  removeFare (index) {
    this.fares.splice(index, 1);
    var accoObj = {
      fares: this.fares
    };
    this.updateAccommodation(this.requestId, this.accoId, accoObj);
  }

  removeFareByIndex (index) {
    this.fares.splice(index, 1);
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
    if (this.accoId == 0) {
      var roomObj = Object.assign({}, this.roomInput.room, {
        numRooms: this.roomInput.numRooms
      });
      this.selectedRooms.push(roomObj);
    } else {
      var roomObj = {
        numRooms: this.roomInput.numRooms,
        roomId: this.roomInput.room.id
      };
      this.createAccommodationRoom(this.requestId, this.accoId, roomObj);
    }
    this.roomInputVisible = false;
    delete this.roomInput;
  }

  removeRoom (roomId) {
    this.removeAccommodationRoom(this.requestId, this.accoId, roomId);
  }

  removeRoomByIndex (index) {
    this.selectedRooms.splice(index, 1);
  }

  onEditDate () {
    this.dateEditable = true;
  }

  offEditDate () {
    this.dateEditable = false;
  }

  submitDate () {
    var reqObj = {
      checkinAt: moment(this.checkinAt).format('YYYY-MM-DD'),
      checkoutAt: moment(this.checkoutAt).format('YYYY-MM-DD')
    };
    this.updateAccommodation(this.requestId, this.accoId, reqObj);
    this.dateEditable = false;
  }

  confirm () {
    if (!this.checkinAt || !this.checkoutAt || this.fares.length < 0) {
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
      checkinAt: moment(this.checkinAt).format('YYYY-MM-DD'),
      checkoutAt: moment(this.checkoutAt).format('YYYY-MM-DD'),
      rooms: [],
      fares: []
    };
    reqObj.rooms = this.selectedRooms.map(room => {
      return {
        roomId: room.id,
        numRooms: room.numRooms,
        type: room.type
      };
    });
    reqObj.fares = this.fares.map(fare => {
      return {
        amount: fare.amount,
        multiplier: fare.multiplier
      };
    });
    reqObj.hotelName = this.name;
    return reqObj;
  }

  sanitizeAcco () {
    // Request is created
    var reqObj = {
      checkinAt: moment(this.checkinAt).format('YYYY-MM-DD'),
      checkoutAt: moment(this.checkoutAt).format('YYYY-MM-DD'),
      rooms: [],
      fares: []
    };
    reqObj.rooms = this.selectedRooms.map(room => {
      return {
        roomId: room.id,
        numRooms: room.numRooms
      };
    });
    reqObj.fares = this.fares.map(fare => {
      return {
        amount: fare.amount,
        multiplier: fare.multiplier
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
