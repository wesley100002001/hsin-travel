import './request.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import routing from './request.routes';
import modal from '../../services/modal.service';
import DiscussController from '../discuss/discuss.controller';
import FooterController from '../../../components/footer/footer.controller';
import FrozenController from '../hotelselect/frozen.controller';
import RequestController from './request.controller';
import NavbarController from '../../../components/navbar/navbar.controller';
import HotelSelectController from '../hotelselect/hotelselect.controller';
import HotelConfirmController from '../hotelconfirm/hotelconfirm.controller';
import acl from '../../services/acl.service';
import restful from '../../services/restful.service';

export default angular.module('app.request', [acl, uibootstrap, uirouter,
  restful])
  .config(routing)
  .provider('modalState', modal)
  .controller('RequestController', RequestController)
  .controller('NavbarController', NavbarController)
  .controller('FooterController', FooterController)
  .controller('FrozenController', FrozenController)
  .controller('HotelSelectController', HotelSelectController)
  .controller('HotelConfirmController', HotelConfirmController)
  .controller('DiscussController', DiscussController)
  .name;
