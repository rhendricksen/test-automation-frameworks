import { browser, ElementFinder, ExpectedConditions } from 'protractor' ;

export class Wait {

  static async untilElementIsPresent(element: ElementFinder, waitTime = 5000): Promise<void> {
    await browser.wait(ExpectedConditions.presenceOf(element), waitTime, `${element.locator()} is not present within ${waitTime} milliseconds`);

  }

  static async untilElementIsVisible(element: ElementFinder, waitTime = 5000): Promise<void> {
    await browser.wait(ExpectedConditions.visibilityOf(element), waitTime, `${element.locator()} is not visible within ${waitTime} milliseconds`);

  }
}
