routes.$inject = ['$stateProvider', 'modalStateProvider'];

export default function routes ($stateProvider, modalStateProvider) {
  $stateProvider.state('requestCreate', {
    url: '/request/0',
    views: {
      navbar: {
        template: require('../../../components/navbar/navbar.html'),
        controller: 'NavbarController',
        controllerAs: 'navbar'
      },
      content: {
        template: require('./request.html'),
        controller: 'RequestController',
        controllerAs: 'request'
      },
      footer: {
        template: require('../../../components/footer/footer.html'),
        controller: 'FooterController',
        controllerAs: 'footer'
      }
    }
  });
  $stateProvider.state('request', {
    url: '/request/:requestId',
    views: {
      navbar: {
        template: require('../../../components/navbar/navbar.html'),
        controller: 'NavbarController',
        controllerAs: 'navbar'
      },
      // content: {
      //   template: require('./request.html'),
      //   controller: 'RequestController',
      //   controllerAs: 'request'
      // },
      lowerContent: {
        template: require('../discuss/discuss.html'),
        controller: 'DiscussController',
        controllerAs: 'discuss'
      },
      footer: {
        template: require('../../../components/footer/footer.html'),
        controller: 'FooterController',
        controllerAs: 'footer'
      }
    }
  });
  modalStateProvider.state('requestCreate.acco-list', {
    url: '/acco-list',
    template: require('../accomodation-list/accomodation-list.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'PhantomController',
    controllerAs: 'accolist'
  });
  modalStateProvider.state('requestCreate.acco-edit', {
    url: '/acco-edit',
    template: require('../accomodation-edit/accomodation-edit.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'AlphaController',
    controllerAs: 'accoedit'
  });
  modalStateProvider.state('request.acco-list', {
    url: '/acco-list',
    template: require('../accomodation-list/accomodation-list.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'FrozenController',
    controllerAs: 'accolist'
  });
  modalStateProvider.state('request.acco-edit', {
    url: '/acco-edit/:hotelId/:accoId',
    template: require('../accomodation-edit/accomodation-edit.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'BetaController',
    controllerAs: 'accoedit'
  });
}
