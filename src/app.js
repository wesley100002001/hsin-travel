import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import bootstrap from 'bootstrap';
import uirouter from 'angular-ui-router';
import _firebase from 'firebase';
import firebase from 'angularfire';
import ngRedux from 'ng-redux';
import ngReduxUiRouter from 'redux-ui-router';
import 'angular-translate';

import login from './app/features/login';
import request from './app/features/request';
import requests from './app/features/requests';
import { routes } from './app.config';

angular.module('app', [firebase, uirouter, login, request, requests, ngRedux,
  ngReduxUiRouter, 'pascalprecht.translate'])
  .config(routes);
