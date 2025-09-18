import path from "node:path";
import type { Page } from "@playwright/test";
import { type ExecutionContext, Gauge } from "gauge-ts";

async function saveVideo(
    page: Page,
    executionContext: ExecutionContext,
): Promise<void> {
    const fileName = executionContext
        .getCurrentScenario()
        .getName()
        .replace(/\s+/g, "-");
    const filePath = path.join(
        "reports",
        "playwright-report",
        "videos",
        `${fileName}.webm`,
    );

    await page.video().saveAs(filePath);
    // もともと作られていたランダムな文字列の名前の動画ファイルは削除しておく
    await page.video().delete();

    Gauge.writeMessage(
        `Video has been saved. To inspect, run:\n&nbsp;&nbsp;&gt;&nbsp;open &quot;${filePath}&quot;&nbsp;`,
    );
}

async function discardVideo(page: Page): Promise<void> {
    await page.video().delete();
}

export async function recordVideo(
    page: Page,
    executionContext: ExecutionContext,
): Promise<void> {
    const recordVideo = process.env.record_video;
    const isScenarioFailed = executionContext
        .getCurrentScenario()
        .getIsFailing();

    // 設定なし、もしくはoffの場合は何もしない
    if (!recordVideo || recordVideo === "off") {
        await discardVideo(page);
        return;
    }

    // onの場合は常に動画を保存
    if (recordVideo === "on") {
        await saveVideo(page, executionContext);
        return;
    }

    // retain-on-failureの場合は、シナリオが失敗した場合のみ動画を保存
    if (recordVideo === "retain-on-failure") {
        if (isScenarioFailed) {
            await saveVideo(page, executionContext);
        } else {
            await discardVideo(page);
        }
        return;
    }

    // その他の値の場合はエラーを投げる
    throw new Error(
        `Invalid value for recordVideo: ${recordVideo}. Valid values are 'on', 'off', 'retain-on-failure'.`,
    );
}
