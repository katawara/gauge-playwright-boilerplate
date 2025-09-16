import { AfterScenario, BeforeScenario } from "gauge-ts";
import { closeBrowser, openBrowser } from "share/lib/browser-control";

export default class ExecutionHooks {
    @BeforeScenario()
    public static async beforeScenario() {
        await openBrowser();
    }

    @AfterScenario()
    public static async afterScenario() {
        await closeBrowser();
    }
}
