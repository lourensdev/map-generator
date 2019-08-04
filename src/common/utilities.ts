export default class Utilities {

    public RandomRange(min: number, max: number){
        return Math.floor(Math.random() * (max - min) + min);
    }

    public CoinFlip(odds: number = 50) {
        if(this.RandomRange(0, 10) >= odds / 10) {
            return false;
        } else {
            return true;
        }
    }
    
}