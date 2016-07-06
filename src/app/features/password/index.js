import './password.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import routing from './password.routes';
import FooterController from '../../../components/footer/footer.controller';
import PwdController from './password.controller';
import NavbarController from '../../../components/navbar/navbar.controller';
import acl from '../../services/acl.service';
import restful from '../../services/restful.service';

export default angular.module('app.password', [acl, uibootstrap, uirouter, restful])
  .config(routing)
  .controller('PwdController', PwdController)
  .controller('NavbarController', NavbarController)
  .controller('FooterController', FooterController)
  .name;
