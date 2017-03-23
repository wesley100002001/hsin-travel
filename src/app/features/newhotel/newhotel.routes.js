routes.$inject = ['$stateProvider'];

export default function routes ($stateProvider) {
  $stateProvider.state('newhotel', {
      url: '/newhotel/',
      views: {
        navbar: {
          template: require('../../../components/navbar/navbar.html'),
          controller: 'NavbarController',
          controllerAs: 'navbarCtrl'
        },
        content: {
          template: require('./newhotel.html'),
          controller: 'NewHotelController',
          controllerAs: 'newhotelCtrl'
        },
        footer: {
          template: require('../../../components/footer/footer.html'),
          controller: 'FooterController',
          controllerAs: 'footerCtrl'
        }
      }
    });
}
