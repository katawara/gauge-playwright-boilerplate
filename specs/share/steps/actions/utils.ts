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
        const randomText = Generator.generateUniqueString({ prefix });
        DataStore.putSpecValue(key, randomText);
    }

    @Step(
        "Specの値 <key> にサフィックス <suffix> 付きのランダムな文字列を設定する",
    )
    public static async putSpecValueWithRandomTextWithSuffix(
        key: string,
        suffix: string,
    ) {
        const randomText = Generator.generateUniqueString({ suffix });
        DataStore.putSpecValue(key, randomText);
    }

    @Step(
        "Specの値 <key> にプレフィックス <prefix> とサフィックス <suffix> 付きのランダムな文字列を設定する",
    )
    public static async putSpecValueWithRandomTextWithAffix(
        key: string,
        prefix: string,
        suffix: string,
    ) {
        const randomText = Generator.generateUniqueString({ prefix, suffix });
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
        const randomText = Generator.generateUniqueString({ prefix });
        DataStore.putScenarioValue(key, randomText);
    }

    @Step(
        "シナリオの値 <key> にサフィックス <suffix> 付きのランダムな文字列を設定する",
    )
    public static async putScenarioValueWithRandomTextWithSuffix(
        key: string,
        suffix: string,
    ) {
        const randomText = Generator.generateUniqueString({ suffix });
        DataStore.putScenarioValue(key, randomText);
    }

    @Step(
        "シナリオの値 <key> にプレフィックス <prefix> とサフィックス <suffix> 付きのランダムな文字列を設定する",
    )
    public static async putScenarioValueWithRandomTextWithAffix(
        key: string,
        prefix: string,
        suffix: string,
    ) {
        const randomText = Generator.generateUniqueString({ prefix, suffix });
        DataStore.putScenarioValue(key, randomText);
    }
}
