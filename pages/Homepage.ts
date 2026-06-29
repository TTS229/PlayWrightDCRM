import { Page, Locator } from '@playwright/test';

export class HomePage {

    readonly page: Page;

    // Left Menu
    readonly dashboardLink: Locator;
    readonly leadsLink: Locator;
    readonly opportunitiesLink: Locator;
    readonly contactsLink: Locator;
    readonly teamLink: Locator;
    readonly reportsLink: Locator;
    readonly storePerformanceLink: Locator;
    readonly profileLink: Locator;

    // Header
    readonly searchTextbox: Locator;
    readonly themeToggleButton: Locator;
    readonly notificationButton: Locator;
    readonly aiSidekickButton: Locator;
    readonly newLeadButton: Locator;

    // User Menu
    readonly userMenuButton: Locator;
    readonly myProfileLink: Locator;
    readonly signOutButton: Locator;

    constructor(page: Page) {

        this.page = page;

        // Left Navigation

        this.dashboardLink =
            page.getByRole('link', { name: 'Dashboard' });

        this.leadsLink =
            page.getByRole('link', { name: 'Leads' });

        this.opportunitiesLink =
            page.getByRole('link', { name: 'Opportunities' });

        this.contactsLink =
            page.getByRole('link', { name: 'Contacts' });

        this.teamLink =
            page.getByRole('link', { name: 'Team' });

        this.reportsLink =
            page.getByRole('link', { name: 'Reports' });

        this.storePerformanceLink =
            page.getByRole('link', { name: 'Store Performance' });

        this.profileLink =
            page.getByRole('link', { name: 'Profile' });

        // Header

        this.searchTextbox =
            page.getByRole('textbox', {
                name: 'Search people, leads,'
            });

        this.themeToggleButton =
            page.getByRole('button', {
                name: 'Toggle theme'
            });

        this.notificationButton =
            page.getByRole('button', {
                name: 'Notifications'
            });

        this.aiSidekickButton =
            page.getByRole('button', {
                name: 'Ask AI Sidekick'
            });

        this.newLeadButton =
            page.getByRole('button', {
                name: '+ New Lead'
            });

        // User Menu

        this.userMenuButton =
            page.getByRole('button', {
                name: 'User menu for Store Head'
            });

        this.myProfileLink =
            page.getByRole('link', {
                name: 'My Profile'
            });

        this.signOutButton =
            page.getByRole('button', {
                name: 'Sign Out'
            });
    }

    async logout() {

        await this.userMenuButton.click();

        await this.signOutButton.click();
    }
}