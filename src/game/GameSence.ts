class GameSence extends eui.Component {

    public img: eui.Image;
    public answerGroup: eui.Group;
    public wordGroup: eui.Group;
    public btn_return: eui.Button;
    /**当前关卡数据 */
    private curLevelData: ITEM;
    /**当前关卡ID */
    private currentID: number;
    /**已选中的文字 */
    private answerArr: string[] = [];
    private answerNum: number = 4;

    public constructor() {
        super();
        this.skinName = "GameSenceSkin";
    }

    protected createChildren(): void {
        super.createChildren();
        this.init();
    }

    private init() {
        //通过levelDataManager获取当前关卡id和数据
        this.currentID = LevelDataManager.Instance.curLevelID;
        this.curLevelData = LevelDataManager.Instance.curLevelData;

        //设置img纹理
        this.img.texture = RES.getRes(this.curLevelData.img);

        //生成answer物体
        for (let i = 0; i < this.answerNum; i++) {
            let item = new Item_Answer();
            item.scaleX = 0.7;
            item.scaleY = 0.68;
            this.answerGroup.addChild(item);
        }

        let words = this.generateWords();

        //生成words实例
        for (let i = 0; i < words.length; i++) {
            let item = new Item_Word();
            item.word.text = words[i];
            this.wordGroup.addChild(item);
        }
        //添加点击事件
        this.addTouchEvents();
    }

    /**生成选项字符串 */
    private generateWords(): string {
        //选项字符串前半
        let words: string = this.curLevelData.word + this.curLevelData.answer;
        //取另外一组的字 随机 从当前组往后
        let num = Math.floor(Math.random() * (LevelDataManager.Instance.num_levels - this.currentID) + this.currentID);
        let ranLevelData = LevelDataManager.Instance.getLevelData(num);
        words += ranLevelData.word + ranLevelData.answer;
        //words随机排序
        words = this.randomWords(words);
        return words;
    }

    /**添加点击事件 */
    private addTouchEvents() {
        this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SoundManager.Instance.play_ef_btnclick();
            SenceManager.Instance.switchSence(SenceManager.Instance.startSence);
        }, this);
        this.wordGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroup, this);
        this.answerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchAnswer, this);
    }

    //TODO 需不需要移除监听事件
    /**移除点击事件 */
    private removeouchEvents() {
        this.btn_return.removeEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SoundManager.Instance.play_ef_btnclick();
            SenceManager.Instance.switchSence(SenceManager.Instance.startSence);
        }, this);
        this.wordGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroup, this);
        this.answerGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchAnswer, this);
    }

    /**对文字随机排序 */
    private randomWords(words: string) {
        let arr = words.split('');
        let newWords: string = '';
        for (let i = arr.length; i > 0; i--) {
            let ran = Math.floor(Math.random() * arr.length);
            newWords += arr[ran];
            arr.splice(ran, 1);
        }
        return newWords;
    }

    //点击选择文字
    private onTouchGroup(e: egret.TouchEvent) {
        //这里需要判断visible是否为true
        if (e.target instanceof Item_Word && e.target.word.visible) {
            SoundManager.Instance.play_ef_word();
            for (let i = 0; i < this.answerGroup.numChildren; i++) {
                let item = this.answerGroup.getChildAt(i) as Item_Answer;
                if (item.word.text == '') {
                    item.word.text = e.target.word.text;
                    item.indexFrom = e.target.parent.getChildIndex(e.target);
                    e.target.word.visible = false;
                    //添加
                    this.answerArr.splice(i, 0, item.word.text);
                    break;
                }
            }
            //四个字都已经选择了
            if (this.answerArr.length == this.answerNum) {
                this.isClear();
            }
        }
    }

    //点击移除文字
    private onTouchAnswer(e: egret.TouchEvent) {
        if (e.target instanceof Item_Word && e.target.word.text != '') {
            SoundManager.Instance.play_ef_word();
            e.target.word.text = '';
            (this.wordGroup.getChildAt((e.target as Item_Answer).indexFrom) as Item_Word).word.visible = true;
            let index: number = this.answerGroup.getChildIndex(e.target);
            this.answerArr.splice(index, 1);
        }
    }

    /**
     * 判断是否通关
     * 
     */
    private isClear() {
        let answer: string = this.answerArr.join('');
        if (answer == this.curLevelData.answer) {
            SoundManager.Instance.play_ef_right();

            //解锁记录 存储到本地 将下一个关解锁
            if (this.currentID >= LevelDataManager.Instance.total_level) {
                LevelDataManager.Instance.total_level = this.currentID + 1;
                egret.localStorage.setItem(`total_level`, `${LevelDataManager.Instance.total_level}`);
            }

            //更新按钮状态为unlock //通过id设置(name属性)
            let nextLevel_btn = SenceManager.Instance.levelSence.levelsGroup.getChildByName(`${this.currentID + 1}`) as Btn_level;
            nextLevel_btn.setUnlocked(true);
            //判断是否需要加载下一组资源 web需要缓存到本地再从本地优先读取
            // LevelDataManager.Instance.loadNextGroup();
            //弹出通关界面
            SenceManager.Instance.popClearSence();
        } else {
            SoundManager.Instance.play_ef_wrong();
        }
    }

    /**
     * 重置数据
     */
    public resetgameSence() {
        //通过levelDataManager获取当前关卡id和数据
        this.currentID = LevelDataManager.Instance.curLevelID;
        this.curLevelData = LevelDataManager.Instance.curLevelData;
        //更新img
        this.img.texture = RES.getRes(this.curLevelData.img);
        console.log(this.curLevelData.img);

        // this.img.source=`resource/assets/data/images/${this.curLevelData.img}`;

        //更新答案框
        for (let i = 0; i < this.answerNum; i++) {
            (this.answerGroup.getChildAt(i) as Item_Answer).word.text = '';
        }
        //更新选项框
        let words = this.generateWords();
        for (let i = 0; i < words.length; i++) {
            (this.wordGroup.getChildAt(i) as Item_Word).word.text = words[i];
            (this.wordGroup.getChildAt(i) as Item_Word).word.visible = true;
        }
        //重置存放答案的数组
        this.answerArr = [];
    }
}