class Item_Word extends eui.Component {

    public word: eui.Label;

    public constructor() {
        super();
        this.skinName = "Item_WordSkin";
    }

    protected createChildren() {
        super.createChildren();
        this.touchChildren = false;
        this.touchEnabled = true;
    }

    
}

window['Item_Word'] = Item_Word;