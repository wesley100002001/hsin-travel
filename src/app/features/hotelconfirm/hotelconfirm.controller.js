import ambassador from '../../../assets/imgs/ambassador.jpg';
import moment from 'moment';

export default class HotelConfirmController {
  constructor ($state, $cookies, acl, restful, $scope) {
    this.state = $state;
    this.cookies = $cookies;
    this.restful = restful;

    this.cover = ambassador;
    this.address = '台北市中山北路二段50號';
    this.phone = '02-2918-9403';

    this.startOpened = false;
    this.endOpened = false;
    this.timeOption = {
      max: moment().subtract(1, 'days').format()
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
}

HotelConfirmController.$inject = ['$state', '$cookies', 'acl', 'restful', '$scope'];
