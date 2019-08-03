export default class Utilities {
    public RandomRange(min: number, max: number){
        return Math.floor(Math.random() * (max - min) + min);
    }
}