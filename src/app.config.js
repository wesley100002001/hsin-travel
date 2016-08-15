import { combineReducers } from 'redux';
import { router } from 'redux-ui-router';
import requests from './app/reducers/index';

routes.$inject = ['$urlRouterProvider', '$locationProvider', '$ngReduxProvider'];

export default function routes($urlRouterProvider, $locationProvider, $ngReduxProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  let reducer = combineReducers({requests, router});
  $ngReduxProvider.createStoreWith(reducer, []);
}
