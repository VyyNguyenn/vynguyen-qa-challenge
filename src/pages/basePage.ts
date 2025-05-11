import { Locator, Page } from '@playwright/test';

export default class BasePage {
  protected page: Page;
  profileButton: Locator;
  dashboardHeader: Locator;
  logoutButton: Locator;
  searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = this.page.locator('span.oxd-userdropdown-tab');
    this.dashboardHeader = this.page.getByRole('heading', { name: 'Dashboard' });
    this.logoutButton = this.page.getByRole('menuitem', { name: 'Logout' });
    this.searchButton = this.page.getByRole('button', { name: 'Search' });
  }

  async goto(url: string, p0: { waitUntil: string; }) {
    await this.ensurePageOpen();
    await this.page.goto(url, { waitUntil: 'load' });
  }

  async logout() {
    await this.profileButton.click();
    await this.logoutButton.click();
  }

  async clickAndWaitForPageLoaded(locator: Locator) {
    await locator.click();
    await this.page.waitForLoadState('load');
  }

  async ensurePageOpen() {
    try {
        // Check if the page is closed
        if (this.page.isClosed()) {
            console.warn('Page is closed. Creating a new page...');
            this.page = await this.page.context().newPage();
        }
    } catch (error) {
        console.error('Error ensuring page is open:', error);

        // Handle case where the browser context is closed
        if (this.page.context().browser()?.isConnected() === false) {
            console.warn('Browser is disconnected. Reconnecting...');
            const browser = await this.page.context().browser()?.newContext();
            const newPage = await browser?.newPage();
            if (!newPage) {
                throw new Error('Failed to create a new page. Browser might be closed.');
            }
            this.page = newPage;
        } else {
            throw new Error('Failed to ensure page is open. Browser context may be closed.');
        }
    }
  }
}
