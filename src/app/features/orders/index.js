import './orders.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import routing from './orders.routes';
import FooterController from '../../../components/footer/footer.controller';
import OrdersController from './orders.controller';
import NavbarController from '../../../components/navbar/navbar.controller';
import acl from '../../services/acl.service';
import restful from '../../services/restful.service';

export default angular.module('app.orders', [acl, uibootstrap, uirouter, restful])
  .config(routing)
  .controller('OrdersController', OrdersController)
  .controller('NavbarController', NavbarController)
  .controller('FooterController', FooterController)
  .name;
