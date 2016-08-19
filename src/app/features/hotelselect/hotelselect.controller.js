export default class HotelSelectController {
  constructor ($state, $cookies, acl, restful, $scope) {
    this.state = $state;
    this.cookies = $cookies;
    this.restful = restful;
    this.hotels = [
      { id: 1, name: 'Hotel 1', address: '台北市中山北路二段50號' },
      { id: 2, name: 'Hotel 2', address: '台北市中山北路二段50號' },
      { id: 3, name: 'Hotel 3', address: '台北市中山北路二段50號' }
    ];
  }
}

HotelSelectController.$inject = ['$state', '$cookies', 'acl', 'restful', '$scope'];
