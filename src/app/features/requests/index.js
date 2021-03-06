import './requests.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import routing from './requests.routes';
import FooterController from '../../../components/footer/footer.controller';
import RequestsController from './requests.controller';
import NavbarController from '../../../components/navbar/navbar.controller';

export default angular.module('app.requests', [uibootstrap, uirouter])
  .config(routing)
  .controller('RequestsController', RequestsController)
  .controller('NavbarController', NavbarController)
  .controller('FooterController', FooterController)
  .name;
