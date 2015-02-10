angular.module('starter.controllers', [])

    .controller('BaiduCtrl', function ($scope) {
        //获取地图控件
        $scope.$on("mapLoaded", function (event, data) {
            $scope.map = data;
        });
    })

    .controller('GoogleCtrl', function ($scope) {
        //获取地图控件
        $scope.$on("mapLoaded", function (event, data) {
            $scope.map = data;
        });
    })

    .controller('TiandituCtrl', function ($scope) {
        //获取地图控件
        $scope.$on("mapLoaded", function (event, data) {
            $scope.map = data;
        });
    })

    .controller('HybridCtrl', function ($scope) {
        //获取地图控件
        $scope.$on("mapLoaded", function (event, data) {
            $scope.map = data;
        });
    });
