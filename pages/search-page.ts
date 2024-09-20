import { expect, type Locator, type Page} from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    readonly searchTxt: Locator;
    readonly searchBtn: Locator;
    readonly errorMessagePar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchTxt = page.locator('.search > input');
        this.searchBtn = page.locator('.search > button');
        this.errorMessagePar = page.locator('p.error');
    }

    async searchCity(city: string ) {
        await this.searchTxt.fill(city);
        await this.searchBtn.click();
    }

    async inputCity(city: string) {
        await this.searchTxt.fill(city);
    }

    async assertSearchElementsVisible() {
        await expect(this.searchTxt).toBeVisible();
        await expect(this.searchBtn).toBeVisible();
    }

    async clearCity() {
        await this.searchTxt.fill('');
    }

    async clickSearchButton() {
        await this.searchBtn.click();
    }

    async assertNoCityInputError() {
        const noCityInputMsg = /please input a city/;
        await expect(this.errorMessagePar).toHaveText(noCityInputMsg);
    }

    async assertErrorMessageNotVisible() {
        await expect(this.errorMessagePar).not.toBeVisible();
    }

    async assertInvalidCityErrorVisible(city) {
        await expect(this.errorMessagePar).toBeVisible();
        await expect(this.errorMessagePar).toContainText(`Error, ${city} not found`);
    }
}

export default SearchPage;