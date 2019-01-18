var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    Object.defineProperty(GameData, "Instance", {
        get: function () {
            if (!this._gameData) {
                this._gameData = new GameData();
            }
            return this._gameData;
        },
        enumerable: true,
        configurable: true
    });
    GameData.prototype.getJsonData = function (url) {
        this.dataArr = RES.getRes(url);
    };
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
