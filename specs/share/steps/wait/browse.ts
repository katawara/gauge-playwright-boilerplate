import { Step } from "gauge-ts";
import { BrowserSession } from "@/share/lib/browser-control";

export default class Browse {
    private constructor() {}

    /**
     * 指定した秒数だけ待機する。
     *
     * Note:
     * 現在はDiscouraged（非推奨）扱い。
     * テストの安定性を優先するなら使わないほうが望ましい。
     * Playwrightはたいていの場合は自動で待機してくれる。
     * 明示的な待機が必要な場合は、まず要素の状態を待つ方法を検討すること。
     * @param seconds 秒数（文字列）
     * @see https://playwright.dev/docs/api/class-page#page-wait-for-timeout
     */
    @Step("<seconds> 秒待つ")
    public static async waitForTimeout(seconds: string) {
        const page = BrowserSession.getPage();
        await page.waitForTimeout(Number(seconds) * 1000);
    }
}
