import appReducer from './app/reducers/index';
import promiseMiddleware from 'redux-promise-middleware';
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';

//!! Not Sure how to load these objects yet
import tw from './translations/tw.json';
import jp from './translations/jp.json'

routes.$inject = ['$urlRouterProvider', '$locationProvider',
  '$ngReduxProvider', '$translateProvider'];

export function routes($urlRouterProvider, $locationProvider,
  $ngReduxProvider, $translateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $translateProvider.translations('tw', tw);
  $translateProvider.translations('jp', jp);
  $translateProvider.preferredLanguage('tw');

  $ngReduxProvider.createStoreWith(appReducer, ['ngUiRouterMiddleware',
    thunk, promiseMiddleware()]);
}
