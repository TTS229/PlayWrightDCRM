import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/Homepage';
import { ConfigUtility } from '../../utils/configUtility';
import { CsvUtility } from '../../utils/csvUtility';

test('CRM Login Test', async ({ page }) => {

    const loginPage = new LoginPage(page);
    console.log('ConfigUtility = ', ConfigUtility);
    const config =
    ConfigUtility.getConfig('dubai');

    await page.goto(
    config.baseUrl
);
const user =
   CsvUtility.getUser(
        'dubai',
        'storehead',
        'StoreHead1'
    );

    await loginPage.login(
    user.username,
    user.password
    );
    await page.waitForTimeout(5000);
    const homePage = new HomePage(page);
    await homePage.logout();
});
    