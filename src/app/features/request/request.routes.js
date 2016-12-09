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
  modalStateProvider.state('requestCreate.itemselect', {
    url: '/itemselect',
    template: require('./itemselect.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'HotelSelectController',
    controllerAs: 'hotelselect'
  });
  modalStateProvider.state('requestCreate.itemconfirm', {
    url: '/itemconfirm',
    template: require('./itemconfirm.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'HotelConfirmController',
    controllerAs: 'hotelconfirm'
  });
  modalStateProvider.state('request.itemselect', {
    url: '/itemselect',
    template: require('./itemselect.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'FrozenController',
    controllerAs: 'hotelselect'
  });
  modalStateProvider.state('request.itemconfirm', {
    url: '/itemconfirm',
    template: require('./itemconfirm.html'),
    size: 'lg',
    backdrop: 'static',
    controller: 'HotelConfirmController',
    controllerAs: 'hotelconfirm'
  });
}
