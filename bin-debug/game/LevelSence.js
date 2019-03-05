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
var LevelSence = (function (_super) {
    __extends(LevelSence, _super);
    function LevelSence() {
        var _this = _super.call(this) || this;
        _this.btnHeight = 80;
        _this.levelsGroup = new eui.Group();
        _this.skinName = "LevelSenceSkin";
        return _this;
    }
    LevelSence.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundManager.Instance.play_ef_btnclick();
            SenceManager.Instance.switchSence(SenceManager.Instance.startSence);
        }, this);
        this.init();
    };
    LevelSence.prototype.init = function () {
        this.scroll_Group.addChild(this.levelsGroup);
        this.levelsGroup.height = this.btnHeight * LevelDataManager.Instance.num_levels;
        this.levelsGroup.width = this.levelScroll.width;
        //设置背景图
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("GameBG2_jpg");
        bg.fillMode = egret.BitmapFillMode.REPEAT;
        bg.height = this.levelsGroup.height;
        bg.scaleX = this.levelsGroup.width / bg.width;
        this.levelsGroup.addChild(bg);
        //设置可视区域竖直方向起始点
        this.levelScroll.viewport.scrollV = this.levelsGroup.height - this.levelScroll.height;
        //禁用回弹
        this.levelScroll.bounces = false;
        //隐藏滑动条
        this.levelScroll.verticalScrollBar.autoVisibility = false;
        this.levelScroll.verticalScrollBar.visible = false;
        //生成关卡按钮
        for (var i = 0; i < LevelDataManager.Instance.num_levels; i++) {
            var btn = new Btn_level(i + 1);
            this.levelsGroup.addChild(btn);
            //用公式计算x坐标            
            btn.y = this.levelsGroup.height - btn.height * (i + 1);
            btn.x = Math.sin(btn.y / 3 / 180 * Math.PI) * 200 + this.levelsGroup.width / 3 + btn.width / 2;
        }
    };
    return LevelSence;
}(eui.Component));
__reflect(LevelSence.prototype, "LevelSence");
