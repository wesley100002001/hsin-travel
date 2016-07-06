import './home.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import routing from './home.routes';
import FooterController from '../../../components/footer/footer.controller';
import HomeController from './home.controller';
import NavbarController from '../../../components/navbar/navbar.controller';
import acl from '../../services/acl.service';
import restful from '../../services/restful.service';

export default angular.module('app.home', [acl, uibootstrap, uirouter, restful])
  .config(routing)
  .controller('HomeController', HomeController)
  .controller('NavbarController', NavbarController)
  .controller('FooterController', FooterController)
  .name;
