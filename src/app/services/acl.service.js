import angular from 'angular';

class ACL {
  constructor () {}

  checkStatus (status) {
    return status === 'loggedin';
  }
}

export default angular.module('services.acl', [])
  .service('acl', ACL)
  .name;
