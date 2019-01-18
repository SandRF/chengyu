interface ITEM {
    answer: string,
    img: string,
    word: string,
    tip: string,
    content: string
}

class GameData {

    private static _gameData;
    public static get Instance(): GameData {
        if (!this._gameData) {
            this._gameData = new GameData();
        }
        return this._gameData
    }

    dataArr: ITEM[];

    public getJsonData(url: string) {
        this.dataArr = RES.getRes(url);
    }
}