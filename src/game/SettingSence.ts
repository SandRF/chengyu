class SettingSence extends eui.Component {

    public btn_bgm: Btn_default;
    public btn_effect: Btn_default;
    public btn_ok: eui.Button;

    public constructor() {
        super();
        this.skinName = "SettingSenceSkin";
    }

    protected createChildren(): void {
        super.createChildren();
        this.init();
    }

    private init() {
        this.btn_bgm.init(`btn_music_png`);
        this.btn_effect.init(`btn_sound_png`);

        this.btn_bgm.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SoundManager.Instance.play_ef_btnclick();
            SoundManager.Instance.isbgmOn = !SoundManager.Instance.isbgmOn;
            if (SoundManager.Instance.isbgmOn) {
                this.btn_bgm.currentState = 'ON';
            } else {
                this.btn_bgm.currentState = 'OFF';
            }
        }, this);

        this.btn_effect.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {            
            SoundManager.Instance.isEffectOn = !SoundManager.Instance.isEffectOn;
            if (SoundManager.Instance.isEffectOn) {
                this.btn_effect.currentState = 'ON';
            } else {
                this.btn_effect.currentState = 'OFF';
            }
            SoundManager.Instance.play_ef_btnclick();
        }, this);

        this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SoundManager.Instance.play_ef_btnclick();
            SenceManager.Instance.removeSence(SenceManager.Instance.settingSence);
        }, this);
    }
}