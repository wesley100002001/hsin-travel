routes.$inject = ['$stateProvider'];

export default function routes ($stateProvider) {
  $stateProvider.state('orderexport', {
      url: '/orderexport/',
      views: {
        navbar: {
          template: require('../../../components/navbar/navbar.html'),
          controller: 'NavbarController',
          controllerAs: 'navbar'
        },
        content: {
          template: require('./orderexport.html'),
          controller: 'OrderExportController',
          controllerAs: 'orderexport'
        },
        footer: {
          template: require('../../../components/footer/footer.html'),
          controller: 'FooterController',
          controllerAs: 'footer'
        }
      }
    });
}
