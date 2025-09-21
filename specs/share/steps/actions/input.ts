import { expect } from "@playwright/test";
import { Step } from "gauge-ts";
import { BrowserSession } from "@/share/lib/browser-control";

export default class Input {
    private constructor() {}

    @Step("テキストボックス <name> に <value> を入力する")
    public static async fillTextbox(name: string, value: string) {
        const page = BrowserSession.getPage();
        const locator = page.getByRole("textbox", { name });

        await expect(locator).toBeVisible();
        await locator.fill(value);
    }
}
