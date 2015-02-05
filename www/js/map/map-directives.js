/**
 * Created by xubo on 2015/1/13.
 * mapView基类指令
 */
angular.module('ThsMapDirectives', ['ionic'])
    .directive("thsMapView", function ($document, $q, $http) {
        return {
            restrict: "E",
            replace: true,
            template: '<div style="height: 100%;width: 100%;"/>',
            scope: true,
            controller: function ($scope, $element, $attrs) {
                $scope.map = null;

                /**-------------------------图层上创建相关按钮的方法---------------------------------------*/
                /**DivTag是包含按钮的外标签,每个按钮都是DivButtonTagOne,ButtonTagTop,DivButtonTagMiddle,DivButtonTagButtom,
                 * 按钮内的图片ButtonImgTag,文字则ButtonTextTag*/

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
                 * 加载基础图层信息
                 * then返回map对象
                 */
                $scope.addLayerToMap = function (layerOptions) {
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
                    if (layer === null) {
                        alert("图层加载错误，请检查相应参数");
                    }
                    layer.id = layerOptions.label;
                    layer.visible = layerOptions.visible;
                    if ($scope.map == null) {
                        alert("地图控件尚未加载!");
                    }
                    $scope.map.addLayer(layer);
                };

                /**
                 * 给指定map设置定位点
                 * @param map map对象(必填)
                 * @param graphicsLayer 图形图层(必填)
                 * @param x 定位点经度(必填)
                 * @param y 定位点纬度(必填)
                 * @param locationIcon 定位图标(必填)
                 * @param attrTemplate 绑定模版数据(选填)
                 * @param infoTemplate 模版(选填)
                 */
                $scope.location = function (graphicsLayer, x, y, locationIcon, attrTemplate, infoTemplate) {
                    require(["esri/geometry/Point", "esri/symbols/PictureMarkerSymbol", "esri/graphic"], function (Point, PictureMarkerSymbol, Graphic) {
                        //创建点位点
                        var point = new Point(x, y);
                        //创建定位图片符号
                        var pictureMarkerSymbol = new PictureMarkerSymbol(locationIcon, 24, 24);
                        //创建定位Graphic
                        var graphic = new Graphic(point, pictureMarkerSymbol, attrTemplate, infoTemplate);
                        //添加定位Graphic
                        graphicsLayer.add(graphic);
                        $scope.map.centerAt(point);
                    });
                };

                /**
                 * 给指定map设置中心点
                 * @param map map对象(必填)
                 * @param x 中心点的经度值(必填)
                 * @param y 中心点的纬度值(必填)
                 */
                $scope.setMapCenter = function (x, y) {
                    require(["esri/geometry/Point"], function (Point) {
                        var centerPoint = new Point(x, y);
                        $scope.map.centerAt(centerPoint);
                    });
                };

                /**
                 * 设置map显示范围
                 * @param map map对象(必填)
                 * @param minX(必填)
                 * @param minY(必填)
                 * @param maxX(必填)
                 * @param maxY(必填)
                 */
                $scope.setMapExtent = function (minX, minY, maxX, maxY) {
                    require(["esri/geometry/Extent", "esri/SpatialReference"], function (Extent, SpatialReference) {
                        var extent = new Extent(minX, minY, maxX, maxY);
                        $scope.map.setExtent(extent);
                    });
                };

                /**
                 * 给指定图层设置弹出窗口模版
                 * @param layer 图层(必填)
                 * @param template 模版信息(必填)
                 */
                $scope.setLayerTemplate = function (layer, template) {
                    require(["esri/InfoTemplate"], function (InfoTemplate) {
                        //创建模版
                        var infoTemplate = new InfoTemplate(template);
                        //设置模版
                        layer.setInfoTemplate(infoTemplate);
                    });
                };

                /**
                 * 创建图形图层
                 * then返回graphicsLayer
                 */
                $scope.creatGraphicsLayer = function () {
                    var defer = $q.defer();
                    require(["esri/layers/GraphicsLayer"], function (GraphicsLayer) {
                        //创建图形图层
                        var graphicsLayer = new GraphicsLayer();
                        defer.resolve(graphicsLayer);
                    });
                    return defer.promise;
                };

                /**
                 * 创建模版
                 * @param template 模版信息(必填)
                 * then返回模版
                 */
                $scope.creatInfoTemplate = function (template) {
                    var defer = $q.defer();
                    require(["esri/InfoTemplate"], function (InfoTemplate) {
                        //创建模版
                        var infoTemplate = new InfoTemplate(template);
                        defer.resolve(infoTemplate);
                    });
                    return defer.promise;
                };

                /**
                 * 图层上增加点
                 * @param map map对象
                 * @param x 经度(必填)
                 * @param y 纬度(必填)
                 * @param icon 点图标(必填)
                 * @param graphicsLayer 图层(必填)
                 * @param attrTemplate 绑定模版数据(选填)
                 * @param infoTemplate 模版(选填)
                 */
                $scope.addMarker = function (x, y, icon, graphicsLayer, attrTemplate, infoTemplate) {
                    require(["esri/geometry/Point", "esri/symbols/PictureMarkerSymbol", "esri/graphic"], function (Point, PictureMarkerSymbol, Graphic) {
                        //创建点
                        var point = new Point(x, y);
                        //创建图片符号
                        var pictureMarkerSymbol = new PictureMarkerSymbol(icon, 24, 24);
                        //创建Graphic
                        var graphic = new Graphic(point, pictureMarkerSymbol, attrTemplate, infoTemplate);
                        //添加Graphic
                        graphicsLayer.add(graphic);
                    });
                };

                /**
                 * 图层上增加aqi点
                 * @param map map实体(必填)
                 * @param x 经度(必填)
                 * @param y 纬度(必填)
                 * @param value aqi值(必填)
                 * @param graphicsLayer 图层(必填)
                 * @param attrTemplate 绑定模版数据(选填)
                 * @param infoTemplate 模版(选填)
                 */
                $scope.addAqiMarker = function (x, y, value, graphicsLayer, attrTemplate, infoTemplate) {
                    require(["esri/symbols/PictureMarkerSymbol", "esri/symbols/Font", "esri/symbols/TextSymbol", "esri/graphic", "esri/geometry/Point"], function (PictureMarkerSymbol, Font, TextSymbol, Graphic, Point) {
                        var pictureMarkerSymbol;
                        if (value >= 0 && value <= 50) {
                            pictureMarkerSymbol = new PictureMarkerSymbol("img/aqi_0_50.png", 50, 24);
                        } else if (value > 50 && value <= 100) {
                            pictureMarkerSymbol = new PictureMarkerSymbol("img/aqi_50_100.png", 50, 24);
                        } else if (value > 100 && value <= 150) {
                            pictureMarkerSymbol = new PictureMarkerSymbol("img/aqi_100_150.png", 50, 24);
                        } else if (value > 150 && value <= 200) {
                            pictureMarkerSymbol = new PictureMarkerSymbol("img/aqi_150_200.png", 50, 24);
                        } else if (value > 200 && value <= 300) {
                            pictureMarkerSymbol = new PictureMarkerSymbol("img/aqi_200_300.png", 50, 24);
                        } else if (value > 300) {
                            pictureMarkerSymbol = new PictureMarkerSymbol("img/aqi_300_500.png", 50, 24);
                        } else {
                            pictureMarkerSymbol = new PictureMarkerSymbol("img/aqi_0_50.png", 50, 24);
                        }
                        //创建点
                        var point = new Point(x, y);
                        //创建Graphic
                        var graphicPic = new Graphic(point, pictureMarkerSymbol, attrTemplate, infoTemplate);
                        //图层增加图片点
                        graphicsLayer.add(graphicPic);
                        var font = new Font();
                        font.setSize("10pt");
                        font.setWeight(Font.WEIGHT_BOLD);
                        //文字描述
                        var textSymbol = new TextSymbol(value, font, new esri.Color([81, 11, 132]));
                        textSymbol.setAlign(TextSymbol.ALIGN_MIDDLE);
                        textSymbol.setOffset(0, -5);
                        //创建文字描述点
                        var graphicText = new Graphic(point, textSymbol, attrTemplate, infoTemplate);
                        //增加文字描述点
                        graphicsLayer.add(graphicText);
                    });
                };


                $scope.configMapAttributes = function (mapOptions) {
                    $scope.map = new esri.Map($element[0], {
                        wrapAround180: mapOptions.wrapAround180,
                        logo: false,
                        fadeOnZoom: false
                    });
                    $scope.$emit("getMap", $scope.map);
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
                        $scope.configMapAttributes(response.data.map);
                        for (var baseLayer in response.data.map.baseMaps) {
                            $scope.addLayerToMap(response.data.map.baseMaps[baseLayer]);
                        }
                    }, function (error) {
                        alert("地图加载错误，请检查配置文件！");
                    });
                });
            }
        };
    });