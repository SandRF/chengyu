class StartSence extends eui.Component {

    public btn_start: eui.Button;
    public btn_setting: eui.Group;



    public constructor() {
        super();
        this.skinName = "StartSenceSkin";
    }

    protected createChildren(): void {
        super.createChildren();
        this.init();
    }

    private init() {
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SoundManager.Instance.play_ef_btnclick();
            SenceManager.Instance.addSence(SenceManager.Instance.levelSence);
            SenceManager.Instance.removeSence(SenceManager.Instance.startSence);
        }, this);

        this.btn_setting.touchEnabled = true;
        this.btn_setting.touchChildren = false;
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            console.log(`点击设置`);
            SoundManager.Instance.play_ef_btnclick();
            SenceManager.Instance.addSence(SenceManager.Instance.settingSence);
        }, this);
    }
}