import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/Homepage';
import { NewLeadPopup } from '../../pages/newLeadPopup';
import { ConfigUtility } from '../../utils/configUtility';
import { CsvUtility } from '../../utils/csvUtility';

test('Diagnostic - Open New Lead Popup', async ({ page }) => {

    // Login
    const loginPage = new LoginPage(page);
    const config = ConfigUtility.getConfig('dubai');

    await page.goto(config.baseUrl);

    const user = CsvUtility.getUser(
        'dubai',
        'storehead',
        'StoreHead1'
    );

    await loginPage.login(
        user.username,
        user.password
    );

    await page.waitForTimeout(3000);

    // Navigate to Create Lead
    const homePage = new HomePage(page);
    await homePage.newLeadButton.click();

    await page.waitForTimeout(2000);

    // Verify popup is visible
    const popupVisible = await page.locator('text=New Lead').isVisible();
    expect(popupVisible).toBe(true);
    console.log('✓ New Lead popup opened successfully');

    // Try filling first name
    const newLeadPopup = new NewLeadPopup(page);
    await newLeadPopup.fillFirstName('Test Lead');
    const firstNameValue = await newLeadPopup.firstNameTextbox.inputValue();
    expect(firstNameValue).toBe('Test Lead');
    console.log('✓ First name field works');

    // Try selecting city
    await newLeadPopup.selectCity('Dubai');
    const cityValue = await newLeadPopup.cityDropdown.inputValue();
    expect(cityValue).toBe('Dubai');
    console.log('✓ City dropdown works');

    // Try selecting property type
    await newLeadPopup.selectPropertyType('Residential');
    const propertyValue = await newLeadPopup.propertyTypeDropdown.inputValue();
    expect(propertyValue).toBe('Residential');
    console.log('✓ Property Type dropdown works');

    // Try selecting channel
    await newLeadPopup.selectChannel('Online');
    const channelValue = await newLeadPopup.channelDropdown.inputValue();
    expect(channelValue).toBe('Online');
    console.log('✓ Channel dropdown works');

    // Try selecting lead funnel
    await newLeadPopup.selectLeadFunnel('Website Form');
    const leadFunnelValue = await newLeadPopup.leadFunnelDropdown.inputValue();
    expect(leadFunnelValue).toBe('Website Form');
    console.log('✓ Lead Funnel dropdown works');

    await page.waitForTimeout(3000);

    // Now try to inspect the source dropdown
    const sourceOptions = await newLeadPopup.sourceDropdown.locator('option').allTextContents();
    console.log('Source dropdown options:', sourceOptions);

    if (sourceOptions.length > 1) {
        console.log('✓ Source dropdown has options loaded');
    } else {
        console.log('✗ Source dropdown has NO options!');
        const isDisabled = await newLeadPopup.sourceDropdown.isDisabled();
        console.log('Source dropdown disabled?', isDisabled);
    }
});
