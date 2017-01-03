import login from './index';
import ngRedux from 'ng-redux';

describe('Controller: Login', function () {
  let $controller;

  beforeEach(angular.mock.module(login, ngRedux));

  beforeEach(angular.mock.inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  it('mock username is admin', function () {
    let ctrl = $controller('LoginController');
    expect(ctrl.user.username).toBe('admin');
  });
});
