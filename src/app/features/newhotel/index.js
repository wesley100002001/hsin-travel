import './newhotel.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import routing from './newhotel.routes';
import FooterController from '../../../components/footer/footer.controller';
import NewHotelController from './newhotel.controller';
import NavbarController from '../../../components/navbar/navbar.controller';

export default angular.module('app.newhotel', [uibootstrap, uirouter])
  .config(routing)
  .controller('NewHotelController', NewHotelController)
  .controller('NavbarController', NavbarController)
  .controller('FooterController', FooterController)
  .name;
