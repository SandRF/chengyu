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
var Btn_default = (function (_super) {
    __extends(Btn_default, _super);
    function Btn_default() {
        return _super.call(this) || this;
    }
    Btn_default.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    Btn_default.prototype.init = function (url) {
        this.img.texture = RES.getRes(url);
    };
    return Btn_default;
}(eui.Component));
__reflect(Btn_default.prototype, "Btn_default");
window['Btn_default'] = Btn_default;
