import { Page } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import BasePage from "../pages/basePage";

export default class TestHelpers extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  
  async loginSuccessfully(userName: string, password: string): Promise<boolean> {
    try {
      const loginPage = new LoginPage(this.page);
      await loginPage.navigateToLoginPage();
      await loginPage.login(userName, password);
      await loginPage.verifySuccessfulLogin();
      console.log("Login successful.");
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  }
}