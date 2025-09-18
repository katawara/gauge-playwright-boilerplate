import { Gauge, Step } from "gauge-ts";
import { DataStore } from "@/share/lib/data-store";
import { Generator } from "@/share/lib/generator";

export default class Utils {
    private constructor() {}

    @Step("特になし")
    public static async doNothing() {
        // 何もしない
    }

    @Step("🕒 TODO: <comment>")
    public static async todo(comment: string) {
        Gauge.writeMessage(`TODO: ${comment} &nbsp;`);
    }

    @Step("📝 NOTE: <comment>")
    public static async note(comment: string) {
        Gauge.writeMessage(`NOTE: ${comment} &nbsp;`);
    }

    @Step("Specの値 <key> にランダムな文字列を設定する")
    public static async putSpecValueWithRandomText(key: string) {
        const randomText = Generator.generateUniqueString();
        DataStore.putSpecValue(key, randomText);
    }

    @Step(
        "Specの値 <key> にプレフィックス <prefix> 付きのランダムな文字列を設定する",
    )
    public static async putSpecValueWithRandomTextWithPrefix(
        key: string,
        prefix: string,
    ) {
        const randomText = await Generator.generateUniqueString(prefix);
        DataStore.putSpecValue(key, randomText);
    }

    @Step("シナリオの値 <key> にランダムな文字列を設定する")
    public static async putScenarioValueWithRandomText(key: string) {
        const randomText = Generator.generateUniqueString();
        DataStore.putScenarioValue(key, randomText);
    }

    @Step(
        "シナリオの値 <key> にプレフィックス <prefix> 付きのランダムな文字列を設定する",
    )
    public static async putScenarioValueWithRandomTextWithPrefix(
        key: string,
        prefix: string,
    ) {
        const randomText = await Generator.generateUniqueString(prefix);
        DataStore.putScenarioValue(key, randomText);
    }
}
