export default class HotelSelectController {
  constructor ($state, $cookies, acl, restful, $scope) {
    this.state = $state;
    this.cookies = $cookies;
    this.restful = restful;
    this.hotels = [
      { name: 'Hotel 1', address: 'None' },
      { name: 'Hotel 2', address: 'None' },
      { name: 'Hotel 3', address: 'None' }
    ];
  }
}

HotelSelectController.$inject = ['$state', '$cookies', 'acl', 'restful', '$scope'];
