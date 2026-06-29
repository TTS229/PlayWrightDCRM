import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly emailTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.emailTextbox =
            page.getByRole('textbox', { name: 'Email' });

        this.passwordTextbox =
            page.getByRole('textbox', { name: 'Password' });

        this.signInButton =
            page.getByRole('button', { name: 'Sign in' });
    }

    async login(username: string, password: string) {

        await this.emailTextbox.fill(username);

        await this.passwordTextbox.fill(password);

        await this.signInButton.click();
    }
}