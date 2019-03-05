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

    /**当前需要加载的组 */
    public curLoadGroup: number;

    /**解锁的最高关卡 */
    public total_level: number;

    /**当前关卡id */
    public curLevelID: number;

    /**当前关卡数据 */
    // private _curLevelData: ITEM;
    public curLevelData: ITEM;

    public unlockArr: boolean[];

    public constructor() {
        this.num_levels = GameData.Instance.dataArr.length;
        this.total_level = Number(egret.localStorage.getItem('total_level'));
        if (this.total_level == 0) this.total_level = 1;
        // console.log(this.total_level);//当total_level不存在时，应为undefined，经过强转变为0；
        this.curLoadGroup = Math.floor(this.total_level / 50) + 1;
        console.log(Math.floor(this.total_level / 50) + 1);
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

    // ??? 只能在微信端生效？？web需要缓存到本地
    /**
     * 判断是否需要加载下一组资源
     */
    // public loadNextGroup() {

    //     if (this.curLoadGroup * 50 - this.total_level <= 10 && (Math.floor(this.total_level / 50) + 1 == this.curLoadGroup)) {
    //         RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
    //         RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    //         RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadErr, this);
    //         this.curLoadGroup += 1;
    //         RES.loadGroup(`group_${this.curLoadGroup}`);
    //         console.log('加载下一组资源')
    //         console.log(`group_${this.curLoadGroup}`);
    //     }
    // }

    // onResourceLoadComplete(e: egret.Event) {
    //     console.log(`onResourceLoadComplete加载完成`)
    //     console.log(e)
    // }
    // onResourceProgress() {
    //     console.log(`onResourceProgress,加载中`)
    // }
    // onResourceLoadErr(e) {
    //     console.log(`onResourceLoadErr,加载出错`)
    //     console.log(e);
    // }
}