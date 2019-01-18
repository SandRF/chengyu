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
var Item_Word = (function (_super) {
    __extends(Item_Word, _super);
    function Item_Word() {
        var _this = _super.call(this) || this;
        _this.skinName = "Item_WordSkin";
        return _this;
    }
    Item_Word.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.touchChildren = false;
        this.touchEnabled = true;
    };
    return Item_Word;
}(eui.Component));
__reflect(Item_Word.prototype, "Item_Word");
