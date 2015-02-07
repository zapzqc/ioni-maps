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

                /**
                 * 创建按钮的外部包裹标签(包裹按钮必须的标签)
                 * @param top 距离顶端的位置
                 * @param left 距离左边的位置
                 * @returns {HTMLElement|*}
                 */
                $scope.creatDivTag = function (top, left) {
                    var divTag = $document[0].createElement('div');
                    divTag.style.zIndex = 30;
                    divTag.style.top = top;
                    divTag.style.left = left;
                    divTag.className = "esriSimpleSlider esriSimpleSliderVertical";
                    return divTag;
                };

                /**
                 * 创建单个按钮的标签
                 * @param text 如果不带文字,该参数可不传
                 * @returns {HTMLElement|*}
                 */
                $scope.creatDivButtonTagOne = function (text) {
                    var divButtonTagOne = $document[0].createElement('div');
                    divButtonTagOne.className = "esriSimpleSliderDecrementButton";
                    divButtonTagOne.style.borderTopRightRadius = "5px";
                    divButtonTagOne.style.borderTopLeftRadius = "5px";
                    if (text != null) {
                        divButtonTagOne.innerText = text;
                    }
                    return divButtonTagOne;
                };

                /**
                 * 创建顶部按钮标签
                 * @param text 如果不带文字,该参数可不传
                 * @returns {HTMLElement|*}
                 */
                $scope.creatDivButtonTagTop = function (text) {
                    var divButtonTagTop = $document[0].createElement('div');
                    divButtonTagTop.className = "esriSimpleSliderIncrementButton";
                    if (text != null) {
                        divButtonTagTop.innerText = text;
                    }
                    return divButtonTagTop;
                };

                /**
                 * 创建中间按钮标签
                 * @param text 如果不带文字,该参数可不传
                 * @returns {HTMLElement|*}
                 */
                $scope.creatDivButtonTagMiddle = function (text) {
                    var divButtonTagMiddle = $document[0].createElement('div');
                    divButtonTagMiddle.className = "esriSimpleSliderIncrementButton";
                    divButtonTagMiddle.style.borderRadius = "0px";
                    if (text != null) {
                        divButtonTagMiddle.innerText = text;
                    }
                    return divButtonTagMiddle;
                };

                /**
                 * 创建底部按钮标签
                 * @param text 如果不带文字,该参数可不传
                 * @returns {HTMLElement|*}
                 */
                $scope.creatDivButtonTagButtom = function (text) {
                    var divButtonTagButtom = $document[0].createElement('div');
                    divButtonTagButtom.className = "esriSimpleSliderDecrementButton";
                    if (text != null) {
                        divButtonTagButtom.innerText = text;
                    }
                    return divButtonTagButtom;
                };

                /**
                 * 创建按钮内部图片
                 * @param img 图片url
                 * @returns {HTMLElement|*}
                 */
                $scope.creatButtonImgTag = function (img) {
                    var buttonTag = $document[0].createElement('img');
                    buttonTag.style.verticalAlign = "middle";
                    buttonTag.style.width = "80%";
                    buttonTag.style.height = "80%";
                    buttonTag.src = img;
                    return buttonTag;
                };

                /**-------------------------地图图层操作相关的方法---------------------------------------*/

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
                        showLabels: true
                    });
                    $scope.map.setExtent(new esri.geometry.Extent(mapOptions.initialExtent.xmin, mapOptions.initialExtent.ymin, mapOptions.initialExtent.xmax, mapOptions.initialExtent.ymax));
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
                }
                ;

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
                        $scope.initialMap(response.data.map);
                        for (var baseLayer in response.data.map.baseMaps) {
                            $scope.addLayer(response.data.map.baseMaps[baseLayer]);
                        }
                        for (var livingmap in response.data.map.livingmaps) {
                            $scope.addLayer(response.data.map.livingmaps[livingmap]);
                        }
                        $scope.creatDivButtonTagOne("测试");
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