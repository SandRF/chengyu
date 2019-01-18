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
var ClearSence = (function (_super) {
    __extends(ClearSence, _super);
    function ClearSence() {
        var _this = _super.call(this) || this;
        _this.skinName = "ClearSenceSkin";
        return _this;
    }
    ClearSence.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.btn_nextLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundManager.Instance.play_ef_btnclick();
            //更新需要显示的关卡数据
            LevelDataManager.Instance.setCurrentLevel(LevelDataManager.Instance.curLevelID + 1);
            //移除自身--更新gamesence
            SenceManager.Instance.createGameSence();
        }, this);
    };
    ClearSence.prototype.init = function (data) {
        this.data = data;
        this.tip.text = this.data.tip;
        this.content.text = this.data.content;
        this.btn_nextLevel.touchEnabled = true;
        this.btn_nextLevel.touchChildren = false;
    };
    return ClearSence;
}(eui.Component));
__reflect(ClearSence.prototype, "ClearSence");
