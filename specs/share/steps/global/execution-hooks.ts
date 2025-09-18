import { AfterScenario, BeforeScenario, type ExecutionContext } from "gauge-ts";
import { closeBrowser, openBrowser } from "@/share/lib/browser-control";

export default class ExecutionHooks {
    private constructor() {}

    @BeforeScenario()
    public static async beforeScenario() {
        const headless = process.env.headless === "true";
        const timeout = process.env.timeout
            ? Number(process.env.timeout)
            : undefined;

        await openBrowser({ headless, timeout });
    }

    @AfterScenario()
    public static async afterScenario(executionContext: ExecutionContext) {
        await closeBrowser(executionContext);
    }
}
