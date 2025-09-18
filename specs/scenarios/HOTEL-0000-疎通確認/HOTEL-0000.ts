import { expect } from "@playwright/test";
import { Gauge, Step } from "gauge-ts";
import { BroserSession } from "@/share/lib/browser-control";

export default class HOTEL0000 {
    private constructor() {}

    @Step("[HOTEL-0000] 特になし")
    public static async doNothing() {
        Gauge.writeMessage("Do nothing");
    }

    @Step("[HOTEL-0000] URL <url> にアクセスする")
    public static async gotoLoginPage(url: string) {
        const page = BroserSession.getPage();
        await page.goto(url);
    }

    @Step("[HOTEL-0000] テキスト <text> が表示されていること")
    public static async checkDisplay(text: string) {
        const page = BroserSession.getPage();
        const locator = page.getByText(text).first();
        await expect(locator).toBeVisible();
    }
}
