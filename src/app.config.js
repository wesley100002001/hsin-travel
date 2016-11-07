import appReducer from './app/reducers/index';
//!! Not Sure how to load these objects yet
import tw from './translations/tw.json';
import jp from './translations/jp.json'

routes.$inject = ['$urlRouterProvider', '$locationProvider', '$ngReduxProvider', '$translateProvider'];

export default function routes($urlRouterProvider, $locationProvider, $ngReduxProvider, $translateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $translateProvider.translations('tw', tw)
  .preferredLanguage('tw');

  $ngReduxProvider.createStoreWith(appReducer, []);
}
