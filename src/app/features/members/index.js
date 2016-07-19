import './members.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';
import ngSanitize from 'angular-sanitize';
import ngCsv from 'ng-csv';

import routing from './members.routes';
import FooterController from '../../../components/footer/footer.controller';
import MembersController from './members.controller';
import NavbarController from '../../../components/navbar/navbar.controller';
import acl from '../../services/acl.service';
import restful from '../../services/restful.service';

export default angular.module('app.members', [acl, uibootstrap, uirouter,
  restful, ngSanitize, ngCsv])
  .config(routing)
  .controller('MembersController', MembersController)
  .controller('NavbarController', NavbarController)
  .controller('FooterController', FooterController)
  .name;
