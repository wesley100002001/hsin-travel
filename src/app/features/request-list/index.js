import './request-list.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import routing from './request-list.routes';
import FooterController from '../../../components/footer/footer.controller';
import RequestListController from './request-list.controller';
import NavbarController from '../../../components/navbar/navbar.controller';
import acl from '../../services/acl.service';
import restful from '../../services/restful.service';

export default angular.module('app.orderexport', [acl, uibootstrap, uirouter,
  restful])
  .config(routing)
  .controller('RequestListController', RequestListController)
  .controller('NavbarController', NavbarController)
  .controller('FooterController', FooterController)
  .name;
