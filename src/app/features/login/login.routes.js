routes.$inject = ['$stateProvider'];

export default function routes ($stateProvider) {
  $stateProvider.state('login', {
      url: '/',
      // reference:
      // http://stackoverflow.com/questions/29576063/how-to-attach-navbar-only-on-certain-pages-using-ui-router
      views: {
        navbar: {
          template: require('../../../components/navbar/navbar.html'),
          controller: 'NavbarController',
          controllerAs: 'navbarCtrl'
        },
        content: {
          template: require('./login.html'),
          controller: 'LoginController',
          controllerAs: 'loginCtrl'
        },
        footer: {
          template: require('../../../components/footer/footer.html'),
          controller: 'FooterController',
          controllerAs: 'footerCtrl'
        }
      }
    });
}
