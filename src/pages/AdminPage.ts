import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";
import { ADMIN_LIST_URL } from "../utils/constants";


export default class AdminPage extends BasePage {
    userNameSearchTextBox: Locator;
    employeeNameTextBox: Locator;
    noResultsFoundText: Locator;    
    constructor(page: Page) {
        super(page);
        this.userNameSearchTextBox = this.page.locator('xpath=//label[contains(text(), "Username")]/parent::div/following-sibling::div//input');
        this.employeeNameTextBox = this.page.locator('xpath=//label[contains(text(), "Employee Name")]/parent::div/following-sibling::div//input');
        this.noResultsFoundText = this.page.locator('span').filter({ hasText: 'No Records Found' });
    }

    async navigateToAdminPage() {
        await this.goto(ADMIN_LIST_URL, { waitUntil: 'load' });
    }

    async searchByUserName(userName: string) {
        await this.userNameSearchTextBox.fill(userName);
        await this.clickAndWaitForPageLoaded(this.searchButton);
    }

    async getUserNameResult(userName: string) {
        const userNameResult = this.page.getByText(userName, { exact: true });
        return userNameResult;
    }

    async searchByEmployeeName(employeeName: string) {
        await this.employeeNameTextBox.fill(employeeName);
    }

    async getEmployeeNameSuggestions(employeeName: string): Promise<boolean> {
        const employeeNameSuggestions = this.page.locator('//div[@role="listbox"]/div/span');
        const suggestions = await employeeNameSuggestions.allTextContents();
        return suggestions.every((suggestion) => suggestion.includes(employeeName));
    }
}
