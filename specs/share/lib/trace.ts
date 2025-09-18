import * as path from "node:path";
import type { BrowserContext } from "@playwright/test";
import { type ExecutionContext, Gauge } from "gauge-ts";

async function saveTrace(
    browserContext: BrowserContext,
    executionContext: ExecutionContext,
): Promise<void> {
    const fileName = executionContext
        .getCurrentScenario()
        .getName()
        .replace(/\s+/g, "-");
    const filePath = path.join(
        "reports",
        "playwright-report",
        "traces",
        `${fileName}.zip`,
    );

    await browserContext.tracing.stop({ path: filePath });

    Gauge.writeMessage(
        `Trace has been saved. To inspect, run:\n&nbsp;&nbsp;&gt;&nbsp;pnpm show-trace &quot;${filePath}&quot;&nbsp;`,
    );
}

async function discardTrace(browserContext: BrowserContext): Promise<void> {
    // ファイルパスを指定しないで保存することでトレースを破棄する
    await browserContext.tracing.stop();
}

export async function recordTrace(
    browserContext: BrowserContext,
    executionContext: ExecutionContext,
): Promise<void> {
    const recordTrace = process.env.record_trace;
    const isScenarioFailed = executionContext
        .getCurrentScenario()
        .getIsFailing();

    // 設定なし、もしくはoffの場合は何もしない
    if (!recordTrace || recordTrace === "off") {
        await discardTrace(browserContext);
        return;
    }

    // onの場合は常にトレースを保存
    if (recordTrace === "on") {
        await saveTrace(browserContext, executionContext);
        return;
    }

    // retain-on-failureの場合は、シナリオが失敗した場合のみトレースを保存
    if (recordTrace === "retain-on-failure") {
        if (isScenarioFailed) {
            await saveTrace(browserContext, executionContext);
        } else {
            await discardTrace(browserContext);
        }
        return;
    }

    // その他の値の場合はエラーを投げる
    throw new Error(
        `Invalid value for recordTrace: ${recordTrace}. Valid values are 'on', 'off', 'retain-on-failure'.`,
    );
}
