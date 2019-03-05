var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameSence = (function (_super) {
    __extends(GameSence, _super);
    function GameSence() {
        var _this = _super.call(this) || this;
        /**已选中的文字 */
        _this.answerArr = [];
        _this.answerNum = 4;
        _this.skinName = "GameSenceSkin";
        return _this;
    }
    GameSence.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.init();
    };
    GameSence.prototype.init = function () {
        //通过levelDataManager获取当前关卡id和数据
        this.currentID = LevelDataManager.Instance.curLevelID;
        this.curLevelData = LevelDataManager.Instance.curLevelData;
        //设置img纹理
        this.img.texture = RES.getRes(this.curLevelData.img);
        //生成answer物体
        for (var i = 0; i < this.answerNum; i++) {
            var item = new Item_Answer();
            item.scaleX = 0.7;
            item.scaleY = 0.68;
            this.answerGroup.addChild(item);
        }
        var words = this.generateWords();
        //生成words实例
        for (var i = 0; i < words.length; i++) {
            var item = new Item_Word();
            item.word.text = words[i];
            this.wordGroup.addChild(item);
        }
        //添加点击事件
        this.addTouchEvents();
    };
    /**生成选项字符串 */
    GameSence.prototype.generateWords = function () {
        //选项字符串前半
        var words = this.curLevelData.word + this.curLevelData.answer;
        //取另外一组的字 随机 从当前组往后
        var num = Math.floor(Math.random() * (LevelDataManager.Instance.num_levels - this.currentID) + this.currentID);
        var ranLevelData = LevelDataManager.Instance.getLevelData(num);
        words += ranLevelData.word + ranLevelData.answer;
        //words随机排序
        words = this.randomWords(words);
        return words;
    };
    /**添加点击事件 */
    GameSence.prototype.addTouchEvents = function () {
        this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundManager.Instance.play_ef_btnclick();
            SenceManager.Instance.switchSence(SenceManager.Instance.startSence);
        }, this);
        this.wordGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroup, this);
        this.answerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchAnswer, this);
    };
    //TODO 需不需要移除监听事件
    /**移除点击事件 */
    GameSence.prototype.removeouchEvents = function () {
        this.btn_return.removeEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundManager.Instance.play_ef_btnclick();
            SenceManager.Instance.switchSence(SenceManager.Instance.startSence);
        }, this);
        this.wordGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroup, this);
        this.answerGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchAnswer, this);
    };
    /**对文字随机排序 */
    GameSence.prototype.randomWords = function (words) {
        var arr = words.split('');
        var newWords = '';
        for (var i = arr.length; i > 0; i--) {
            var ran = Math.floor(Math.random() * arr.length);
            newWords += arr[ran];
            arr.splice(ran, 1);
        }
        return newWords;
    };
    //点击选择文字
    GameSence.prototype.onTouchGroup = function (e) {
        //这里需要判断visible是否为true
        if (e.target instanceof Item_Word && e.target.word.visible) {
            SoundManager.Instance.play_ef_word();
            for (var i = 0; i < this.answerGroup.numChildren; i++) {
                var item = this.answerGroup.getChildAt(i);
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
    };
    //点击移除文字
    GameSence.prototype.onTouchAnswer = function (e) {
        if (e.target instanceof Item_Word && e.target.word.text != '') {
            SoundManager.Instance.play_ef_word();
            e.target.word.text = '';
            this.wordGroup.getChildAt(e.target.indexFrom).word.visible = true;
            var index = this.answerGroup.getChildIndex(e.target);
            this.answerArr.splice(index, 1);
        }
    };
    /**
     * 判断是否通关
     *
     */
    GameSence.prototype.isClear = function () {
        var answer = this.answerArr.join('');
        if (answer == this.curLevelData.answer) {
            SoundManager.Instance.play_ef_right();
            //解锁记录 存储到本地 将下一个关解锁
            if (this.currentID >= LevelDataManager.Instance.total_level) {
                LevelDataManager.Instance.total_level = this.currentID + 1;
                egret.localStorage.setItem("total_level", "" + LevelDataManager.Instance.total_level);
            }
            //更新按钮状态为unlock //通过id设置(name属性)
            var nextLevel_btn = SenceManager.Instance.levelSence.levelsGroup.getChildByName("" + (this.currentID + 1));
            nextLevel_btn.setUnlocked(true);
            //判断是否需要加载下一组资源 web需要缓存到本地再从本地优先读取
            // LevelDataManager.Instance.loadNextGroup();
            //弹出通关界面
            SenceManager.Instance.popClearSence();
        }
        else {
            SoundManager.Instance.play_ef_wrong();
        }
    };
    /**
     * 重置数据
     */
    GameSence.prototype.resetgameSence = function () {
        //通过levelDataManager获取当前关卡id和数据
        this.currentID = LevelDataManager.Instance.curLevelID;
        this.curLevelData = LevelDataManager.Instance.curLevelData;
        //更新img
        this.img.texture = RES.getRes(this.curLevelData.img);
        console.log(this.curLevelData.img);
        // this.img.source=`resource/assets/data/images/${this.curLevelData.img}`;
        //更新答案框
        for (var i = 0; i < this.answerNum; i++) {
            this.answerGroup.getChildAt(i).word.text = '';
        }
        //更新选项框
        var words = this.generateWords();
        for (var i = 0; i < words.length; i++) {
            this.wordGroup.getChildAt(i).word.text = words[i];
            this.wordGroup.getChildAt(i).word.visible = true;
        }
        //重置存放答案的数组
        this.answerArr = [];
    };
    return GameSence;
}(eui.Component));
__reflect(GameSence.prototype, "GameSence");
