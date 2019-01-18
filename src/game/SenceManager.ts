class SenceManager {
    private static _senceManager: SenceManager;
    public static get Instance() {
        if (this._senceManager == null) {
            this._senceManager = new SenceManager;
        }
        return this._senceManager;
    }

    public _root: egret.DisplayObjectContainer;

    public startSence: StartSence;
    public levelSence: LevelSence;
    public gameSence: GameSence;
    public clearSence: ClearSence;
    public settingSence: SettingSence;

    public constructor() {
        this.startSence = new StartSence();
        this.levelSence = new LevelSence();
        this.gameSence = new GameSence();
        this.clearSence = new ClearSence();
        this.settingSence = new SettingSence();
    }

    /**设置根场景 */
    public setStage(root: egret.DisplayObjectContainer) {
        if (this._root == null) {
            this._root = root;
        }
        else {
            console.log("this._root已被设置过,不能重复设置")
        }
    }

    /**
     *添加场景
     *@param newSence 需要添加的场景
     *@param parent 父节点, 可选, 默认是根场景
     */
    public addSence(newSence: egret.DisplayObjectContainer, parent?: egret.DisplayObjectContainer) {
        if (parent == null) {
            parent = this._root;
        }
        parent.addChild(newSence);
    }

    /**
     * 移除场景
     * @param sence 需要移除的场景
     */
    public removeSence(oldSence: egret.DisplayObjectContainer) {
        if (oldSence.parent) {
            oldSence.parent.removeChild(oldSence);
        } else {
            console.log(oldSence);
            console.log(`没有父节点`)
        }
    }

    /**
     * 切换场景 (清空然后添加)
     */
    public switchSence(newSence?: egret.DisplayObjectContainer, parent?: egret.DisplayObjectContainer) {
        if (parent == null) {
            parent = this._root;
        }
        parent.removeChildren();
        parent.addChild(newSence);
    }

    /**显示通关界面 */
    public popClearSence() {
        this.addSence(this.clearSence);
        this.clearSence.init(LevelDataManager.Instance.curLevelData);
    }


    /**
     * 生成新的gamesence
     */
    // public createGameSence() {
    //     this._root.removeChildren();
    //     this.gameSence = new GameSence();
    //     this.addSence(this.gameSence);
    // }

    public createGameSence() {
        // console.log(`sencemanager public resetgameSence`)
        this._root.removeChildren();
        this.addSence(this.gameSence);
        this.gameSence.resetgameSence();
    }
}