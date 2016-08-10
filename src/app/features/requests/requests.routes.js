routes.$inject = ['$stateProvider'];

export default function routes ($stateProvider) {
  $stateProvider.state('requests', {
      url: '/requests/',
      views: {
        navbar: {
          template: require('../../../components/navbar/navbar.html'),
          controller: 'NavbarController',
          controllerAs: 'navbar'
        },
        content: {
          template: require('./requests.html'),
          controller: 'RequestsController',
          controllerAs: 'requests'
        },
        footer: {
          template: require('../../../components/footer/footer.html'),
          controller: 'FooterController',
          controllerAs: 'footer'
        }
      }
    });
}
