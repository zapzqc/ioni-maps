angular.module('starter.controllers', [])

    .controller('BaiduCtrl', function ($scope, $ionicPopover) {
        //获取地图控件
        $scope.$on("mapLoaded", function (event, data) {
            $scope.map = data;
        });

        $scope.popover = $ionicPopover.fromTemplateUrl("baidu-popover.html", {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
            $scope.showLayer = function (index) {
                if (index === 0) {
                    $scope.map.getLayer($scope.map.layerIds[0]).show();
                    $scope.map.getLayer($scope.map.layerIds[1]).hide();
                    $scope.map.getLayer($scope.map.layerIds[2]).hide();
                }
                else {
                    $scope.map.getLayer($scope.map.layerIds[0]).hide();
                    $scope.map.getLayer($scope.map.layerIds[1]).show();
                    $scope.map.getLayer($scope.map.layerIds[2]).show();
                }
            };
        });

        $scope.baseMapToggle = function ($event) {
            $scope.popover.show($event);
        }
    })

    .controller('GoogleCtrl', function ($scope, $ionicPopover) {
//获取地图控件
        $scope.$on("mapLoaded", function (event, data) {
            $scope.map = data;
        });

        $scope.popover = $ionicPopover.fromTemplateUrl("google-popover.html", {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
            $scope.showLayer = function (index) {
                if (index === 0) {
                    $scope.map.getLayer($scope.map.layerIds[0]).show();
                    $scope.map.getLayer($scope.map.layerIds[1]).hide();
                    $scope.map.getLayer($scope.map.layerIds[2]).hide();
                    $scope.map.getLayer($scope.map.layerIds[3]).hide();
                }
                else if (index === 1) {
                    $scope.map.getLayer($scope.map.layerIds[0]).hide();
                    $scope.map.getLayer($scope.map.layerIds[1]).show();
                    $scope.map.getLayer($scope.map.layerIds[2]).hide();
                    $scope.map.getLayer($scope.map.layerIds[3]).hide();
                }
                else {
                    $scope.map.getLayer($scope.map.layerIds[0]).hide();
                    $scope.map.getLayer($scope.map.layerIds[1]).hide();
                    $scope.map.getLayer($scope.map.layerIds[2]).show();
                    $scope.map.getLayer($scope.map.layerIds[3]).show();
                }
            };
        });

        $scope.baseMapToggle = function ($event) {
            $scope.popover.show($event);
        }
    })

    .controller('TiandituCtrl', function ($scope, $ionicPopover) {
//获取地图控件
        $scope.$on("mapLoaded", function (event, data) {
            $scope.map = data;
        });

        $scope.popover = $ionicPopover.fromTemplateUrl("tianditu-popover.html", {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
            $scope.showLayer = function (index) {
                if (index === 0) {
                    $scope.map.getLayer($scope.map.layerIds[0]).show();
                    $scope.map.getLayer($scope.map.layerIds[1]).hide();
                    $scope.map.getLayer($scope.map.layerIds[2]).hide();
                }
                else {
                    $scope.map.getLayer($scope.map.layerIds[0]).hide();
                    $scope.map.getLayer($scope.map.layerIds[1]).show();
                    $scope.map.getLayer($scope.map.layerIds[2]).show();
                }
            };
        });

        $scope.baseMapToggle = function ($event) {
            $scope.popover.show($event);
        }
    })

    .controller('HybridCtrl', function ($scope, $ionicPopover) {
//获取地图控件
        $scope.$on("mapLoaded", function (event, data) {
            $scope.map = data;
        });

        $scope.popover = $ionicPopover.fromTemplateUrl("hybrid-popover.html", {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
            $scope.showLayer = function (index) {
                if (index === 0) {
                    $scope.map.getLayer($scope.map.layerIds[0]).show();
                    $scope.map.getLayer($scope.map.layerIds[1]).hide();
                }
                else {
                    $scope.map.getLayer($scope.map.layerIds[0]).hide();
                    $scope.map.getLayer($scope.map.layerIds[1]).show();
                }
            };
        });

        $scope.baseMapToggle = function ($event) {
            $scope.popover.show($event);
        }
    });
