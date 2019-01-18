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
var Btn_level = (function (_super) {
    __extends(Btn_level, _super);
    function Btn_level(levelNum) {
        var _this = _super.call(this) || this;
        _this._levelNum = levelNum;
        _this.skinName = "Btn_levelSkin";
        return _this;
    }
    Btn_level.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //初始化- 设置图片锚点
        this.init();
        //更新当前状态
        this.updateStatus();
        //添加点击事件
        this.addTouchEvents();
    };
    /**设置点击时的图片的锚点 */
    Btn_level.prototype.init = function () {
        this.btn_on.anchorOffsetX = this.btn_on.width / 2;
        this.btn_on.anchorOffsetY = this.btn_on.height / 2;
        this.btn_on.x = this.btn_on.width / 2;
        this.btn_on.y = this.btn_on.height / 2;
    };
    /**更新解锁状态 */
    Btn_level.prototype.updateStatus = function () {
        //从本地读取通关记录
        this._isUnlocked = Boolean(egret.localStorage.getItem("" + this._levelNum));
        if (this._isUnlocked) {
            this.currentState = "unLocked";
        }
        else {
            this.currentState = "disabled";
        }
    };
    /**设置是否已解锁 */
    Btn_level.prototype.setUnlocked = function (isUnlocked) {
        this._isUnlocked = isUnlocked;
        this.updateStatus();
    };
    Object.defineProperty(Btn_level.prototype, "levelNum", {
        get: function () {
            return this._levelNum;
        },
        enumerable: true,
        configurable: true
    });
    /**添加按钮的点击事件 */
    Btn_level.prototype.addTouchEvents = function () {
        var _this = this;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            SoundManager.Instance.play_ef_btnclick();
            if (_this._isUnlocked) {
                _this.currentState = "down";
            }
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            if (_this._isUnlocked) {
                _this.currentState = "unLocked";
            }
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            if (_this._isUnlocked) {
                _this.currentState = "unLocked";
                // console.log(`------btn_level------------`)
                // console.log(`选择关卡: ${this._levelNum}`);
                //更新数据管理类中的当前关卡id和数据
                LevelDataManager.Instance.setCurrentLevel(_this._levelNum);
                // console.log(LevelDataManager.Instance.curLevelID, LevelDataManager.Instance.curLevelData.answer);
                SenceManager.Instance.createGameSence();
                // console.log(`---------------------------`)
            }
            else {
                console.log("\u672A\u89E3\u9501\u5173\u5361: " + _this._levelNum);
            }
        }, this);
    };
    return Btn_level;
}(eui.Component));
__reflect(Btn_level.prototype, "Btn_level");
