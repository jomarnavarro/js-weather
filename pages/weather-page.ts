import { expect, Locator, Page } from '@playwright/test';
import { notDeepEqual } from 'assert';

export class WeatherPage {
    readonly page: Page;
    readonly weatherIcon: Locator;
    readonly tempHdr: Locator;
    readonly cityHdr: Locator;
    readonly humidityImg: Locator;
    readonly humidityPar: Locator;
    readonly humidityLbl: Locator;
    readonly windImg: Locator;
    readonly windPar: Locator;
    readonly windLbl: Locator;

    constructor(page: Page) {
        this.page = page;
        this.weatherIcon = page.locator('.weather-icon');
        this.tempHdr = page.locator('.temp');
        this.cityHdr = page.locator('h2.city');
        this.humidityImg = page.locator('img.humidity');
        this.humidityPar = page.locator('p.humidity');
        this.humidityLbl = page.locator('p.humidity + p');
        this.windImg = page.locator('img.humidity');
        this.windPar = page.locator('p.humidity');
        this.windLbl = page.locator('p.humidity + p');
    }

    async assertWeatherElementsVisible() {
        await expect(this.weatherIcon).toBeVisible();
        await expect(this.tempHdr).toBeVisible();
        await expect(this.cityHdr).toBeVisible();
        await expect(this.humidityImg).toBeVisible();
        await expect(this.humidityPar).toBeVisible();
        await expect(this.humidityLbl).toBeVisible();
        await expect(this.windImg).toBeVisible();
        await expect(this.windPar).toBeVisible();
        await expect(this.windLbl).toBeVisible();
    }

    async assertWeatherElementsNotVisible() {
        await expect(this.weatherIcon).not.toBeVisible();
        await expect(this.tempHdr).not.toBeVisible();
        await expect(this.cityHdr).not.toBeVisible();
        await expect(this.humidityImg).not.toBeVisible();
        await expect(this.humidityPar).not.toBeVisible();
        await expect(this.humidityLbl).not.toBeVisible();
        await expect(this.windImg).not.toBeVisible();
        await expect(this.windPar).not.toBeVisible();
        await expect(this.windLbl).not.toBeVisible();
    }
}

export default WeatherPage;