var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        this.isbgmComplete = false;
        this.isef_rightComplete = false;
        this.isef_wrongComplete = false;
        this.isef_btnclickComplete = false;
        this.isef_wordComplete = false;
        console.log("SoundManager\u7684\u6784\u9020\u51FD\u6570");
        this.startLoad();
    }
    Object.defineProperty(SoundManager, "Instance", {
        get: function () {
            if (!SoundManager._manager) {
                SoundManager._manager = new SoundManager();
            }
            return SoundManager._manager;
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.prototype.startLoad = function () {
        this.bgm = new egret.Sound();
        this.bgm = RES.getRes("Music_mp3");
        if (this.bgm != undefined) {
            this.isbgmComplete = true;
        }
        // this.bgm.load("resource/assets/data/sound/Music.mp3");
        // this.bgm.addEventListener(egret.Event.COMPLETE, () => {
        //     console.log(`音乐文件加载完成`);
        //     this.isbgmComplete = true;
        // }, this);
        this.ef_right = new egret.Sound();
        this.ef_right = RES.getRes("right_mp3");
        if (this.ef_right != undefined) {
            this.isef_rightComplete = true;
        }
        // this.ef_right.load("resource/assets/data/sound/right.mp3");
        // this.ef_right.addEventListener(egret.Event.COMPLETE, () => {
        //     console.log(`音乐文件加载完成`);
        //     this.isef_rightComplete = true;
        // }, this);
        this.ef_wrong = new egret.Sound();
        this.ef_wrong = RES.getRes("wrong_mp3");
        if (this.ef_word != undefined) {
            this.isef_wrongComplete = true;
        }
        // this.ef_wrong.load("resource/assets/data/sound/wrong.mp3");        
        // this.ef_wrong.addEventListener(egret.Event.COMPLETE, () => {
        //     console.log(`音乐文件加载完成`);
        //     this.isef_wrongComplete = true;
        // }, this);
        this.ef_btnclick = new egret.Sound();
        this.ef_btnclick = RES.getRes("buttonclick_mp3");
        if (this.ef_btnclick != undefined) {
            this.isef_btnclickComplete = true;
        }
        // this.ef_btnclick.load("resource/assets/data/sound/buttonclick.mp3");
        // this.ef_btnclick.addEventListener(egret.Event.COMPLETE, () => {
        //     console.log(`音乐文件加载完成`);
        //     this.isef_btnclickComplete = true;
        // }, this)
        this.ef_word = new egret.Sound();
        this.ef_word = RES.getRes("type_word_mp3");
        if (this.ef_word != undefined) {
            this.isef_wordComplete = true;
        }
        // this.ef_word.load("resource/assets/data/sound/type_word.mp3");
        // this.ef_word.addEventListener(egret.Event.COMPLETE, () => {
        //     console.log(`音乐文件加载完成`);
        //     this.isef_wordComplete = true;
        // }, this);
    };
    /**开启bgm */
    SoundManager.prototype.playbgm = function () {
        if (this.isbgmComplete && this.isbgmOn && this.bgm_channel == null) {
            this.bgm_channel = this.bgm.play(0, 0);
        }
    };
    /**关闭bgm */
    SoundManager.prototype.stopbgm = function () {
        if (this.bgm_channel) {
            this.bgm_channel.stop();
            this.bgm_channel = null;
        }
    };
    Object.defineProperty(SoundManager.prototype, "isbgmOn", {
        /**读取bgm本地配置 */
        get: function () {
            var ret = egret.localStorage.getItem('isbgmOn');
            if (ret == 'true' || !ret) {
                this._isbgmOn = true;
            }
            else {
                this._isbgmOn = false;
            }
            return this._isbgmOn;
        },
        /**存储bgm本地配置 */
        set: function (bool) {
            this._isbgmOn = bool;
            egret.localStorage.setItem('isbgmOn', "" + bool);
            if (bool) {
                this.playbgm();
            }
            else {
                this.stopbgm();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**播放音效-正确 */
    SoundManager.prototype.play_ef_right = function () {
        if (this.isef_rightComplete && this.isEffectOn) {
            this.ef_right.play(0, 1);
        }
    };
    /**播放音效-错误 */
    SoundManager.prototype.play_ef_wrong = function () {
        if (this.isef_wrongComplete && this.isEffectOn) {
            this.ef_wrong.play(0, 1);
        }
    };
    /**播放音效-按钮点击 */
    SoundManager.prototype.play_ef_btnclick = function () {
        if (this.isef_btnclickComplete && this.isEffectOn) {
            this.ef_btnclick.play(0, 1);
        }
    };
    /**播放音效-点击字 */
    SoundManager.prototype.play_ef_word = function () {
        if (this.isef_wordComplete && this.isEffectOn) {
            this.ef_word.play(0, 1);
        }
    };
    Object.defineProperty(SoundManager.prototype, "isEffectOn", {
        /**读取音效本地配置 */
        get: function () {
            var ret = egret.localStorage.getItem('isEffectOn');
            if (ret == 'true' || !ret) {
                this._isEffectOn = true;
            }
            else {
                this._isEffectOn = false;
            }
            return this._isEffectOn;
        },
        /**存储音效本地配置 */
        set: function (bool) {
            this._isEffectOn = bool;
            egret.localStorage.setItem('isEffectOn', "" + bool);
        },
        enumerable: true,
        configurable: true
    });
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
