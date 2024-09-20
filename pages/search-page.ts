import { expect, type Locator, type Page} from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    readonly searchTxt: Locator;
    readonly searchBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchTxt = page.locator('.search > input');
        this.searchBtn = page.locator('.search > button');
    }

    async searchCity(city: string ) {
        this.searchTxt.fill(city);
        this.searchBtn.click();
    }

    async inputCity(city: string) {
        this.searchTxt.fill(city);
    }

    async assertSearchElementsVisible() {
        expect(this.searchTxt).toBeVisible();
        expect(this.searchBtn).toBeVisible();
    }

    async clearCity() {
        this.searchTxt.fill('');
    }
}

export default SearchPage;