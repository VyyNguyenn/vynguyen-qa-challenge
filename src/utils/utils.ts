import { allure } from "allure-playwright";

export async function decorateAllureTestReport(projectName: string, title: string) {
    await allure.parentSuite(projectName);
    await allure.suite(title);
}
