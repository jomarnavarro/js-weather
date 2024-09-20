import { expect, Locator, Page } from '@playwright/test';
import { notDeepEqual } from 'assert';
require('dotenv').config();


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
    readonly apiKey: string;
    readonly apiUrl: string;

    constructor(page: Page) {
        this.page = page;
        this.weatherIcon = page.locator('.weather-icon');
        this.tempHdr = page.locator('.temp');
        this.cityHdr = page.locator('h2.city');
        this.humidityImg = page.locator('img.humidity');
        this.humidityPar = page.locator('p.humidity');
        this.humidityLbl = page.locator('p.humidity + p');
        this.windImg = page.locator('img.wind');
        this.windPar = page.locator('p.wind');
        this.windLbl = page.locator('p.wind + p');
        this.apiKey = process.env.API_KEY;
        this.apiUrl = process.env.API_URL;

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

    async assertWeatherInformationUpdated(city) {
        const response = await fetch(this.apiUrl + `&q=${city}&appid=${this.apiKey}`);
        var data = await response.json();
        expect(this.tempHdr).toHaveText(`${Math.round(data.main.temp)} *C`);
        expect(this.cityHdr).toHaveText(data.name);
        expect(this.humidityPar).toHaveText(`${data.main.humidity}%`);
        expect(this.windPar).toHaveText(`${data.wind.speed} km/h`);
        expect(this.weatherIcon).toHaveAttribute('src', `images/${data.weather[0].main.toLowerCase()}.png`);
    }
}

export default WeatherPage;