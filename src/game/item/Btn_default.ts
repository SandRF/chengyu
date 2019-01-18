class Btn_default extends eui.Component {

    public img: eui.Image;

    public constructor() {
        super();
    }

    protected createChildren() {
        super.createChildren();
    }

    public init(url: string) {
        this.img.texture = RES.getRes(url);
    }
}

window['Btn_default'] = Btn_default;