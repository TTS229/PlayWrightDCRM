import { Page, Locator } from '@playwright/test';

export class NewLeadPopup {

    readonly page: Page;

    // Personal Information

    readonly firstNameTextbox: Locator;
    readonly middleNameTextbox: Locator;
    readonly lastNameTextbox: Locator;

    readonly phoneTextbox: Locator;
    readonly emailTextbox: Locator;
    readonly phoneCountryCodeSelect: Locator;

    // Lead Information

    readonly cityDropdown: Locator;
    readonly propertyTypeDropdown: Locator;
    readonly budgetDropdown: Locator;
    readonly configurationDropdown: Locator;

    readonly descriptionTextbox: Locator;

    // Language Preference

    readonly englishButton: Locator;
    readonly hindiButton: Locator;
    readonly tamilButton: Locator;
    readonly teluguButton: Locator;
    readonly kannadaButton: Locator;
    readonly malayalamButton: Locator;
    readonly marathiButton: Locator;
    readonly bengaliButton: Locator;
    readonly gujaratiButton: Locator;
    readonly punjabiButton: Locator;
    readonly arabicButton: Locator;
    readonly otherButton: Locator;

    // Pre Sales Owner

    readonly preSalesOwnerDropdown: Locator;

    // Attribution

    readonly channelDropdown: Locator;
    readonly leadFunnelDropdown: Locator;
    readonly sourceDropdown: Locator;
    readonly campaignSourceDropdown: Locator;
    readonly leadSourceDropdown: Locator;

    // Actions

    readonly createLeadButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {

        this.page = page;

        // Personal Information

        this.firstNameTextbox =
            page.getByPlaceholder('e.g. Raj');

        this.middleNameTextbox =
            page.locator('input[type="text"]').nth(1);

        this.lastNameTextbox =
            page.getByPlaceholder('e.g. Mehta');

        this.phoneCountryCodeSelect =
            page.locator('select').first();

        this.phoneTextbox =
            page.locator('input[type="tel"]');

        this.emailTextbox =
            page.getByPlaceholder('raj@example.com');

        // Lead Information

        this.cityDropdown =
            page.locator('select').nth(1);

        this.propertyTypeDropdown =
            page.locator('select').nth(2);

        this.budgetDropdown =
            page.locator('select').nth(3);

        this.configurationDropdown =
            page.locator('select').nth(4);

        this.descriptionTextbox =
            page.locator('textarea');

        // Language Preference

        this.englishButton =
            page.getByRole('button', { name: 'English' });

        this.hindiButton =
            page.getByRole('button', { name: 'Hindi' });

        this.tamilButton =
            page.getByRole('button', { name: 'Tamil' });

        this.teluguButton =
            page.getByRole('button', { name: 'Telugu' });

        this.kannadaButton =
            page.getByRole('button', { name: 'Kannada' });

        this.malayalamButton =
            page.getByRole('button', { name: 'Malayalam' });

        this.marathiButton =
            page.getByRole('button', { name: 'Marathi' });

        this.bengaliButton =
            page.getByRole('button', { name: 'Bengali' });

        this.gujaratiButton =
            page.getByRole('button', { name: 'Gujarati' });

        this.punjabiButton =
            page.getByRole('button', { name: 'Punjabi' });

        this.arabicButton =
            page.getByRole('button', { name: 'Arabic' });

        this.otherButton =
            page.getByRole('button', { name: 'Other' });

        // Pre Sales Owner

        this.preSalesOwnerDropdown =
            page.locator('button:has-text("Auto-assign via Round Robin")');

        // Attribution

        this.channelDropdown =
            page.locator('select').nth(5);

        this.leadFunnelDropdown =
            page.locator('select').nth(6);

        this.sourceDropdown =
            page.locator('select').nth(7);

        this.campaignSourceDropdown =
            page.locator('select').nth(8);

        this.leadSourceDropdown =
            page.locator('select').nth(9);

        // Actions

        this.createLeadButton =
            page.getByRole('button', {
                name: 'Create Lead'
            });

        this.cancelButton =
            page.getByRole('button', {
                name: 'Cancel'
            });
    }

    // Personal Information

    async fillFirstName(
        firstName: string
    ) {

        await this.firstNameTextbox.fill(
            firstName
        );
    }

    async fillMiddleName(
        middleName: string
    ) {

        await this.middleNameTextbox.fill(
            middleName
        );
    }

    async fillLastName(
        lastName: string
    ) {

        await this.lastNameTextbox.fill(
            lastName
        );
    }

    async fillPhone(
        phone: string
    ) {

        await this.phoneTextbox.fill(
            phone
        );
    }

    async selectPhoneCountryCode(
        countryCode: string
    ) {

        await this.phoneCountryCodeSelect.selectOption(
            countryCode
        );
    }

    async fillEmail(
        email: string
    ) {

        await this.emailTextbox.fill(
            email
        );
    }

    // Lead Information

    async selectCity(
        city: string
    ) {

        await this.cityDropdown.selectOption(
            city
        );
    }

    async selectPropertyType(
        propertyType: string
    ) {

        await this.propertyTypeDropdown.selectOption(
            propertyType
        );
    }

    async selectBudget(
        budget: string
    ) {

        await this.budgetDropdown.selectOption(
            budget
        );
    }

    async selectConfiguration(
        configuration: string
    ) {

        await this.configurationDropdown.selectOption(
            configuration
        );
    }

    async fillDescription(
        description: string
    ) {

        await this.descriptionTextbox.fill(
            description
        );
    }

    // Language Preference

    async selectLanguages(
        languages: string[]
    ) {

        for (const language of languages) {

            await this.page
                .getByRole('button', {
                    name: language
                })
                .click();
        }
    }

    // Pre Sales Owner

    async assignPreSalesOwner(
        ownerName: string
    ) {

        await this.preSalesOwnerDropdown.click();

        await this.page
            .getByText(ownerName)
            .click();
    }

    // Attribution

    async selectChannel(
        channel: string
    ) {

        await this.channelDropdown.selectOption(
            channel
        );
    }

    async selectLeadFunnel(
        leadFunnel: string
    ) {

        await this.leadFunnelDropdown.selectOption(
            leadFunnel
        );
        
        // Give backend time to load source options
        await this.page.waitForTimeout(2000);
    }

    async selectSource(
        source?: string
    ) {

        // Wait with retries for options to load
        let options: string[] = [];
        for (let i = 0; i < 30; i++) {
            options = await this.sourceDropdown.locator('option').allTextContents();
            // Filter out empty/placeholder options
            const realOptions = options.filter(o => o.trim() && o.toLowerCase() !== 'select source...');
            if (realOptions.length > 0) break;
            await this.page.waitForTimeout(500);
        }
        
        // If source specified, try to match it
        if (source) {
            const allOptions = await this.sourceDropdown.locator('option').allTextContents();
            const match = allOptions.find(o => o.includes(source));
            if (match) {
                await this.sourceDropdown.selectOption(match);
                return;
            }
        }
        
        // Otherwise, just select the first non-placeholder option
        const availableOptions = options.filter(o => o.trim() && o.toLowerCase() !== 'select source...');
        if (availableOptions.length > 0) {
            await this.sourceDropdown.selectOption(availableOptions[0]);
        }
    }

    async selectCampaignSource(
        campaignSource?: string
    ) {

        // Wait with retries for options to load
        let options: string[] = [];
        for (let i = 0; i < 30; i++) {
            options = await this.campaignSourceDropdown.locator('option').allTextContents();
            const realOptions = options.filter(o => o.trim() && o.toLowerCase() !== 'select campaign source...');
            if (realOptions.length > 0) break;
            await this.page.waitForTimeout(500);
        }
        
        // If campaignSource specified, try to match it
        if (campaignSource) {
            const allOptions = await this.campaignSourceDropdown.locator('option').allTextContents();
            const match = allOptions.find(o => o.includes(campaignSource));
            if (match) {
                await this.campaignSourceDropdown.selectOption(match);
                return;
            }
        }
        
        // Otherwise, just select the first non-placeholder option
        const availableOptions = options.filter(o => o.trim() && o.toLowerCase() !== 'select campaign source...');
        if (availableOptions.length > 0) {
            await this.campaignSourceDropdown.selectOption(availableOptions[0]);
        }
    }

    async selectLeadSource(
        leadSource?: string
    ) {

        // Wait with retries for options to load
        let options: string[] = [];
        for (let i = 0; i < 30; i++) {
            options = await this.leadSourceDropdown.locator('option').allTextContents();
            const realOptions = options.filter(o => o.trim() && o.toLowerCase() !== 'select lead source...');
            if (realOptions.length > 0) break;
            await this.page.waitForTimeout(500);
        }
        
        // If leadSource specified, try to match it
        if (leadSource) {
            const allOptions = await this.leadSourceDropdown.locator('option').allTextContents();
            const match = allOptions.find(o => o.includes(leadSource));
            if (match) {
                await this.leadSourceDropdown.selectOption(match);
                return;
            }
        }
        
        // Otherwise, just select the first non-placeholder option
        const availableOptions = options.filter(o => o.trim() && o.toLowerCase() !== 'select lead source...');
        if (availableOptions.length > 0) {
            await this.leadSourceDropdown.selectOption(availableOptions[0]);
        }
    }

    // Actions

    async clickCreate() {

        await this.createLeadButton.click();
    }

    async clickCancel() {

        await this.cancelButton.click();
    }

    // Business Logic

    async createLeadWithMandatoryFields(
        leadData: any
    ) {

        // Personal Information - Mandatory
        await this.fillFirstName(
            leadData.firstName
        );

        await this.selectPhoneCountryCode(
            leadData.countryCode
        );

        await this.fillPhone(
            leadData.phone
        );

        // Lead Information - Mandatory
        await this.selectCity(
            leadData.city
        );

        await this.selectPropertyType(
            leadData.propertyType
        );

        // Add extra wait for form to settle
        await this.page.waitForTimeout(1000);

        // Attribution - Mandatory
        await this.selectChannel(
            leadData.channel
        );

        await this.page.waitForTimeout(1000);

        await this.selectLeadFunnel(
            leadData.leadFunnel
        );

        // Give backend time to load dependent dropdowns
        await this.page.waitForTimeout(3000);

        await this.selectSource(
            leadData.source
        );

        await this.page.waitForTimeout(2000);

        await this.selectCampaignSource(
            leadData.campaignSource
        );

        await this.page.waitForTimeout(2000);

        await this.selectLeadSource(
            leadData.leadSource
        );

        // Submit
        await this.clickCreate();
    }
}