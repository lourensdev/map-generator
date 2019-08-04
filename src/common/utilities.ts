/**
 * Common code utilities to randomise values
 *
 * @export
 * @class Utilities
 */
export default class Utilities {

    /**
     * Returns a random number between a maximum and minimum value given
     *
     * @param {number} min
     * @param {number} max
     * @returns A random number
     * @memberof Utilities
     */
    public RandomRange(min: number, max: number){
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Simulates a coin flip, with added odds
     *
     * @param {number} [odds=50]
     * @returns Returns a boolean to indicate if it should, or should not happen
     * @memberof Utilities
     */
    public CoinFlip(odds: number = 50) {
        if(this.RandomRange(0, 10) >= odds / 10) {
            return false;
        } else {
            return true;
        }
    }
    
}