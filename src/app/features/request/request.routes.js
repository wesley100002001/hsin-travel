routes.$inject = ['$stateProvider'];

export default function routes ($stateProvider) {
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
}
