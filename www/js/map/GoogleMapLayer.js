define("ths/layers/GoogleMapLayer", ["dojo/_base/declare", "dojo/string", "esri/layers/TiledMapServiceLayer", "esri/layers/TileInfo", "esri/SpatialReference", "esri/geometry/Extent"], function (declare, string, TiledMapServiceLayer, TileInfo, SpatialReference, Extent) {
    declare("ths.layers.GoogleMapLayer", TiledMapServiceLayer, {
        constructor: function (type) {
            this.subDomains = [0, 1];
            if (!type || type === "streets") {
                this.urlTemplate = "http://mt${subDomain}.google.cn/vt/lyrs=m@177000000&hl=zh-CN&gl=cn&src=app&x=${col}&y=${row}&z=${level}&style=47,37%7Csmartmaps";
            }
            else if (type === "satellite") {
                this.urlTemplate = "http://mt${subDomain}.google.cn/vt?lyrs=s@165&hl=zh-CN&gl=CN&src=app&x=${col}&y=${row}&z=${level}";
            }
            else if (type === "label") {
                this.urlTemplate = "http://mt${subDomain}.googleapis.cn/vt/imgtp=png32&lyrs=h@177000000&hl=zh-CN&gl=cn&src=app&x=${col}&y=${row}&z=${level}&style=50,37%7Csmartmaps";
            }
            else if (type === "terrain") {
                this.urlTemplate = "http://mt${subDomain}.google.cn/vt?lyrs=t@132,r@258000000&src=apiv3&hl=zh-CN&x=${col}&y=${row}&z=${level}&style=37%7Csmartmaps";
            }
            this.tileInfo = new TileInfo({
                "rows": 256,
                "cols": 256,
                "compressionQuality": 0,
                "origin": {"x": -20037508.342787, "y": 20037508.342787},
                "spatialReference": {"wkid": 102100},
                "lods": [
                    {level: 0, resolution: 156543.033928, scale: 5.91657527591555E8},
                    {level: 1, resolution: 78271.5169639999, scale: 2.95828763795777E8},
                    {level: 2, resolution: 39135.7584820001, scale: 1.47914381897889E8},
                    {level: 3, resolution: 19567.8792409999, scale: 7.3957190948944E7},
                    {level: 4, resolution: 9783.93962049996, scale: 3.6978595474472E7},
                    {level: 5, resolution: 4891.96981024998, scale: 1.8489297737236E7},
                    {level: 6, resolution: 2445.98490512499, scale: 9244648.868618},
                    {level: 7, resolution: 1222.99245256249, scale: 4622324.434309},
                    {level: 8, resolution: 611.49622628138, scale: 2311162.217155},
                    {level: 9, resolution: 305.748113140558, scale: 1155581.108577},
                    {level: 10, resolution: 152.874056570411, scale: 577790.554289},
                    {level: 11, resolution: 76.4370282850732, scale: 288895.277144},
                    {level: 12, resolution: 38.2185141425366, scale: 144447.638572},
                    {level: 13, resolution: 19.1092570712683, scale: 72223.819286},
                    {level: 14, resolution: 9.55462853563415, scale: 36111.909643},
                    {level: 15, resolution: 4.77731426794937, scale: 18055.954822},
                    {level: 16, resolution: 2.38865713397468, scale: 9027.977411},
                    {level: 17, resolution: 1.19432856685505, scale: 4513.988705},
                    {level: 18, resolution: 0.597164283559817, scale: 2256.994353},
                    {level: 19, resolution: 0.298582141647617, scale: 1128.497176}
                ]
            });
            this.spatialReference = new SpatialReference(this.tileInfo.spatialReference.toJson());//google地图的空间参考
            this.fullExtent = new Extent(-20037508.342787, -20037508.342787, 20037508.342787, 20037508.342787, this.spatialReference);
            this.initialExtent = new Extent(-20037508.342787, -20037508.342787, 20037508.342787, 20037508.342787, this.spatialReference);
            this.loaded = true;
            this.onLoad(this);
        },
        getTileUrl: function (level, row, col) {
            return string.substitute(this.urlTemplate, {
                subDomain: this.subDomains[row % this.subDomains.length],
                col: col, row: row, level: level
            });
        }
    });
});