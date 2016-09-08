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
          template: require('./request-list.html'),
          controller: 'RequestListController',
          controllerAs: 'requestList'
        },
        footer: {
          template: require('../../../components/footer/footer.html'),
          controller: 'FooterController',
          controllerAs: 'footer'
        }
      }
    });
}
