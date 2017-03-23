import moment from 'moment';
import * as NewHotelActions from '../../actions/requests';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, NewHotelActions, RouterActions);

export default class NewHotelController {
  constructor ($stateParams, $ngRedux, $scope) {
    if (!localStorage.getItem('token')) {
      this.stateGo('login');
    }

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.extrabed = [];
    this.breakfast = [];
    // this.checkScope('issueRequests');
    // this.loadRequestsPage();
  }

  mapStateToThis (state) {
    console.log('newhotel');
    console.log(state);
    return {
      // creatable: state.authority.issueRequests,
      // requests: state.requests,
      // currentRequests: this.filter('filter')(state.requests, this.searchText).slice((this.currentPage - 1) * this.pageSize),
      // isLoggedIn: state.login.isLoggedIn,
      // isLoading: state.isLoading
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

  submitBreakfast ($event) {
    $event.preventDefault();
    $event.stopPropagation();
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
    this.extrabedInputVisible = false;
    delete this.extrabedInput;
  }
}

NewHotelController.$inject = ['$stateParams', '$ngRedux', '$scope'];