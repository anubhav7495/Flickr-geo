'use-strict';

angular
  .module('lbb', ['uiGmapgoogle-maps'])
  .config(appConfig);

appConfig.$inject = ['uiGmapGoogleMapApiProvider', '$qProvider'];

function appConfig(uiGmapGoogleMapApiProvider, $qProvider) {

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCEZmwIm--ubf46rOQ4BzpU-9PjvKC9TTA',
    libraries: 'weather,geometry.visualization'
  });

  $qProvider.errorOnUnhandledRejections(false);
}
