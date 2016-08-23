import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import _firebase from 'firebase';
import firebase from 'angularfire';
import ngRedux from 'ng-redux';
import 'angular-translate';

import home from './app/features/home';
import login from './app/features/login';
// import members from './app/features/members';
// import order from './app/features/order';
// import orderexport from './app/features/orderexport';
// import orderimport from './app/features/orderimport';
// import orders from './app/features/orders';
// import password from './app/features/password';
import request from './app/features/request';
import requests from './app/features/requests';
import routing from './app.config';

angular.module('app', [firebase, uirouter, ngCookies, home, login, request,
  requests, ngRedux, 'pascalprecht.translate'])
  .config(routing);
