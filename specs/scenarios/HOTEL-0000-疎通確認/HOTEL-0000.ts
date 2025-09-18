import { Gauge, Step } from "gauge-ts";

export default class HOTEL0000 {
    private constructor() {}

    @Step("[HOTEL-0000] シナリオ固有の処理はこのクラスに実装する")
    public static async sample() {
        Gauge.writeMessage("This is a sample step in HOTEL-0000.");
    }
}
