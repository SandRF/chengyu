var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelDataManager = (function () {
    function LevelDataManager() {
        this.num_levels = GameData.Instance.dataArr.length;
        this.total_level = Number(egret.localStorage.getItem('total_level'));
        if (this.total_level == 0)
            this.total_level = 1;
        // console.log(this.total_level);//当total_level不存在时，应为undefined，经过强转变为0；
        this.curLoadGroup = Math.floor(this.total_level / 50) + 1;
        console.log(Math.floor(this.total_level / 50) + 1);
    }
    Object.defineProperty(LevelDataManager, "Instance", {
        get: function () {
            if (this._levelDataManager == null) {
                this._levelDataManager = new LevelDataManager();
            }
            return this._levelDataManager;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 返回关卡数据
     * @param levelNum 关卡id
     */
    LevelDataManager.prototype.getLevelData = function (levelNum) {
        return GameData.Instance.dataArr[levelNum - 1];
    };
    /**
     * 根据ID更新当前关卡的id和数据
     * @param id 关卡id
     */
    LevelDataManager.prototype.setCurrentLevel = function (id) {
        this.curLevelID = id;
        this.curLevelData = this.getLevelData(id);
    };
    return LevelDataManager;
}());
__reflect(LevelDataManager.prototype, "LevelDataManager");
