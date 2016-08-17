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
  modalStateProvider.state('request.itemselect', {
    url: '/itemselect',
    template: require('./itemselect.html'),
    size: 'lg',
    controller: 'HotelSelectController',
    controllerAs: 'hotelselect'
  });
}
