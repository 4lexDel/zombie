export default class Utils {
    public static pause(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}