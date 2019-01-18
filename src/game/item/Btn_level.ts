class Btn_level extends eui.Component {

    public btn_on: eui.Image;
    public btn_off: eui.Image;

    public _levelNum: number;
    /**是否解锁 */
    private _isUnlocked: boolean;


    public constructor(levelNum: number) {
        super();
        this._levelNum = levelNum;
        this.skinName = "Btn_levelSkin";
    }

    protected createChildren() {
        super.createChildren();
        //初始化- 设置图片锚点
        this.init();
        //更新当前状态
        this.updateStatus();
        //添加点击事件
        this.addTouchEvents();
    }

    /**设置点击时的图片的锚点 */
    public init() {
        this.btn_on.anchorOffsetX = this.btn_on.width / 2;
        this.btn_on.anchorOffsetY = this.btn_on.height / 2;
        this.btn_on.x = this.btn_on.width / 2;
        this.btn_on.y = this.btn_on.height / 2;
    }

    /**更新解锁状态 */
    private updateStatus() {
        //从本地读取通关记录
        this._isUnlocked = Boolean(egret.localStorage.getItem(`${this._levelNum}`));
        if (this._isUnlocked) {
            this.currentState = "unLocked";
        } else {
            this.currentState = "disabled";
        }
    }

    /**设置是否已解锁 */
    public setUnlocked(isUnlocked: boolean) {
        this._isUnlocked = isUnlocked;
        this.updateStatus();
    }

    public get levelNum() {
        return this._levelNum;
    }

    /**添加按钮的点击事件 */
    private addTouchEvents() {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            SoundManager.Instance.play_ef_btnclick();
            if (this._isUnlocked) {
                this.currentState = "down";
            }
        }, this);

        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
            if (this._isUnlocked) {
                this.currentState = "unLocked";
            }
        }, this);

        this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            if (this._isUnlocked) {
                this.currentState = "unLocked";
                // console.log(`------btn_level------------`)
                // console.log(`选择关卡: ${this._levelNum}`);
                //更新数据管理类中的当前关卡id和数据
                LevelDataManager.Instance.setCurrentLevel(this._levelNum);
                // console.log(LevelDataManager.Instance.curLevelID, LevelDataManager.Instance.curLevelData.answer);
                SenceManager.Instance.createGameSence();
                // console.log(`---------------------------`)
            } else {
                console.log(`未解锁关卡: ${this._levelNum}`);
            }
        }, this);
    }
}

window['Btn_level'] = Btn_level;