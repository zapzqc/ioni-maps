// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ThsMapDirectives'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            .state('tab.baidu', {
                url: '/baidu',
                catch: false,
                views: {
                    'tab-baidu': {
                        templateUrl: 'templates/tab-baidu.html',
                        controller: 'BaiduCtrl'
                    }
                }
            })

            .state('tab.google', {
                url: '/google',
                catch: false,
                views: {
                    'tab-google': {
                        templateUrl: 'templates/tab-google.html',
                        controller: 'GoogleCtrl'
                    }
                }
            })

            .state('tab.tianditu', {
                url: '/tianditu',
                catch: false,
                views: {
                    'tab-tianditu': {
                        templateUrl: 'templates/tab-tianditu.html',
                        controller: 'TiandituCtrl'
                    }
                }
            })

            .state('tab.hybrid', {
                url: '/hybrid',
                catch: false,
                views: {
                    'tab-hybrid': {
                        templateUrl: 'templates/tab-hybrid.html',
                        controller: 'HybridCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/baidu');

    });
