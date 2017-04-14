import moment from 'moment';
import * as NewHotelActions from '../../actions/newhotel';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, NewHotelActions, RouterActions);

export default class NewHotelController {
  constructor ($stateParams, $ngRedux, $scope) {
    if (!localStorage.getItem('token')) {
      this.stateGo('login');
    }

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.clearStatus();
    this.extrabed = [];
    this.breakfast = [];
  }

  mapStateToThis (state) {
    console.log('newhotel');
    console.log(state);
    return {
      submitStatus: state.newhotelstatus
    };
  }

  showExtrabedInput () {
    this.extrabedInputVisible = true;
    this.extrabedInput = {};
  }

  submitExtrabed () {
    this.extrabed.push({
      type: this.extrabedInput.type,
      label: this.extrabedInput.label,
      price: this.extrabedInput.price,
      note: this.extrabedInput.note
    });
    this.extrabedInputVisible = false;
    delete this.extrabedInput;
  }

  cancelAddExtrabed () {
    this.extrabedInputVisible = false;
    delete this.extrabedInput;
  }

  showBreakfastInput () {
    this.breakfastInputVisible = true;
    this.breakfastInput = {};
  }

  submitBreakfast () {
    this.breakfast.push({
      type: this.breakfastInput.type,
      label: this.breakfastInput.label,
      price: this.breakfastInput.price,
      note: this.breakfastInput.note
    });
    this.breakfastInputVisible = false;
    delete this.breakfastInput;
  }

  cancelAddBreakfast () {
    this.breakfastInputVisible = false;
    delete this.extrabedInput;
  }

  confirm () {
    var reqObj = {
      name: this.name,
      extraBed: this.extrabed,
      breakfast: this.breakfast
    };
    this.submitHotel(reqObj);
  }
}

NewHotelController.$inject = ['$stateParams', '$ngRedux', '$scope'];