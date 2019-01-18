class LevelDataManager {

    private static _levelDataManager: LevelDataManager;
    public static get Instance() {
        if (this._levelDataManager == null) {
            this._levelDataManager = new LevelDataManager();
        }
        return this._levelDataManager;
    }

    /**关卡总数 */
    public num_levels: number;

    /**当前关卡id */
    public curLevelID: number;

    /**当前关卡数据 */
    // private _curLevelData: ITEM;
    public curLevelData: ITEM;

    public unlockArr: boolean[];

    public constructor() {
        this.num_levels = GameData.Instance.dataArr.length;
    }


    /**
     * 返回关卡数据
     * @param levelNum 关卡id
     */
    public getLevelData(levelNum: number) {
        return GameData.Instance.dataArr[levelNum - 1];
    }   

    /**
     * 根据ID更新当前关卡的id和数据
     * @param id 关卡id
     */
    public setCurrentLevel(id: number) {
        this.curLevelID = id;
        this.curLevelData = this.getLevelData(id);
    }

}