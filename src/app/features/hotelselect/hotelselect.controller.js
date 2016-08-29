export default class HotelSelectController {
  constructor ($state, $cookies, acl, restful, $scope) {
    this.state = $state;
    this.cookies = $cookies;
    this.restful = restful;
    this.restful.getMockHotels()
    .then(hotels => {
      this.hotels = hotels;
    });
  }
}

HotelSelectController.$inject = ['$state', '$cookies', 'acl', 'restful', '$scope'];
