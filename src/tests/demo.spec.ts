import test, { expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import { VALID_PASSWORD, VALID_USERNAME } from "../utils/constants";
import path from "path";
import { decorateAllureTestReport } from '../utils/utils';

const currentFolder = path.basename(__dirname);
const currentFile = path.basename(__filename);

test('Demo Test script', async ({ page }) => {
    await decorateAllureTestReport(currentFolder, currentFile);
    const loginPage = new LoginPage(page);
    const adminPage = new AdminPage(page);

    await test.step('Step 1: Go to OrangeHRM page', async () => {
        await loginPage.navigateToLoginPage();
    });

    await test.step('Step 2: Login with valid credentials', async () => {
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
        await loginPage.verifySuccessfulLogin();
    });
    
    await test.step('Step 3: Navigate to Admin page', async () => {
        await adminPage.navigateToAdminPage();
    });

    await test.step('Step 4: Search for a user', async () => {
        await adminPage.searchByUserName('Admin');
        const result = await adminPage.getUserNameResult('Admin');
        expect(result).toBeTruthy();
    });
});