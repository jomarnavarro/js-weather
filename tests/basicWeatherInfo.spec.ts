import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search-page';
import { WeatherPage } from '../pages/weather-page';

import path from 'path';
import { describe } from 'node:test';

let searchPage: SearchPage;
let weatherPage: WeatherPage;
const filePath = path.join(__dirname, '/../index.html');

test.beforeEach(async ({ page }) => {
    await page.goto('file://' + filePath);
    searchPage = new SearchPage(page);
    weatherPage = new WeatherPage(page);
})

test.describe( 'Basic Weather Info Displayed. ', () => {
    test('Only Search elements displayed when search field is empty', async ( {page} ) => {
        await searchPage.assertSearchElementsVisible();
        await weatherPage.assertWeatherElementsNotVisible();
    });

    test('Only Search elements displayed when search field is input', async ( {page} ) => {
        await searchPage.assertSearchElementsVisible();
        await searchPage.inputCity('Boston');
        await weatherPage.assertWeatherElementsNotVisible();
    });

    test('Weather information elements displayed when searching', async ( {page} ) => {
        await page.goto('file://' + filePath);
        await searchPage.assertSearchElementsVisible();
        await searchPage.searchCity('Boston');
        await weatherPage.assertWeatherElementsVisible();
    });

    test('Only Search elements displayed when search field is cleared', async ( {page} ) => {
        await searchPage.assertSearchElementsVisible();
        await weatherPage.assertWeatherElementsNotVisible();
        await searchPage.searchCity('Boston');
        await weatherPage.assertWeatherElementsVisible();
        await searchPage.clearCity();
        await weatherPage.assertWeatherElementsNotVisible();
    });
})

