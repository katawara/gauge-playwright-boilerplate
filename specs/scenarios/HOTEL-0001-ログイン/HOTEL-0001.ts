import { Gauge, Step } from "gauge-ts";

export default class HOTEL0001 {
    private constructor() {}

    @Step("[HOTEL-0001] シナリオ固有の処理はこのクラスに実装する")
    public static async sample() {
        Gauge.writeMessage("This is a sample step in HOTEL-0001.");
    }
}
