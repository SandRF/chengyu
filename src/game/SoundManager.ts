class SoundManager {

    //TODO 需要把音乐缓存到本地

    private static _manager: SoundManager;
    public static get Instance() {
        if (!SoundManager._manager) {
            SoundManager._manager = new SoundManager();
        }
        return SoundManager._manager;
    }

    //音乐的对象以及加载的状态 开关设置

    private bgm: egret.Sound;
    private bgm_channel: egret.SoundChannel;
    private isbgmComplete: boolean = false;
    private _isbgmOn: boolean;

    private ef_right: egret.Sound;
    private ef_rightchannel: egret.SoundChannel;
    private isef_rightComplete: boolean = false;

    private ef_wrong: egret.Sound;
    private ef_wrongchannel: egret.SoundChannel;
    private isef_wrongComplete: boolean = false;

    private ef_btnclick: egret.Sound;
    private ef_btnclickchannel: egret.SoundChannel;
    private isef_btnclickComplete: boolean = false;

    private ef_word: egret.Sound;
    private ef_wordchannel: egret.SoundChannel;
    private isef_wordComplete: boolean = false;

    private _isEffectOn: boolean;



    public constructor() {
        console.log(`SoundManager的构造函数`)
        this.startLoad();

    }

    private startLoad() {
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
    }

    /**开启bgm */
    public playbgm() {
        if (this.isbgmComplete && this.isbgmOn && this.bgm_channel == null) {
            this.bgm_channel = this.bgm.play(0, 0);
        }
    }
    /**关闭bgm */
    public stopbgm() {
        if (this.bgm_channel) {
            this.bgm_channel.stop();
            this.bgm_channel = null;
        }
    }
    /**读取bgm本地配置 */
    public get isbgmOn() {
        let ret = egret.localStorage.getItem('isbgmOn');
        if (ret == 'true' || !ret) {
            this._isbgmOn = true;
        } else {
            this._isbgmOn = false;
        }
        return this._isbgmOn
    }
    /**存储bgm本地配置 */
    public set isbgmOn(bool: boolean) {
        this._isbgmOn = bool;
        egret.localStorage.setItem('isbgmOn', `${bool}`);
        if (bool) {
            this.playbgm();
        } else {
            this.stopbgm();
        }
    }



    /**播放音效-正确 */
    public play_ef_right() {
        if (this.isef_rightComplete && this.isEffectOn) {
            this.ef_right.play(0, 1);
        }
    }

    /**播放音效-错误 */
    public play_ef_wrong() {
        if (this.isef_wrongComplete && this.isEffectOn) {
            this.ef_wrong.play(0, 1);
        }
    }

    /**播放音效-按钮点击 */
    public play_ef_btnclick() {
        if (this.isef_btnclickComplete && this.isEffectOn) {
            this.ef_btnclick.play(0, 1);
        }
    }

    /**播放音效-点击字 */
    public play_ef_word() {
        if (this.isef_wordComplete && this.isEffectOn) {
            this.ef_word.play(0, 1);
        }
    }

    /**读取音效本地配置 */
    public get isEffectOn() {
        let ret = egret.localStorage.getItem('isEffectOn');
        if (ret == 'true' || !ret) {
            this._isEffectOn = true;
        } else {
            this._isEffectOn = false;
        }
        return this._isEffectOn
    }
    /**存储音效本地配置 */
    public set isEffectOn(bool: boolean) {
        this._isEffectOn = bool;
        egret.localStorage.setItem('isEffectOn', `${bool}`);
    }
}

