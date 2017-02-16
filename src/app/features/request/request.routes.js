routes.$inject = ['$stateProvider', 'modalStateProvider'];

export default function routes ($stateProvider, modalStateProvider) {
  $stateProvider.state('request', {
    url: '/request/:requestId',
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
  modalStateProvider.state('requestCreate.accomodations', {
    url: '/accomodations',
    template: require('../accomodations/accomodations.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'PhantomController',
    controllerAs: 'accolist'
  });
  modalStateProvider.state('requestCreate.accomodation', {
    url: '/accomodation/:hotelId',
    template: require('../accomodation/accomodation.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'AlphaController',
    controllerAs: 'accoedit'
  });
  modalStateProvider.state('request.accomodations', {
    url: '/accomodations',
    template: require('../accomodations/accomodations.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'FrozenController',
    controllerAs: 'accolist'
  });
  modalStateProvider.state('request.accomodation', {
    url: '/accomodation/:hotelId/:accoId',
    template: require('../accomodation/accomodation.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'BetaController',
    controllerAs: 'accoedit'
  });
}
