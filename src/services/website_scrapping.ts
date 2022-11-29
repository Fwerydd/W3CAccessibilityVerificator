import { Builder, Browser, By, WebElement } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { WCAGContrastInput } from '../models/wcag/contrast_input';



export class WebsiteScrapping {
    public static async scrapTexts(websiteUrl: string, webdriverUrl: string): Promise<WCAGContrastInput[]> {
        const textsCharacteristics: WCAGContrastInput[] = [];

        const driver = await new Builder().forBrowser(Browser.CHROME).usingServer(webdriverUrl).setChromeOptions(new chrome.Options().headless()).build();
        try {
            await driver.get(websiteUrl);

            const elementsWithText = await driver.findElements(By.xpath('//*[text() != ""]'));
            for (const elementWithText of elementsWithText) {
                const text = (await elementWithText.getText()).trim();
                if (text) {
                    textsCharacteristics.push({
                        textBackgroundColor: await elementWithText.getCssValue('background-color'),
                        textColor: await elementWithText.getCssValue('color'),
                        textSize: parseInt(await elementWithText.getCssValue('font-size'), 10),
                        textBold: parseInt(await elementWithText.getCssValue('font-weight'), 10) >= 700,
                    });
                }
            }
        } finally {
            await driver.quit();
        }

        return textsCharacteristics;
    }
}