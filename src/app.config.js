import appReducer from './app/reducers/index';
//!! Not Sure how to load these objects yet
import en from './translations/en';
import jp from './translations/jp'

routes.$inject = ['$urlRouterProvider', '$locationProvider', '$ngReduxProvider', '$translateProvider'];

export default function routes($urlRouterProvider, $locationProvider, $ngReduxProvider, $translateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  var tw = {
    Login: '登入',
    Home: '首頁',
    Requests: '需求列表'
  };

  $translateProvider.translations('tw', tw)
  .preferredLanguage('tw');

  $ngReduxProvider.createStoreWith(appReducer, []);
}
