import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search-page';
import { WeatherPage } from '../pages/weather-page';
import path from 'path';
let searchPage: SearchPage;
let weatherPage: WeatherPage;
const filePath = path.join(__dirname, './../index.html');

test.beforeEach(async ({ page }) => {
    await page.goto('file://' + filePath);
    searchPage = new SearchPage(page);
    weatherPage = new WeatherPage(page);
})

test.describe('Search city weather scenarios', async () => {

    test('Search without city name shows input error', async () => {
        await searchPage.clickSearchButton();
        await searchPage.assertNoCityInputError();
    });

    test('Search valid Valid city shows no error message',async () => {
        await searchPage.searchCity('Boston');
        await searchPage.assertErrorMessageNotVisible();

    });
    
    test('Weather information is updated once user inputs correct city', async () => {
        await searchPage.searchCity('Boston');
        await searchPage.assertErrorMessageNotVisible();
        await weatherPage.assertWeatherElementsVisible();
        await weatherPage.assertWeatherInformationUpdated('Boston');
    });

    test('Error Message visible whenever an invalid city is input', async () => {
        await searchPage.searchCity('Bo');
        await searchPage.assertInvalidCityErrorVisible('Bo');
        await weatherPage.assertWeatherElementsNotVisible();
    })
})