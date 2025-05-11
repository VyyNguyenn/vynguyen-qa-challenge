import test, { expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { VALID_PASSWORD } from "../utils/constants";


const INVALID_PASSWORD = 'admin123wrong';
const USERNAMES = ['Admin','admin', 'ADMIN', 'adMin'];
const INVALID_USERNAMES = 'nonexistuser';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
    });

    test('LOG-01: Username and Password fields are mandatory', async () => {
        await loginPage.clearUserNameField();
        await loginPage.clearPasswordField();
        await loginPage.clickLoginButton();
        await expect(loginPage.userNameError).toBeVisible();
        await expect(loginPage.passwordError).toBeVisible();
    });

    test('LOG-02: Login with valid credentials, case-insensitive user name', async () => {
        for (const username of USERNAMES) {
            await loginPage.login(username, VALID_PASSWORD);
            await loginPage.verifySuccessfulLogin();
            await loginPage.logout(); 
        }
    });

    test('LOG-03: Login with valid username and incorrect password', async () => {
        await loginPage.login('Admin', INVALID_PASSWORD);
        await expect(loginPage.loginError).toBeVisible();
    });

    test('LOG-04: Login with non-existent username and any password', async () => {
        await loginPage.login(INVALID_USERNAMES, VALID_PASSWORD);
        await expect(loginPage.loginError).toBeVisible();
    });

    test('LOG-05: XSS and SQL Injection attacks', async () => {
        const maliciousPayloads = [
            { username: "<script>alert('XSS')</script>", password: 'admin123' },
            { username: 'Admin', password: "<script>alert('XSS')</script>" },
            { username: "' OR '1'='1", password: 'admin123' },
            { username: 'Admin', password: "' OR '1'='1" },
            { username: "' OR '1'='1", password: "' OR '1'='1" }
        ];
        for (const payload of maliciousPayloads) {
            await loginPage.login(payload.username, payload.password);
            expect(loginPage.loginError).toBeVisible();
        }
    });

})