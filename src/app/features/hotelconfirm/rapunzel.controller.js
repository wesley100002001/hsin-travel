import ambassador from '../../../assets/imgs/ambassador.jpg';
import moment from 'moment';
import * as RequestActions from '../../actions/request';

export default class RapunzelController {
  constructor ($cookies, acl, $ngRedux, $scope, $uibModalInstance) {
    this.cookies = $cookies;

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this),
      RequestActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.uibModal = $uibModalInstance;

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

  dateOpen ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dateOpened = !this.dateOpened;
  };

  confirm () {
    this.addItem({roomId: 1});
    this.uibModal.close();
  }

  cancel () {
    this.uibModal.close();
  }
}

RapunzelController.$inject = ['$cookies', 'acl', '$ngRedux', '$scope',
'$uibModalInstance'];
