import './request.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import routing from './request.routes';
import services from './itemselect.services';
import FooterController from '../../../components/footer/footer.controller';
import RequestController from './request.controller';
import NavbarController from '../../../components/navbar/navbar.controller';
import acl from '../../services/acl.service';
import restful from '../../services/restful.service';

export default angular.module('app.request', [acl, uibootstrap, uirouter,
  restful])
  .config(routing)
  .provider('modalState', services)
  .controller('RequestController', RequestController)
  .controller('NavbarController', NavbarController)
  .controller('FooterController', FooterController)
  .name;
