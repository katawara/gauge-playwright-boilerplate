import { expect } from "@playwright/test";
import { Step } from "gauge-ts";
import { BrowserSession } from "@/share/lib/browser-control";

export default class Button {
    private constructor() {}

    @Step("ボタン <name> をクリックする")
    public static async clickButton(name: string) {
        const page = BrowserSession.getPage();
        const locator = page.getByRole("button", { name });

        await expect(locator).toBeVisible();
        await locator.click();
    }
}
