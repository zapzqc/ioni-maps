/**
 * Created by xubo on 2015/1/13.
 * mapView基类指令
 */
angular.module('ThsMapDirectives', ['ionic'])
    .directive("thsMapView", function ($document, $q, $http) {
        return {
            restrict: "E",
            replace: true,
            template: '<div style="height: 100%;width: 100%;"><div/><div/></div>',
            scope: true,
            controller: function ($scope, $element, $attrs) {
                $scope.map = null;
                $scope.buttonTag = null;
                $scope.mapOptions = null;

                /**
                 * 地图增加功能按钮
                 * @param img 按钮图片url
                 * @param clickFunction 点击事件的function方法
                 * @returns {*} 元素按妞
                 */
                $scope.addButtonForImg = function (img, clickFunction) {
                    var divButton = $document[0].createElement('div');
                    divButton.style.backgroundImage = "url(" + img + ")";
                    divButton.className = "mapButton home";
                    $scope.addEventListener(divButton, "click", clickFunction);
                    var index = $scope.buttonTag.childElementCount;
                    $scope.buttonTag.insertBefore(divButton, $scope.buttonTag.childNodes[index]);
                    return divButton;
                };

                /**
                 * 元素增加事件
                 * @param element 元素
                 * @param event 事件
                 * @param eventFunction 事件方法
                 */
                $scope.addEventListener = function (element, event, eventFunction) {
                    if (window.addEventListener) {
                        element.addEventListener(event, eventFunction, false);
                    }
                    else {
                        element.attachEvent("on" + event, eventFunction);
                    }
                };

                /**-------------------------地图图层操作相关的方法---------------------------------------*/

                /**
                 *  初始化基础按钮
                 * @param postion 按钮位置, top-left, top-right, bottom-left, bottom-right
                 * @param orientation 排列方向,vertical和horizontal
                 */
                $scope.initBaseButtonTag = function (postion, orientation) {
                    var left = "20px";
                    var top = "20px";
                    var right = "20px";
                    var buttomLeft = "40px";
                    var buttomRight = "45px";
                    var buttonTag = $document[0].createElement('div');
                    if (postion === "top-left") {
                        if (orientation === "vertical") {
                            buttonTag.style.top = "100px";
                            buttonTag.style.left = left;
                            buttonTag.className = "mapOrientationVertical HomeButton";
                        } else {
                            buttonTag.style.top = top;
                            buttonTag.style.left = "100px";
                            buttonTag.className = "mapOrientationHorizontal HomeButton";
                        }
                    } else if (postion === "top-right") {
                        if (orientation === "vertical") {
                            buttonTag.style.top = "100px";
                            buttonTag.style.right = right;
                            buttonTag.className = "mapOrientationVertical HomeButton";
                        } else {
                            buttonTag.style.top = top;
                            buttonTag.style.right = "100px";
                            buttonTag.className = "mapOrientationHorizontal HomeButton";
                        }
                    } else if (postion === "bottom-left") {
                        if (orientation === "vertical") {
                            buttonTag.style.bottom = "120px";
                            buttonTag.style.left = left;
                            buttonTag.className = "mapOrientationVertical HomeButton";
                        } else {
                            buttonTag.style.bottom = buttomLeft;
                            buttonTag.style.left = "100px";
                            buttonTag.className = "mapOrientationHorizontal HomeButton";
                        }
                    } else if (postion === "bottom-right") {
                        if (orientation === "vertical") {
                            buttonTag.style.bottom = "125px";
                            buttonTag.style.right = right;
                            buttonTag.className = "mapOrientationVertical HomeButton";
                        } else {
                            buttonTag.style.bottom = buttomRight;
                            buttonTag.style.right = "100px";
                            buttonTag.className = "mapOrientationHorizontal HomeButton";
                        }
                    }
                    $scope.buttonTag = buttonTag;
                    if ($scope.mapOptions.initialExtent != undefined && $scope.mapOptions.initialExtent != null) {
                        $scope.addButtonForImg("img/map_home.png", function () {
                            $scope.map.setExtent(new esri.geometry.Extent($scope.mapOptions.initialExtent.xmin, $scope.mapOptions.initialExtent.ymin, $scope.mapOptions.initialExtent.xmax, $scope.mapOptions.initialExtent.ymax));
                        });
                    }
                    $scope.addButtonForImg("img/map_location.png", null);
                    $element[0].appendChild(buttonTag);
                };

                /**
                 * 初始化地图控件
                 * @param mapOptions 地图参数
                 */
                $scope.initialMap = function (mapOptions) {
                    $scope.map = new esri.Map($element[0], {
                        wrapAround180: mapOptions.wrapAround180 === undefined ? false : mapOptions.wrapAround180,
                        logo: false,
                        fadeOnZoom: false,
                        displayGraphicsOnPan: !dojo.isIE,
                        sliderPosition: (mapOptions.sliderposition === undefined || mapOptions.sliderposition.trim() === "") ? "top-left" : mapOptions.sliderposition,
                        sliderOrientation: (mapOptions.sliderorientation === undefined || mapOptions.sliderposition.trim() === "") ? "vertical" : mapOptions.sliderorientation
                    });
                    if ($scope.mapOptions.initialExtent != undefined && $scope.mapOptions.initialExtent != null) {
                        $scope.map.setExtent(new esri.geometry.Extent(mapOptions.initialExtent.xmin, mapOptions.initialExtent.ymin, mapOptions.initialExtent.xmax, mapOptions.initialExtent.ymax));
                    }
                    $scope.$emit("mapLoaded", $scope.map);//地图控件初始化完毕
                };

                /**
                 * 添加图层
                 * @param layerOptions 图层参数
                 * label：图层ID，type：图层类型（dynamic、tiled、image、feature，baidumap、baidusatellitemap、baidulabelmap
                 * tiandimap、tiandisatellitemap、tiandilabelmap、googlemap、googlesatellitemap、googleterrainmap）
                 * visible：是否可见 opacity：不透明度（0全透明，1不透明）
                 */
                $scope.addLayer = function (layerOptions) {
                    var layer;
                    if (layerOptions.type.toLocaleLowerCase().trim() === "baidumap") {
                        layer = new ths.layers.BaiduMapLayer("streets");//创建百度地图
                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "baidusatellitemap") //创建百度卫星图层
                    {
                        layer = new ths.layers.BaiduMapLayer("satellite");
                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "baidulabelmap") {
                        layer = new ths.layers.BaiduMapLayer("label");
                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "tiandimap") {
                        layer = new ths.layers.TiandiMapLayer("streets");
                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "tiandisatellitemap") {
                        layer = new ths.layers.TiandiMapLayer("satellite");
                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "tiandilabelmap") {
                        layer = new ths.layers.TiandiMapLayer("label");
                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "googlemap") {
                        layer = new ths.layers.GoogleMapLayer("streets");
                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "googlesatellitemap") {
                        layer = new ths.layers.GoogleMapLayer("satellite");
                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "googlelabelmap") {
                        layer = new ths.layers.GoogleMapLayer("label");
                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "googleterrainmap") {
                        layer = new ths.layers.GoogleMapLayer("terrain");
                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "feature") {
                        layer = new esri.layers.FeatureLayer(layerOptions.url);
                        if (layerOptions.extension !== undefined) {
                            if (layerOptions.extension.outfields !== undefined && layerOptions.extension.outfields.length !== 0) {
                                layer.outFields = layerOptions.extension.outfields;
                            }
                            if (layerOptions.extension.wherestring !== undefined && layerOptions.extension.wherestring.trim() !== "") {
                                layer.definitionExpression = layerOptions.extension.wherestring;
                            }
                        }
                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "dynamic") {
                        layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerOptions.url);
                        if (layerOptions.visiblelayers !== undefined && layerOptions.visiblelayers.length !== 0) {
                            layer.setVisibleLayers(layerOptions.visiblelayers);
                        }

                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "titled") {
                        layer = new esri.layers.ArcGISTiledMapServiceLayer(layerOptions.url);
                    }
                    else if (layerOptions.type.toLocaleLowerCase().trim() === "image") {
                        layer = new esri.layers.ArcGISImageServiceLayer(layerOptions.url);
                    }
                    if (layer === null) {
                        alert("图层加载错误，请检查相应参数");
                    }
                    layer.id = layerOptions.label;
                    layer.visible = layerOptions.visible !== undefined ? layerOptions.visible : true;
                    layer.opacity = layerOptions.opacity !== undefined ? layerOptions.opacity : 1.0;
                    if ($scope.map == null) {
                        alert("地图控件尚未加载!");
                    }
                    $scope.map.addLayer(layer);
                    return layer;
                };

                require([
                    "esri/map"
                ], function () {
                    //读取配置文件
                    var config = $attrs.config;
                    if (config === undefined || config !== config || config === "") {
                        config = "js/map/map-config.json";
                    }
                    //加载配置文件，并生成地图
                    $http.get(config).then(function (response) {
                        var groupLayers = [];
                        var satelliteLayers = [];
                        var streetsLayers = [];
                        var groupIndex = 0;

                        $scope.mapOptions = response.data.map;
                        $scope.initialMap(response.data.map);
                        for (var baseLayer in response.data.map.baseMaps) {
                            var layer = $scope.addLayer(response.data.map.baseMaps[baseLayer]);
                            var groupId = response.data.map.baseMaps[baseLayer].groupId;
                            if (groupId != undefined && groupId != null) {
                                for (var index in groupId) {
                                    var id = groupId[index];
                                    if (id === 0) {
                                        streetsLayers.push(layer);
                                    } else if (id === 1) {
                                        satelliteLayers.push(layer);
                                    }
                                }
                            }
                        }
                        for (var livingmap in response.data.map.livingmaps) {
                            $scope.addLayer(response.data.map.livingmaps[livingmap]);
                        }
                        var postion = (response.data.map.sliderposition === undefined || response.data.map.sliderposition.trim() === "") ? "top-left" : response.data.map.sliderposition;
                        var orientation = (response.data.map.sliderorientation === undefined || response.data.map.sliderposition.trim() === "") ? "vertical" : response.data.map.sliderorientation;
                        $scope.initBaseButtonTag(postion, orientation);
                        if (streetsLayers.length > 0) {
                            groupLayers.push(streetsLayers);
                        }
                        if (satelliteLayers.length > 0) {
                            groupLayers.push(satelliteLayers);
                        }
                        if (groupLayers.length > 0) {
                            $scope.addButtonForImg("img/map_layer.png", function () {
                                var groupLayer0 = groupLayers[0];
                                var groupLayer1 = groupLayers[1];
                                if (groupIndex === 0) {
                                    for (var index in groupLayer1) {
                                        groupLayer1[index].hide();
                                    }
                                    for (var index in groupLayer0) {
                                        groupLayer0[index].show();
                                    }
                                    groupIndex = 1;
                                } else {
                                    for (var index in groupLayer0) {
                                        groupLayer0[index].hide();
                                    }
                                    for (var index in groupLayer1) {
                                        groupLayer1[index].show();
                                    }
                                    groupIndex = 0;
                                }
                            });
                        }
                    }, function (error) {
                        alert("地图加载错误，请检查配置文件！");
                    });
                });
            },
            link: function (scope, elements, attrs, controller) {

            }
        };
    })
;