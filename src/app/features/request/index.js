import './request.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import routing from './request.routes';
import modal from '../../services/modal.service';
import FooterController from '../../../components/footer/footer.controller';
import HotelController from '../../../components/modal-hotel/modal-hotel.controller';
import HotelsController from '../../../components/modal-hotels/modal-hotels.controller';
import RequestController from './request.controller';
import NavbarController from '../../../components/navbar/navbar.controller';

export default angular.module('app.request', [uibootstrap, uirouter])
  .config(routing)
  .provider('modalState', modal)
  .controller('FooterController', FooterController)
  .controller('HotelController', HotelController)
  .controller('HotelsController', HotelsController)
  .controller('NavbarController', NavbarController)
  .controller('RequestController', RequestController)
  .name;
