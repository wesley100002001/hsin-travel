export default function services ($stateProvider) {
  var provider = this;

  this.$get = function () {
    return provider;
  }

  this.state = function (stateName, options) {
    var modalInstance;
    $stateProvider.state(stateName, {
      url: options.url,
      onEnter: function($uibModal, $state) {
        modalInstance = $uibModal.open(options);
        modalInstance.result.then(function () {
          modalInstance = null;
          if ($state.$current.name === stateName) {
              $state.go('^');
          }
        });
      },
      onExit: function() {
        if (modalInstance) {
          modalInstance.close();
        }
      }
    });
  };
}

services.$inject = ['$stateProvider'];
