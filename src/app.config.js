import { combineReducers } from 'redux';
import {requests} from './app/reducers/index';

routes.$inject = ['$urlRouterProvider', '$locationProvider', '$ngReduxProvider'];

export default function routes($urlRouterProvider, $locationProvider, $ngReduxProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  let reducer = combineReducers({requests});
  //$ngReduxProvider.createStoreWith(reducer, []);
}
