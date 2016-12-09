export default class FrozenController {
  constructor ($state, $cookies, acl, restful, $scope, $uibModalInstance) {
    this.state = $state;
    this.cookies = $cookies;
    this.restful = restful;
    this.uibModal = $uibModalInstance;
    this.restful.getMockHotels()
    .then(hotels => {
      this.hotels = hotels;
    });
  }

  pickItem (id) {
    this.state.go('request.itemconfirm', { hotelId: id });
  }

  cancel () {
    this.uibModal.close();
  }
}

FrozenController.$inject = ['$state', '$cookies', 'acl', 'restful',
'$scope', '$uibModalInstance'];
