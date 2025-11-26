export default class Utils {
    public static pause(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public static getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}