import {
    type Browser,
    type BrowserContext,
    chromium,
    type Page,
} from "@playwright/test";
import type { ExecutionContext } from "gauge-ts";
import { DataStore } from "@/share/lib/data-store";
import { recordTrace } from "@/share/lib/trace";
import { recordVideo } from "@/share/lib/video";

const SCENARIO_KEY_BROWSER = "SCENARIO_KEY_BROWSER";
const SCENARIO_KEY_CONTEXT = "SCENARIO_KEY_CONTEXT";
const SCENARIO_KEY_PAGE = "SCENARIO_KEY_PAGE";

type OpenBrowserArgs = {
    headless?: boolean;
    timeout?: number;
};

async function openBrowser(args: OpenBrowserArgs = {}): Promise<void> {
    const browser = await chromium.launch({ headless: args.headless });

    const context = await browser.newContext({
        ignoreHTTPSErrors: true,
        recordVideo: { dir: "reports/playwright-report/videos/" },
    });
    await context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true,
    });

    const page = await context.newPage();
    if (args.timeout) {
        page.setDefaultTimeout(args.timeout);
    }

    DataStore.putSensitiveScenarioValue(SCENARIO_KEY_BROWSER, browser);
    DataStore.putSensitiveScenarioValue(SCENARIO_KEY_CONTEXT, context);
    DataStore.putSensitiveScenarioValue(SCENARIO_KEY_PAGE, page);
}

async function closeBrowser(executionContext: ExecutionContext): Promise<void> {
    const page = DataStore.getScenarioValue<Page>(SCENARIO_KEY_PAGE);
    if (page) {
        await page.close();
        // 動画はページを閉じた後に保存しないと、操作が終わらなくなってしまう
        await recordVideo(page, executionContext);
    }

    const context =
        DataStore.getScenarioValue<BrowserContext>(SCENARIO_KEY_CONTEXT);
    if (context) {
        await recordTrace(context, executionContext);
        await context.close();
    }

    const browser = DataStore.getScenarioValue<Browser>(SCENARIO_KEY_BROWSER);
    if (browser) {
        await browser.close();
    }
}

export const BrowserControl = {
    openBrowser,
    closeBrowser,
};

function getBrowser(): Browser {
    const browser = DataStore.getScenarioValue<Browser>(SCENARIO_KEY_BROWSER);
    if (!browser) {
        throw new Error(
            "Browser not found. Did you forget to call openBrowser()?",
        );
    }
    return browser;
}

function getContext(): BrowserContext {
    const context =
        DataStore.getScenarioValue<BrowserContext>(SCENARIO_KEY_CONTEXT);
    if (!context) {
        throw new Error(
            "Context not found. Did you forget to call openBrowser()?",
        );
    }
    return context;
}

function getPage(): Page {
    const page = DataStore.getScenarioValue<Page>(SCENARIO_KEY_PAGE);
    if (!page) {
        throw new Error(
            "Page not found. Did you forget to call openBrowser()?",
        );
    }
    return page;
}

export const BroserSession = {
    getBrowser,
    getContext,
    getPage,
};
