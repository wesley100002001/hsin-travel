export default class HotelSelectController {
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

  cancel () {
    this.uibModal.close();
  }
}

HotelSelectController.$inject = ['$state', '$cookies', 'acl', 'restful', '$scope', '$uibModalInstance'];
