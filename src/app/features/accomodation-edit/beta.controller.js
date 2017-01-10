import ambassador from '../../../assets/imgs/ambassador.jpg';
import moment from 'moment';
import * as RequestActions from '../../actions/request';
import * as ItemConfirmActions from '../../actions/itemconfirm';

const combinedActions = Object.assign({}, RequestActions, ItemConfirmActions);

export default class BetaController {
  constructor (acl, $ngRedux, $scope, $uibModalInstance, $stateParams) {
    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this),
      combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.uibModal = $uibModalInstance;
    this.requestId = $stateParams.requestId;
    this.cover = ambassador;
    this.address = '台北市中山北路二段50號';
    this.phone = '02-2918-9403';
    this.isOneDay = true;

    this.startOpened = false;
    this.endOpened = false;
    this.dateOpened = false;
    this.timeOption = {
      max: moment().subtract(1, 'days').format()
    };

    this.fetchAccomodation($stateParams.accoId);
    // this.fetchHotel($stateParams.hotelId);
  }

  mapStateToThis(state) {
    console.log(state);
    return {
      accomodation: state.accomodation
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

BetaController.$inject = ['acl', '$ngRedux', '$scope', '$uibModalInstance', '$stateParams'];
