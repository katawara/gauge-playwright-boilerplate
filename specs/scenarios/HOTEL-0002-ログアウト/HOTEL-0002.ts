import { Gauge, Step } from "gauge-ts";

export default class HOTEL0002 {
    private constructor() {}

    @Step("[HOTEL-0002] シナリオ固有の処理はこのクラスに実装する")
    public static async sample() {
        Gauge.writeMessage("This is a sample step in HOTEL-0002.");
    }
}
