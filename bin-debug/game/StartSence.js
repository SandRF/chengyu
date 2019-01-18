var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var StartSence = (function (_super) {
    __extends(StartSence, _super);
    function StartSence() {
        var _this = _super.call(this) || this;
        _this.skinName = "StartSenceSkin";
        return _this;
    }
    StartSence.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.init();
    };
    StartSence.prototype.init = function () {
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundManager.Instance.play_ef_btnclick();
            SenceManager.Instance.addSence(SenceManager.Instance.levelSence);
            SenceManager.Instance.removeSence(SenceManager.Instance.startSence);
        }, this);
        this.btn_setting.touchEnabled = true;
        this.btn_setting.touchChildren = false;
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("\u70B9\u51FB\u8BBE\u7F6E");
            SoundManager.Instance.play_ef_btnclick();
            SenceManager.Instance.addSence(SenceManager.Instance.settingSence);
        }, this);
    };
    return StartSence;
}(eui.Component));
__reflect(StartSence.prototype, "StartSence");
