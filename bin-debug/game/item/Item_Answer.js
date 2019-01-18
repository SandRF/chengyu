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
var Item_Answer = (function (_super) {
    __extends(Item_Answer, _super);
    function Item_Answer() {
        return _super.call(this) || this;
    }
    Item_Answer.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return Item_Answer;
}(Item_Word));
__reflect(Item_Answer.prototype, "Item_Answer");
