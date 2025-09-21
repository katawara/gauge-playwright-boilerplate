import { expect } from "@playwright/test";
import { Step } from "gauge-ts";
import { BrowserSession } from "@/share/lib/browser-control";

export default class Authentication {
    private constructor() {}

    @Step("[HOTEL] ユーザー <username> のメールアドレスを入力する")
    public static async fillLoginEmail(username: string) {
        const page = BrowserSession.getPage();
        const locator = page.getByRole("textbox", { name: "メールアドレス" });

        const email = process.env[`${username}_email`];
        if (!email) {
            throw new Error(
                `Email for ${username} is not set in environment variables.`,
            );
        }

        await expect(locator).toBeVisible();
        await locator.fill(email);
    }

    @Step("[HOTEL] ユーザー <username> のパスワードを入力する")
    public static async fillLoginPassword(username: string) {
        const page = BrowserSession.getPage();
        const locator = page.getByRole("textbox", { name: "パスワード" });

        const password = process.env[`${username}_password`];
        if (!password) {
            throw new Error(
                `Password for ${username} is not set in environment variables.`,
            );
        }

        await expect(locator).toBeVisible();
        await locator.fill(password);
    }

    @Step("[HOTEL] ログインボタンをクリックする")
    public static async clickLoginButton() {
        const page = BrowserSession.getPage();
        const locator = page.locator("#login-button");

        await expect(locator).toBeVisible();
        await locator.click();
    }

    @Step("[HOTEL] ユーザー <username> でログインする")
    public static async login(username: string) {
        const page = BrowserSession.getPage();
        const loginUrl = `${process.env.site_url}/ja/login.html`;
        if (!loginUrl) {
            throw new Error("Environment variable 'site_url' is not set.");
        }
        await page.goto(loginUrl);

        const email = process.env[`${username}_email`];
        const password = process.env[`${username}_password`];
        if (!email || !password) {
            throw new Error(
                `Credentials for ${username} are not set in environment variables.`,
            );
        }

        const emailTextbox = page.getByRole("textbox", {
            name: "メールアドレス",
        });
        const passwordTextbox = page.getByRole("textbox", {
            name: "パスワード",
        });
        const submitButton = page.locator("#login-button");

        await expect(emailTextbox).toBeVisible();
        await emailTextbox.fill(email);
        await expect(passwordTextbox).toBeVisible();
        await passwordTextbox.fill(password);
        await expect(submitButton).toBeVisible();
        await submitButton.click();

        const myPageHeading = page.getByRole("heading", { name: "マイページ" });
        await expect(myPageHeading).toBeVisible();
    }
}
