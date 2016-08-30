export default class DiscussController {
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

DiscussController.$inject = ['$state', '$cookies', 'acl', 'restful', '$scope'];
