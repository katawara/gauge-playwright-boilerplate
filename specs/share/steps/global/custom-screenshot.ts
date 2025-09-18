import * as path from "node:path";
import { CustomScreenshotWriter } from "gauge-ts";
import { BroserSession } from "@/share/lib/browser-control";

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
        const dir = process.env.gauge_screenshots_dir ?? "";
        const filePath = path.join(dir, `screenshot-${Date.now()}.png`);

        const page = BroserSession.getPage();
        await page.screenshot({ path: filePath, fullPage: true });

        return path.basename(filePath);
    }
}
