import { Page } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import BasePage from "../pages/basePage";

export default class TestHelpers extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async loginSuccessfully(page: Page, userName: string, password: string) {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(userName, password);
  }
}