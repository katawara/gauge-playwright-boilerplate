import { expect } from "@playwright/test";
import { Step } from "gauge-ts";
import { BrowserSession } from "@/share/lib/browser-control";

export default class Text {
    private constructor() {}

    @Step("⭐: テキスト <text> が表示されていること")
    public static async assertTextVisible(text: string) {
        const page = BrowserSession.getPage();
        const locator = page.getByText(text).first();
        await expect(locator).toBeVisible();
    }

    @Step("⭐: テキスト <heading> が見出しとして表示されていること")
    public static async assertHeadingTextVisible(heading: string) {
        const page = BrowserSession.getPage();
        const locator = page.getByRole("heading", { name: heading });
        await expect(locator).toBeVisible();
    }
}
