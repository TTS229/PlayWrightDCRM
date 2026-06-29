import { Page, Locator } from '@playwright/test';

export class DashboardPage {

    readonly page: Page;

    // Navigation

    readonly dashboardLink: Locator;

    // Dashboard Header

    readonly dashboardHeading: Locator;

    // Control Center Tabs

    readonly controlCenterButton: Locator;
    readonly reportsButton: Locator;
    readonly missedRecoveryButton: Locator;
    readonly teamTargetsButton: Locator;

    // KPI Cards

    readonly meetingDoneCard: Locator;
    readonly orderBookedCard: Locator;
    readonly orderValueCard: Locator;

    // Meeting Filters

    readonly overdueButton: Locator;
    readonly todayButton: Locator;
    readonly tomorrowButton: Locator;
    readonly upcomingMeetingsButton: Locator;

    // Meeting Actions

    readonly followUpMissedRecord: Locator;
    readonly addNoteButton: Locator;
    readonly noteTextbox: Locator;
    readonly markDoneButton: Locator;

    // Quick View

    readonly quickViewHeading: Locator;
    readonly closePanelButton: Locator;

    constructor(page: Page) {

        this.page = page;

        // Navigation

        this.dashboardLink =
            page.getByRole('link', {
                name: 'Dashboard'
            });

        // Dashboard Header

        this.dashboardHeading =
            page.getByRole('heading', {
                name: 'Dashboard'
            });

        // Control Center

        this.controlCenterButton =
            page.getByRole('button', {
                name: 'Control Center'
            });

        this.reportsButton =
            page.getByRole('button', {
                name: 'Reports'
            });

        this.missedRecoveryButton =
            page.getByRole('button', {
                name: 'Missed Recovery'
            });

        this.teamTargetsButton =
            page.getByRole('button', {
                name: 'Team Targets'
            });

        // KPI Cards

        this.meetingDoneCard =
            page.getByText(
                'Meeting Done0/ 20Monthly'
            );

        this.orderBookedCard =
            page.getByText(
                'Order Booked0/ 5Monthly'
            );

        this.orderValueCard =
            page.locator('div')
                .filter({
                    hasText:
                        /^Order ValueAED 0\/ AED 10M$/
                })
                .first();

        // Meeting Filters

        this.overdueButton =
            page.getByRole('button', {
                name: 'Overdue'
            });

        this.todayButton =
            page.getByRole('button', {
                name: 'Today'
            });

        this.tomorrowButton =
            page.getByRole('button', {
                name: 'Tomorrow'
            });

        this.upcomingMeetingsButton =
            page.getByRole('button', {
                name: 'Upcoming Meetings'
            });

        // Follow-up Section

        this.followUpMissedRecord =
            page.getByRole('button', {
                name:
                    'Call Follow-up missed — CRM test 61'
            });

        this.addNoteButton =
            page.getByRole('button', {
                name: 'Add note'
            }).first();

        this.noteTextbox =
            page.getByRole('textbox', {
                name: 'Type your note here...'
            });

        this.markDoneButton =
            page.getByRole('button', {
                name: 'Mark Done'
            }).first();

        // Quick View

        this.quickViewHeading =
            page.getByRole('heading', {
                name: 'Quick View'
            });

        this.closePanelButton =
            page.getByRole('button', {
                name: 'Close panel'
            });
    }

    async openDashboard() {

        await this.dashboardLink.click();
    }

    async openReports() {

        await this.reportsButton.click();
    }

    async openMissedRecovery() {

        await this.missedRecoveryButton.click();
    }

    async openTeamTargets() {

        await this.teamTargetsButton.click();
    }

    async openUpcomingMeetings() {

        await this.upcomingMeetingsButton.click();
    }

    async markFollowUpDone() {

        await this.addNoteButton.click();

        await this.noteTextbox.fill(
            'Follow-up completed'
        );

        await this.markDoneButton.click();
    }

    async closeQuickView() {

        await this.closePanelButton.click();
    }
}