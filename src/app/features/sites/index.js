import './sites.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './sites.routes';
import FooterController from '../../../components/footer/footer.controller';
import SitesController from './sites.controller';
import NavbarController from '../../../components/navbar/navbar.controller';
import restful from '../../services/restful.service';

export default angular.module('app.sites', [uirouter, restful])
  .config(routing)
  .controller('SitesController', SitesController)
  .controller('NavbarController', NavbarController)
  .controller('FooterController', FooterController)
  .name;
