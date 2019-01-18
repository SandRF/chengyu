class LevelSence extends eui.Component {

    //eui皮肤中组件
    public levelScroll: eui.Scroller;
    public scroll_Group: eui.Group;
    public btn_return: eui.Button;
    //
    public levelsGroup: eui.Group;
    private btnHeight: number = 80;

    public constructor() {
        super();
        this.levelsGroup = new eui.Group();
        this.skinName = "LevelSenceSkin";
    }

    protected createChildren(): void {
        super.createChildren();
        this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SoundManager.Instance.play_ef_btnclick();
            SenceManager.Instance.switchSence(SenceManager.Instance.startSence);
        }, this);
        this.init();
    }

    private init() {
        this.scroll_Group.addChild(this.levelsGroup);

        this.levelsGroup.height = this.btnHeight * LevelDataManager.Instance.num_levels;
        this.levelsGroup.width = this.levelScroll.width;

        //设置背景图
        let bg: egret.Bitmap = new egret.Bitmap();
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

        egret.localStorage.setItem('1', 'true');

        for (let i = 0; i < LevelDataManager.Instance.num_levels; i++) {
            let btn = new Btn_level(i + 1);
            this.levelsGroup.addChild(btn);
            //用公式计算x坐标            
            btn.y = this.levelsGroup.height - btn.height * (i + 1);
            btn.x = Math.sin(btn.y / 3 / 180 * Math.PI) * 200 + this.levelsGroup.width / 3 + btn.width / 2;
        }
    }

    //TODO 有没有办法可以在场景添加到舞台上的时候,让进行的最后一关显示在屏幕中间
    //TODO 上下翻页按钮,一次翻50个 右边可以加个小进度条
}