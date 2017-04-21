routes.$inject = ['$stateProvider'];

export default function routes ($stateProvider) {
  $stateProvider.state('newroom', {
    url: '/newroom/',
    views: {
      navbar: {
        template: require('../../../components/navbar/navbar.html'),
        controller: 'NavbarController',
        controllerAs: 'navbarCtrl'
      },
      content: {
        template: require('./newroom.html'),
        controller: 'NewRoomController',
        controllerAs: 'newroomCtrl'
      },
      footer: {
        template: require('../../../components/footer/footer.html'),
        controller: 'FooterController',
        controllerAs: 'footerCtrl'
      }
    }
  });
}
