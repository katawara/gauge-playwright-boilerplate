import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { getScenarioValue, putScenarioValue } from "@/share/lib/data-store";

const SCENARIO_KEY_BROWSER = "SCENARIO_KEY_BROWSER";
const SCENARIO_KEY_CONTEXT = "SCENARIO_KEY_CONTEXT";
const SCENARIO_KEY_PAGE = "SCENARIO_KEY_PAGE";

type OpenBrowserArgs = {
    headless?: boolean;
    timeout?: number;
}

export async function openBrowser(args: OpenBrowserArgs = {}): Promise<void> {
    const browser = await chromium.launch({ headless: args.headless });
    const context = await browser.newContext();
    const page = await context.newPage();
    if (args.timeout) {
        page.setDefaultTimeout(args.timeout);
    }

    putScenarioValue(SCENARIO_KEY_BROWSER, browser);
    putScenarioValue(SCENARIO_KEY_CONTEXT, context);
    putScenarioValue(SCENARIO_KEY_PAGE, page);
}

export async function closeBrowser(): Promise<void> {
    const page = getScenarioValue<Page>(SCENARIO_KEY_PAGE);
    if (page) {
        await page.close();
    }

    const context = getScenarioValue<BrowserContext>(SCENARIO_KEY_CONTEXT);
    if (context) {
        await context.close();
    }

    const browser = getScenarioValue<Browser>(SCENARIO_KEY_BROWSER);
    if (browser) {
        await browser.close();
    }
}

export async function getBrowser(): Promise<Browser> {
    const browser = getScenarioValue<Browser>(SCENARIO_KEY_BROWSER);
    if (!browser) {
        throw new Error("Browser not found. Did you forget to call openBrowser()?");
    }
    return browser;
}

export async function getContext(): Promise<BrowserContext> {
    const context = getScenarioValue<BrowserContext>(SCENARIO_KEY_CONTEXT);
    if (!context) {
        throw new Error("Context not found. Did you forget to call openBrowser()?");
    }
    return context;
}

export async function getPage(): Promise<Page> {
    const page = getScenarioValue<Page>(SCENARIO_KEY_PAGE);
    if (!page) {
        throw new Error("Page not found. Did you forget to call openBrowser()?");
    }
    return page;
}
