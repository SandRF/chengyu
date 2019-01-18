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
var SettingSence = (function (_super) {
    __extends(SettingSence, _super);
    function SettingSence() {
        var _this = _super.call(this) || this;
        _this.skinName = "SettingSenceSkin";
        return _this;
    }
    SettingSence.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.init();
    };
    SettingSence.prototype.init = function () {
        var _this = this;
        this.btn_bgm.init("btn_music_png");
        this.btn_effect.init("btn_sound_png");
        this.btn_bgm.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundManager.Instance.play_ef_btnclick();
            SoundManager.Instance.isbgmOn = !SoundManager.Instance.isbgmOn;
            if (SoundManager.Instance.isbgmOn) {
                _this.btn_bgm.currentState = 'ON';
            }
            else {
                _this.btn_bgm.currentState = 'OFF';
            }
        }, this);
        this.btn_effect.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundManager.Instance.isEffectOn = !SoundManager.Instance.isEffectOn;
            if (SoundManager.Instance.isEffectOn) {
                _this.btn_effect.currentState = 'ON';
            }
            else {
                _this.btn_effect.currentState = 'OFF';
            }
            SoundManager.Instance.play_ef_btnclick();
        }, this);
        this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundManager.Instance.play_ef_btnclick();
            SenceManager.Instance.removeSence(SenceManager.Instance.settingSence);
        }, this);
    };
    return SettingSence;
}(eui.Component));
__reflect(SettingSence.prototype, "SettingSence");
