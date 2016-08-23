import { combineReducers } from 'redux';
import request from './app/reducers/index';
import requests from './app/reducers/index';

routes.$inject = ['$urlRouterProvider', '$locationProvider', '$ngReduxProvider'];

export default function routes($urlRouterProvider, $locationProvider, $ngReduxProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  let reducer = combineReducers({request, requests});
  $ngReduxProvider.createStoreWith(reducer, []);
}
