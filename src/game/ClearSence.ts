class ClearSence extends eui.Component {

    public btn_nextLevel: eui.Button;
    public tip: eui.Label;
    public content: eui.Label;

    private data: ITEM;

    public constructor() {
        super();
        this.skinName = "ClearSenceSkin";
    }

    protected createChildren() {
        super.createChildren();
        this.btn_nextLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SoundManager.Instance.play_ef_btnclick();
            //更新需要显示的关卡数据
            LevelDataManager.Instance.setCurrentLevel(LevelDataManager.Instance.curLevelID + 1);
            //移除自身--更新gamesence
            SenceManager.Instance.createGameSence();
        }, this);
    }

    public init(data: ITEM) {
        this.data = data;
        this.tip.text = this.data.tip;
        this.content.text = this.data.content;

        this.btn_nextLevel.touchEnabled = true;
        this.btn_nextLevel.touchChildren = false;
    }
}