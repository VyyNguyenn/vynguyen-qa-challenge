import { expect, Locator, Page } from '@playwright/test';
import BasePage from './basePage';
import { BASE_URL, DASHBOARD_URL_REGEX } from '../utils/constants';


export default class LoginPage extends BasePage {
    userNameField: Locator;
    userNameError: Locator;
    passwordError: Locator;
    passwordField: Locator;
    loginButton: Locator;
    loginError: Locator;

    constructor(page: Page) {
        super(page);
        this.userNameField = this.page.locator('input[name="username"]');
        this.userNameError = this.page.getByText('Required').first();
        this.passwordError = this.page.getByText('Required').nth(1);
        this.passwordField = this.page.locator('input[name="password"]');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.loginError = this.page.getByText('Invalid credentials');
    }

    async navigateToLoginPage() {
    await this.page.goto(BASE_URL, { waitUntil: 'load' });
    }

    async clearUserNameField() {
        await this.userNameField.clear();
    }

    async clearPasswordField() {
        await this.passwordField.clear();
    }

    async clickLoginButton() {
        await this.clickAndWaitForPageLoaded(this.loginButton);
    }

    async enterUserName(userName: string) {
        await this.clearUserNameField();
        await this.userNameField.fill(userName);
    }

    async enterPassword(password: string) {
        await this.clearPasswordField();
        await this.passwordField.fill(password);
    }

    async login(userName: string, password: string) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickAndWaitForPageLoaded(this.loginButton);
    }

    async verifySuccessfulLogin() {
        await expect(this.page).toHaveURL(DASHBOARD_URL_REGEX);
        await expect(this.profileButton).toBeVisible();
        await expect(this.dashboardHeader).toBeVisible();
    }
}