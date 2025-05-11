import test, { expect } from "@playwright/test";
import TestHelpers from "../helpers/TestHelpers";
import AdminPage from "../pages/AdminPage";
import { VALID_USERNAME } from "../utils/constants";

const SEARCH_USERNEAME_KEYWORD = 'Admin';
const SEARCH_EMPLOYEENAME_KEYWORD = 'test';

test.describe('Search Tests in Admin Listing page', () => {
    let adminPage: AdminPage

    test.beforeEach(async ({ page }) => {
        const testHelpers = new TestHelpers(page);
        adminPage = new AdminPage(page);
        await testHelpers.loginSuccessfully(VALID_USERNAME, VALID_USERNAME);
        await adminPage.navigateToAdminPage();
    });

    test('SE-01: Search for Username using valid keyword', async () => {
        await adminPage.searchByUserName(SEARCH_USERNEAME_KEYWORD);
        expect(adminPage.getUserNameResult(SEARCH_USERNEAME_KEYWORD)).toBeTruthy();
    });

    test('SE-02: Search for Employee Name using valid keyword', async () => {
        await adminPage.searchByEmployeeName(SEARCH_EMPLOYEENAME_KEYWORD);
        const allSuggestionsContainName = await adminPage.getEmployeeNameSuggestions(SEARCH_EMPLOYEENAME_KEYWORD);
        expect(allSuggestionsContainName).toBeTruthy();
    });

    test('SE-03: Search for no result Username', async () => {
        await adminPage.searchByUserName('nonexistentuser');
        await expect(adminPage.noResultsFoundText).toBeVisible();
    });
});