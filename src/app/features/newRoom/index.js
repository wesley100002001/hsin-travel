import './newroom.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import routing from './newroom.routes';
import FooterController from '../../../components/footer/footer.controller';
import NewRoomController from './newroom.controller';
import NavbarController from '../../../components/navbar/navbar.controller';

export default angular.module('app.newroom', [uibootstrap, uirouter])
  .config(routing)
  .controller('NewRoomController', NewRoomController)
  .controller('NavbarController', NavbarController)
  .controller('FooterController', FooterController)
  .name;
