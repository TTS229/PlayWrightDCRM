import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/Homepage';
import { NewLeadPopup } from '../../pages/newLeadPopup';
import { ConfigUtility } from '../../utils/configUtility';
import { CsvUtility } from '../../utils/csvUtility';
import { DataGenerator } from '../../utils/data-generator';
import { LANGUAGE_COMBINATIONS } from '../../test-data/masterData/languagePreferrence';
import { CycleUtility } from '../../utils/cycleUtility';

test('Create Lead with Mandatory Fields', async ({ page }) => {

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

    // Create Lead with Mandatory Fields
    const newLeadPopup = new NewLeadPopup(page);
    const leadData = DataGenerator.generateLeadData('dubai');

    console.log('Generated Mandatory Lead Data:', leadData);

    // Fill first name, phone, city, property type first
    await newLeadPopup.fillFirstName(leadData.firstName);
    await newLeadPopup.selectPhoneCountryCode(leadData.countryCode);
    await newLeadPopup.fillPhone(leadData.phone);
    await newLeadPopup.selectCity(leadData.city);
    await newLeadPopup.selectPropertyType(leadData.propertyType);

    await page.waitForTimeout(2000);

    // Log channel options
    const channelOptions = await page.locator('select').nth(5).locator('option').allTextContents();
    console.log('Channel options:', channelOptions);

    await newLeadPopup.selectChannel(leadData.channel);
    
    await page.waitForTimeout(1500);

    // Log lead funnel options
    const leadFunnelOptions = await page.locator('select').nth(6).locator('option').allTextContents();
    console.log('Lead Funnel options:', leadFunnelOptions);

    await newLeadPopup.selectLeadFunnel(leadData.leadFunnel);

    await page.waitForTimeout(2000);

    // Log source options BEFORE trying to select
    const sourceOptions = await page.locator('select').nth(7).locator('option').allTextContents();
    console.log('Source options available:', sourceOptions);
    console.log('Trying to select source:', leadData.source);

    await newLeadPopup.selectSource(leadData.source);

    await page.waitForTimeout(2000);

    const campaignSourceOptions = await page.locator('select').nth(8).locator('option').allTextContents();
    console.log('Campaign Source options available:', campaignSourceOptions);

    await newLeadPopup.selectCampaignSource(leadData.campaignSource);

    await page.waitForTimeout(1500);

    const leadSourceOptions = await page.locator('select').nth(9).locator('option').allTextContents();
    console.log('Lead Source options available:', leadSourceOptions);

    await newLeadPopup.selectLeadSource(leadData.leadSource);

    await newLeadPopup.clickCreate();

    await page.waitForTimeout(5000);

    // Verify success (popup should close)
    const isPopupClosed = await page
        .locator('text=New Lead')
        .isVisible()
        .then(visible => !visible)
        .catch(() => true);

    expect(isPopupClosed).toBe(true);

    console.log('✓ Lead created successfully with mandatory fields');
});

test('Create Lead with Mandatory Fields + Email', async ({ page }) => {

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

    // Create Lead with Mandatory Fields + Email
    const newLeadPopup = new NewLeadPopup(page);
    const leadData = DataGenerator.generateLeadData('dubai');
    
    // Add optional email field
    leadData.email = 'customlead@exm.com';

    console.log('Generated Lead Data with Email:', leadData);

    // Optionally fill email before creating lead
    await newLeadPopup.fillEmail(leadData.email);

    // Now fill mandatory fields and create
    await newLeadPopup.createLeadWithMandatoryFields(leadData);

    await page.waitForTimeout(5000);

    // Verify success
    const isPopupClosed = await page
        .locator('text=New Lead')
        .isVisible()
        .then(visible => !visible)
        .catch(() => true);

    expect(isPopupClosed).toBe(true);

    console.log('✓ Lead created successfully with mandatory fields + email');
});

test('Create Lead with Mandatory Fields + Language Preference', async ({ page }) => {

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

    // Create Lead with Mandatory Fields + Language Preference
    const newLeadPopup = new NewLeadPopup(page);
    const leadData = DataGenerator.generateLeadData('dubai');
    
    // Add optional language preferences
    const languages = CycleUtility.next('testLanguages', LANGUAGE_COMBINATIONS);
    leadData.languages = languages;

    console.log('Generated Lead Data with Languages:', leadData);

    // Select languages before creating lead
    await newLeadPopup.selectLanguages(leadData.languages);

    // Now fill mandatory fields and create
    await newLeadPopup.createLeadWithMandatoryFields(leadData);

    await page.waitForTimeout(5000);

    // Verify success
    const isPopupClosed = await page
        .locator('text=New Lead')
        .isVisible()
        .then(visible => !visible)
        .catch(() => true);

    expect(isPopupClosed).toBe(true);

    console.log('✓ Lead created successfully with mandatory fields + language preferences');
});

test('Create Lead with All Optional Fields', async ({ page }) => {

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

    // Create Lead with All Optional Fields
    const newLeadPopup = new NewLeadPopup(page);
    const leadData = DataGenerator.generateLeadData('dubai');
    
    // Add optional fields
    leadData.middleName = 'Q';
    leadData.lastName = 'Lead';
    leadData.email = 'completelead@exm.com';
    leadData.budget = '250K-500K AED';
    leadData.configuration = '3 BHK';
    leadData.description = 'Complete lead with all fields';
    const languages = CycleUtility.next('testLanguagesAll', LANGUAGE_COMBINATIONS);
    leadData.languages = languages;

    console.log('Generated Lead Data with All Fields:', leadData);

    // Fill optional fields before creating lead
    await newLeadPopup.fillMiddleName(leadData.middleName);
    await newLeadPopup.fillLastName(leadData.lastName);
    await newLeadPopup.fillEmail(leadData.email);
    await newLeadPopup.selectBudget(leadData.budget);
    await newLeadPopup.selectConfiguration(leadData.configuration);
    await newLeadPopup.fillDescription(leadData.description);
    await newLeadPopup.selectLanguages(leadData.languages);

    // Now fill mandatory fields and create
    await newLeadPopup.createLeadWithMandatoryFields(leadData);

    await page.waitForTimeout(5000);

    // Verify success
    const isPopupClosed = await page
        .locator('text=New Lead')
        .isVisible()
        .then(visible => !visible)
        .catch(() => true);

    expect(isPopupClosed).toBe(true);

    console.log('✓ Lead created successfully with all optional fields');
});
