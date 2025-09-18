import { Step } from "gauge-ts";
import { BrowserSession } from "@/share/lib/browser-control";

export default class Browse {
    private constructor() {}

    @Step("URL <url> にアクセスする")
    public static async gotoUrl(url: string) {
        const page = BrowserSession.getPage();
        await page.goto(url);
    }

    @Step("URLパス <path> にアクセスする")
    public static async gotoPath(path: string) {
        // パスは必ず '/' で始まる必要がある
        if (!path.startsWith("/")) {
            throw new Error(`Path must start with '/': ${path}`);
        }

        const page = BrowserSession.getPage();
        const currentUrl = new URL(page.url());
        await page.goto(`${currentUrl.origin}${path}`);
    }

    @Step("ページをリロードする")
    public static async refresh() {
        const page = BrowserSession.getPage();
        await page.reload();
    }

    @Step("前のページに戻る")
    public static async goBack() {
        const page = BrowserSession.getPage();
        await page.goBack();
    }
}
