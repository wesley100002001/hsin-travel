import ambassador from '../../../assets/imgs/ambassador.jpg';
import moment from 'moment';
import * as RequestActions from '../../actions/request';

export default class HotelConfirmController {
  constructor ($state, $cookies, acl, restful, $scope, $uibModalInstance,
    $ngRedux) {
    this.state = $state;
    this.cookies = $cookies;
    this.restful = restful;

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this),
      RequestActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.uibModal = $uibModalInstance;

    this.cover = ambassador;
    this.address = '台北市中山北路二段50號';
    this.phone = '02-2918-9403';

    this.startOpened = false;
    this.endOpened = false;
    this.timeOption = {
      max: moment().subtract(1, 'days').format()
    };
    this.list = [];
  }

  mapStateToThis(state) {
    console.log(state);
    return {
      list: state.requests
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

  confirm () {
    this.addItem({roomId: 1});
    this.uibModal.close();
  }
}

HotelConfirmController.$inject = ['$state', '$cookies', 'acl', 'restful',
  '$scope', '$uibModalInstance', '$ngRedux'];
