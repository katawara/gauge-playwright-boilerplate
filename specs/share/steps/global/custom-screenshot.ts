import path from "node:path";
import dayjs from "dayjs";
import { CustomScreenshotWriter } from "gauge-ts";
import { BrowserSession } from "@/share/lib/browser-control";

export default class CustomScreenshot {
    private constructor() {}

    /**
     * Gaugeはデフォルトで画面全体のスクリーンショットを撮ってしまうため、
     * CustomScreenshotWriterで修飾してスクリーンショットにこの関数を使うようにしている。
     * Playwrightのスクリーンショットを撮る方法を使うことで、
     * Playwrightで開いている画面だけのスクリーンショットを撮ることができる。
     * 環境変数のgauge_screenshots_dirで指定されているディレクトリにスクリーンショットを保存する。
     * @returns スクリーンショットのファイル名
     */
    @CustomScreenshotWriter()
    public static async takeCustomScreenshot(): Promise<string> {
        const directory = process.env.gauge_screenshots_dir ?? "";
        const filePath = path.join(
            directory,
            `screenshot-${dayjs().format("YYYY-MM-DD-HH-mm-ss-SSS")}.png`,
        );

        const page = BrowserSession.getPage();
        await page.screenshot({ path: filePath, fullPage: true });

        return path.basename(filePath);
    }
}
