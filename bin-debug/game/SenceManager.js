var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SenceManager = (function () {
    function SenceManager() {
        this.startSence = new StartSence();
        this.levelSence = new LevelSence();
        this.gameSence = new GameSence();
        this.clearSence = new ClearSence();
        this.settingSence = new SettingSence();
    }
    Object.defineProperty(SenceManager, "Instance", {
        get: function () {
            if (this._senceManager == null) {
                this._senceManager = new SenceManager;
            }
            return this._senceManager;
        },
        enumerable: true,
        configurable: true
    });
    /**设置根场景 */
    SenceManager.prototype.setStage = function (root) {
        if (this._root == null) {
            this._root = root;
        }
        else {
            console.log("this._root已被设置过,不能重复设置");
        }
    };
    /**
     *添加场景
     *@param newSence 需要添加的场景
     *@param parent 父节点, 可选, 默认是根场景
     */
    SenceManager.prototype.addSence = function (newSence, parent) {
        if (parent == null) {
            parent = this._root;
        }
        parent.addChild(newSence);
    };
    /**
     * 移除场景
     * @param sence 需要移除的场景
     */
    SenceManager.prototype.removeSence = function (oldSence) {
        if (oldSence.parent) {
            oldSence.parent.removeChild(oldSence);
        }
        else {
            console.log(oldSence);
            console.log("\u6CA1\u6709\u7236\u8282\u70B9");
        }
    };
    /**
     * 切换场景 (清空然后添加)
     */
    SenceManager.prototype.switchSence = function (newSence, parent) {
        if (parent == null) {
            parent = this._root;
        }
        parent.removeChildren();
        parent.addChild(newSence);
    };
    /**显示通关界面 */
    SenceManager.prototype.popClearSence = function () {
        this.addSence(this.clearSence);
        this.clearSence.init(LevelDataManager.Instance.curLevelData);
    };
    /**
     * 生成新的gamesence
     */
    // public createGameSence() {
    //     this._root.removeChildren();
    //     this.gameSence = new GameSence();
    //     this.addSence(this.gameSence);
    // }
    SenceManager.prototype.createGameSence = function () {
        // console.log(`sencemanager public resetgameSence`)
        this._root.removeChildren();
        this.addSence(this.gameSence);
        this.gameSence.resetgameSence();
    };
    return SenceManager;
}());
__reflect(SenceManager.prototype, "SenceManager");
