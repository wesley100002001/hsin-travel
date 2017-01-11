import './request.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import routing from './request.routes';
import modal from '../../services/modal.service';
import AlphaController from '../accomodation-edit/alpha.controller';
import BetaController from '../accomodation-edit/beta.controller';
import DiscussController from '../discuss/discuss.controller';
import FooterController from '../../../components/footer/footer.controller';
import FrozenController from '../accomodation-list/frozen.controller';
import RequestController from './request.controller';
import NavbarController from '../../../components/navbar/navbar.controller';
import PhantomController from '../accomodation-list/phantom.controller';

export default angular.module('app.request', [uibootstrap, uirouter])
  .config(routing)
  .provider('modalState', modal)
  .controller('AlphaController', AlphaController)
  .controller('BetaController', BetaController)
  .controller('DiscussController', DiscussController)
  .controller('FooterController', FooterController)
  .controller('FrozenController', FrozenController)
  .controller('PhantomController', PhantomController)
  .controller('NavbarController', NavbarController)
  .controller('RequestController', RequestController)
  .name;
