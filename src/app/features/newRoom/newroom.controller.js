import moment from 'moment';
import * as NewRoomActions from '../../actions/newroom';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, NewRoomActions, RouterActions);

export default class NewRoomController {
  constructor ($stateParams, $ngRedux, $scope) {
    if (!localStorage.getItem('token')) {
      this.stateGo('login');
    }

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.fetchHotels();
    this.roomTypes = ['SWB (Room Only)', 'TWN (Room Only)', 'DBL', 'TWN'];
    this.clearStatus();
  }

  mapStateToThis (state) {
    console.log('newroom');
    console.log(state);
    return {
      hotelrooms: state.newroom.hotelrooms,
      hotels: state.newroom.hotels,
      submitStatus: state.newroom.status
    };
  }

  selectHotel () {
    this.fetchHotelRooms(this.selectedHotel.id);
    this.clearStatus();
  }

  submitNewRoom () {
    if (!this.roomToCreate) {
      alert('請先選擇要新增的房型');
      return;
    }
    var reqObj = {
      type: this.roomToCreate
    };
    this.submitHotelRoom(this.selectedHotel.id, reqObj);
    delete this.selectedHotel;
    delete this.roomToCreate;
  }
}

NewRoomController.$inject = ['$stateParams', '$ngRedux', '$scope'];