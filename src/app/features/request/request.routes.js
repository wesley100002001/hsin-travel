routes.$inject = ['$stateProvider', 'modalStateProvider'];

export default function routes ($stateProvider, modalStateProvider) {
  $stateProvider.state('request', {
    url: '/request/:requestId',
    views: {
      navbar: {
        template: require('../../../components/navbar/navbar.html'),
        controller: 'NavbarController',
        controllerAs: 'navbarCtrl'
      },
      content: {
        template: require('./request.html'),
        controller: 'RequestController',
        controllerAs: 'requestCtrl'
      },
      footer: {
        template: require('../../../components/footer/footer.html'),
        controller: 'FooterController',
        controllerAs: 'footerCtrl'
      }
    }
  });
  modalStateProvider.state('request.hotels', {
    url: '/hotels',
    template: require('../../../components/modal-hotels/modal-hotels.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'HotelsController',
    controllerAs: 'hotelsCtrl'
  });
  modalStateProvider.state('request.hotel', {
    url: '/hotel/:hotelId/:accoId',
    template: require('../../../components/modal-hotel/modal-hotel.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'HotelController',
    controllerAs: 'hotelCtrl'
  });
}
