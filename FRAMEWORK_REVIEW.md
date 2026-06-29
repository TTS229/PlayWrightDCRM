# Playwright Framework Review

## Scope

This review analyzes the current Playwright framework in this workspace without changing existing implementation files. It covers architecture, folder structure, Page Object Model usage, fixtures, utilities, helpers, test organization, configuration, coding standards, reporting, and data strategy.

## Executive Summary

The framework is an early-stage TypeScript Playwright setup focused on CRM workflows. It already has a useful separation between tests, page objects, environment configuration, user credentials, generated lead data, and master data. The strongest parts are the start of a Page Object Model, centralized config and CSV utilities, and a clear CRM test folder.

The main gaps are around framework maturity: there are no implemented fixtures, no base page or shared workflow layer, repeated login and navigation setup in tests, many fixed waits, fragile indexed selectors in the lead popup, limited assertions, no API or state setup strategy, and only default HTML reporting. Several reusable ideas already exist in the codebase, but they are not yet consistently extracted into common framework capabilities.

## Project Architecture

Current architecture:

- `playwright.config.ts` controls Playwright execution.
- `tests/` contains executable specs.
- `pages/` contains page object classes.
- `utils/` contains configuration, CSV, data generation, and cycling helpers.
- `test-data/` contains user CSV data and TypeScript master data constants.
- `config/` contains environment-specific JSON files.
- `playwright-report/` and `test-results/` contain generated execution artifacts.
- `run-test.js` is a custom headed runner for one CRM spec.

The architecture is simple and understandable. It is close to Playwright's generated baseline, with custom CRM automation pieces added around it.

The framework does not yet have a dedicated layer for:

- typed custom fixtures
- authenticated session reuse
- base page behavior
- shared business workflows
- common assertions
- reusable wait strategies
- test tagging/smoke/regression grouping
- environment selection through CLI or environment variables
- centralized reporting options beyond Playwright HTML

## Folder Structure

Current structure:

```text
config/
fixtures/
pages/
playwright-report/
test-data/
test-results/
tests/
utils/
package.json
playwright.config.ts
run-test.js
tsconfig.json
```

### Strengths

- The top-level folders are easy to understand.
- CRM test files are grouped under `tests/CRM`.
- Environment JSON files are separated under `config`.
- Reusable constants are separated under `test-data/masterData`.
- Page objects are separated from tests.

### Weaknesses

- `fixtures/` exists but is empty, so the framework does not currently use Playwright's fixture extension model.
- `tests/example.spec.ts` is still the default Playwright example and does not belong to the CRM framework.
- Generated folders such as `playwright-report/` and `test-results/` exist in the workspace; they should generally stay ignored and treated as artifacts.
- There is no dedicated folder for shared workflows, assertions, constants, types, or base classes.
- Page object filenames and class names are inconsistent in casing, for example `Homepage.ts` with `HomePage`, and `newLeadPopup.ts` with `NewLeadPopup`.

## Page Object Model Implementation

Page objects currently exist for:

- `LoginPage`
- `HomePage`
- `DashboardPage`
- `NewLeadPopup`

### What Works Well

- Page classes receive Playwright's `Page` object through constructors.
- Locators are stored as readonly class members.
- Many locators use Playwright's recommended user-facing locators, especially `getByRole`.
- Page objects expose action methods such as `login`, `logout`, `openDashboard`, `selectCity`, `fillPhone`, and `clickCreate`.
- `NewLeadPopup` contains a useful higher-level method, `createLeadWithMandatoryFields`, which is a first step toward workflow reuse.

### Issues and Risks

- There is no base page class for shared behavior such as navigation, visibility checks, modal handling, dropdown handling, waiting for page readiness, or logging.
- Some page objects expose locators directly and tests interact with those locators instead of going through page methods. Example: tests click `homePage.newLeadButton` directly.
- `NewLeadPopup` relies heavily on positional selectors such as `page.locator('select').nth(5)`. These are fragile because any added select field can break the mapping.
- `DashboardPage` contains hard-coded dynamic text such as `Call Follow-up missed ... CRM test 61`, which makes it data-dependent and brittle.
- `NewLeadPopup` contains repeated dropdown-waiting logic in `selectSource`, `selectCampaignSource`, and `selectLeadSource`.
- Several methods use fixed sleeps through `waitForTimeout`, which can make tests slow and flaky.
- Page object methods do not consistently assert postconditions. For example, `login` clicks Sign in but does not wait for a logged-in state.
- Page objects use `any` for lead data, so invalid or incomplete data is not caught at compile time.

## Fixtures

The `fixtures/` folder is currently empty.

This is one of the largest missing framework pieces. The tests manually repeat setup that fixtures would normally own:

- loading environment configuration
- loading user credentials
- opening the base URL
- constructing page objects
- logging in as a role
- navigating to common CRM screens
- creating test data

The absence of custom fixtures makes tests longer, more repetitive, and more likely to drift in setup behavior.

## Utilities

Current utilities:

- `ConfigUtility`
- `CsvUtility`
- `DataGenerator`
- `CycleUtility`
- `leadData.ts` is present but empty.

### ConfigUtility

`ConfigUtility.getConfig(environment)` reads `config/{environment}.json` and parses it.

Strengths:

- Centralizes environment config lookup.
- Keeps base URLs out of tests.

Gaps:

- No validation for missing files or malformed JSON.
- No typed return model.
- Environment is hard-coded in tests instead of selected from CLI or environment variables.
- No default environment handling.

### CsvUtility

`CsvUtility.getUser(environment, role, userId)` reads `test-data/users.csv` and returns a matching user.

Strengths:

- Centralizes credential lookup.
- Supports environment, role, and user ID filtering.
- Throws an error if no user is found.

Gaps:

- Returns `any`.
- Does not trim CSV values, even though some CSV usernames contain trailing spaces.
- Does not validate required columns.
- Reads and parses the CSV file on every call instead of caching parsed records.
- Stores passwords in a committed CSV file, which is risky for real projects.

### DataGenerator

`DataGenerator.generateLeadData(environment)` creates lead data using a static counter, random phone number, and cyclical master data.

Strengths:

- Provides reusable generated data instead of hard-coding every lead.
- Uses master data arrays for cities, property types, and lead funnels.
- Produces varied values through `CycleUtility`.

Gaps:

- `environment === 'dubai' ? DUBAI_CITIES : DUBAI_CITIES` always returns Dubai cities, so staging cities are not actually used.
- Generated attribution values do not use the richer `ATTRIBUTIONS` master data file.
- Random phone generation may produce duplicates across runs.
- The static counter resets per worker/process, which can collide in parallel execution.
- The returned object is untyped and then dynamically extended in tests.

### CycleUtility

`CycleUtility.next(key, values)` cycles through an array by key.

Strengths:

- Simple, reusable way to spread test data over multiple values.
- Useful for avoiding the same value in every test.

Gaps:

- No guard for empty arrays.
- Static counters are process-local and not safe for cross-worker uniqueness.
- There is no reset method for deterministic unit-style testing.

## Common Helpers

Current common helpers are limited to config loading, CSV loading, data generation, and cycling.

Missing common helper areas:

- login/session helper
- navigation helper
- dropdown helper for dependent select options
- modal helper
- toast/notification assertion helper
- retry-until-option-present helper
- test data builder for leads
- date/time helper
- screenshot/attachment helper
- API helper for setup/cleanup if CRM APIs are available
- environment resolver
- credential resolver
- common assertion helper
- network wait helper

The repeated dependent dropdown logic in `NewLeadPopup` is a strong candidate for a shared helper because three methods already implement almost the same behavior.

## Test Organization

Current tests:

- `tests/example.spec.ts`
- `tests/CRM/Login.spec.ts`
- `tests/CRM/CreateLead.spec.ts`
- `tests/CRM/Diagnostic.spec.ts`

### Strengths

- CRM tests are grouped under `tests/CRM`.
- Create Lead coverage includes mandatory fields, email, language preference, and all optional fields.
- The diagnostic test is useful while stabilizing the form workflow.
- Tests use page objects instead of fully inline selectors in most places.

### Weaknesses

- The default Playwright example spec is still present and unrelated to the CRM suite.
- Login setup is repeated in every CRM test.
- Environment and user identity are hard-coded in specs.
- Tests rely on fixed waits after login, opening modals, selecting dropdowns, and submitting forms.
- Test success is often verified only by checking that the popup closed.
- There is significant duplication across create lead tests.
- Diagnostic/debug logging is mixed into normal test files.
- Tests do not use `test.describe`, tags, annotations, or grouping metadata.
- There is no explicit smoke/regression split.
- There is no setup or teardown strategy for created test data.

## Configuration

`playwright.config.ts` is mostly the generated default:

- `testDir: './tests'`
- `fullyParallel: true`
- `forbidOnly` on CI
- CI retries set to 2
- CI workers set to 1
- reporter set to `html`
- trace set to `on-first-retry`
- Chromium, Firefox, and WebKit projects enabled

### Strengths

- Multi-browser projects are configured.
- CI retry behavior is present.
- HTML reporting and trace-on-retry are enabled.
- The config remains easy to understand.

### Weaknesses

- `baseURL` is commented out, so tests manually call `page.goto(config.baseUrl)`.
- Environment selection is not wired into Playwright config.
- There is no global timeout, expect timeout, action timeout, or navigation timeout tuning.
- Fully parallel execution is enabled, but the data strategy may not be safe for parallel create-lead tests.
- There is no storage state strategy for authenticated sessions.
- There are no output folder/report folder customizations.
- Screenshots and videos are not configured for failure diagnostics.
- Browser projects may be more than needed for early CRM UI stabilization, especially if the app is not validated cross-browser yet.

## Existing Coding Standards

Observed style:

- TypeScript classes are used for page objects and utilities.
- Imports use relative paths.
- Most methods are `async`.
- Formatting often uses many blank lines and multi-line calls.
- Some files follow cleaner formatting than others.
- Test files contain console logs and comments explaining steps.
- Strict TypeScript mode is disabled.

### Strengths

- The code is readable for someone new to Playwright.
- Locators are centralized in page object constructors.
- Utility class methods are simple and direct.

### Weaknesses

- Inconsistent formatting and indentation across files.
- `any` is used for important data structures.
- Some generated console text appears mojibake-encoded, for example checkmark/cross characters in output.
- Naming is inconsistent across file names and classes.
- There is no linting or formatting script in `package.json`.
- `package.json` has no test scripts.
- Comments sometimes describe temporary waits/debug behavior rather than stable framework intent.

## Existing Reusable Methods

Reusable methods currently available:

- `LoginPage.login`
- `HomePage.logout`
- `DashboardPage.openDashboard`
- `DashboardPage.openReports`
- `DashboardPage.openMissedRecovery`
- `DashboardPage.openTeamTargets`
- `DashboardPage.openUpcomingMeetings`
- `DashboardPage.markFollowUpDone`
- `DashboardPage.closeQuickView`
- `NewLeadPopup` field fill/select methods
- `NewLeadPopup.createLeadWithMandatoryFields`
- `ConfigUtility.getConfig`
- `CsvUtility.getUser`
- `DataGenerator.generateLeadData`
- `CycleUtility.next`

These are good foundations, but the tests are not yet consistently leaning on them. For example, the first create-lead test manually performs the mandatory field flow even though `createLeadWithMandatoryFields` exists.

## Reporting

Current reporting:

- Playwright HTML reporter is configured.
- Trace collection is enabled on first retry.
- `playwright-report/` exists as a generated report folder.
- `test-results/` exists as generated output.
- Tests use console logs for runtime visibility.

### Strengths

- HTML reporting is available by default.
- Trace-on-retry provides useful debugging information for flaky failures.

### Weaknesses

- No screenshot/video settings for failures.
- No JSON/JUnit reporter for CI integration.
- No custom attachments for generated lead data.
- Console logging is used as the main reporting detail for data and diagnostics.
- No test step grouping through `test.step`.
- No report metadata for environment, role, browser, or dataset.

## Test Data Strategy

Current data sources:

- environment URLs in `config/*.json`
- credentials in `test-data/users.csv`
- master data constants in `test-data/masterData/*.ts`
- generated lead data in `DataGenerator`
- inline optional lead values in tests

### Strengths

- Test data is separated from tests in several places.
- Users are environment-aware.
- Master data constants make some dropdown values reusable.
- Data generation reduces repeated hard-coded lead names and phone numbers.

### Weaknesses

- Credentials are stored in plaintext CSV.
- User records have trailing spaces in some usernames.
- Master data is split between constants and hard-coded arrays inside `DataGenerator`.
- `ATTRIBUTIONS` exists but is not used by the lead generator.
- Optional fields are still hard-coded inside tests.
- No cleanup or uniqueness guarantee exists for created leads.
- No typed data model exists for lead data, user data, environment config, or attribution data.
- No strategy exists for valid versus invalid data scenarios.

## Reusable Components Identified

Strong candidates for continued reuse:

- page object classes in `pages/`
- `ConfigUtility`
- `CsvUtility`
- `DataGenerator`
- `CycleUtility`
- master data constants
- create-lead mandatory workflow
- CRM login flow
- open-new-lead flow
- dependent dropdown option selection logic
- popup-closed success check

## Code Duplication

Major duplication areas:

- CRM login setup repeated across `Login.spec.ts`, `CreateLead.spec.ts`, and `Diagnostic.spec.ts`.
- Environment config lookup repeated in tests.
- User lookup repeated in tests.
- New Lead popup navigation repeated in create and diagnostic tests.
- Popup closed verification repeated across create-lead tests.
- Fixed sleeps repeated throughout tests and page objects.
- Dependent dropdown selection logic repeated in `selectSource`, `selectCampaignSource`, and `selectLeadSource`.
- Optional field test setup is manually composed in each test.

## Framework Strengths

- Clear initial folder separation.
- Page Object Model has already been introduced.
- Uses Playwright's built-in test runner.
- Uses TypeScript.
- Uses accessible locators in several page objects.
- Environment config is externalized.
- Credential lookup is centralized.
- Lead data generation has started.
- CRM tests cover realistic user workflows.
- HTML reporting and trace retry are already enabled.
- The framework is small enough to refactor safely in focused steps.

## Framework Weaknesses

- Empty fixtures layer.
- No base page or base component abstraction.
- Heavy use of fixed waits.
- Fragile positional selectors.
- Repeated login/setup code.
- Weak typing due to `strict: false` and `any`.
- Hard-coded environment, user, and role values.
- Limited success assertions.
- No cleanup strategy for created data.
- No secure credential strategy.
- No package scripts for standard test commands.
- No lint/format enforcement.
- No CI-friendly reporter configuration.
- No storage-state or authenticated-session reuse.
- No test tagging or suite classification.

## Refactoring Opportunities

Recommended priorities:

1. Introduce custom fixtures for config, users, page objects, and authenticated CRM sessions.
2. Extract common CRM workflows such as login, open New Lead, and create lead.
3. Replace fixed waits with web-first assertions and condition-based waits.
4. Replace positional select locators with stable labels, roles, test IDs, or scoped form locators.
5. Add typed models for config, users, lead data, and attribution data.
6. Consolidate dependent dropdown handling into one reusable helper.
7. Move optional lead data generation into a lead data builder.
8. Use the existing `ATTRIBUTIONS` data to generate coherent attribution combinations.
9. Add stronger assertions after lead creation, such as success toast, created record visibility, API validation, or list/search validation.
10. Add `package.json` scripts for common commands.
11. Add CI-friendly reporting such as HTML plus JUnit or JSON.
12. Remove or isolate the default example and diagnostic specs from normal CRM runs.

## Missing Utilities

Suggested missing utilities:

- environment resolver
- typed config loader with validation
- typed user loader with trimming and caching
- credential provider using environment variables or secrets
- lead data builder
- unique data generator using timestamp or UUID
- dropdown option wait/select helper
- toast assertion helper
- modal assertion helper
- common navigation helper
- storage state/auth helper
- API client helper for setup and cleanup
- report attachment helper
- test cleanup registry
- date/time utility

## Missing Helper Methods

Suggested helper methods at page/workflow level:

- login and wait until home/dashboard is loaded
- open new lead popup and wait until form is ready
- fill complete lead form from typed data
- fill optional lead details from typed data
- select dependent dropdown by visible option with retry
- assert lead popup is open
- assert lead popup is closed
- assert lead creation succeeded
- assert validation error for missing mandatory field
- logout and assert login screen is visible
- navigate to CRM module by name
- wait for dashboard loaded

## Missing Base Functionality

Suggested base framework functionality:

- `BasePage` for shared page behavior.
- `BaseModal` or component object for popup behavior.
- custom Playwright fixtures for page objects and authenticated roles.
- storage state setup for faster authenticated tests.
- centralized waits and assertions.
- typed test data models.
- environment-aware config loading.
- role-aware user/session handling.
- reporting attachments for generated data.
- cleanup hooks for records created during tests.
- standardized test scripts.
- linting and formatting.
- CI reporter configuration.

## Suggested Target Architecture

No implementation code is provided here, but a mature version of this framework could evolve toward this structure:

```text
config/
fixtures/
pages/
  base/
  crm/
components/
workflows/
utils/
  data/
  reporting/
  waits/
test-data/
tests/
  crm/
types/
```

This would keep page objects focused on UI elements and page-level actions, while fixtures and workflows handle repeated business setup.

## Risk Areas

Highest current risks:

- Flakiness from `waitForTimeout`.
- Breakage from indexed selectors in `NewLeadPopup`.
- Data collisions during parallel execution.
- False positives from popup-closed-only success checks.
- Credentials committed in plain text.
- Hard-coded environment and role values limiting reuse.
- Generated example and diagnostic tests accidentally running with real CRM tests.

## Final Assessment

The framework is a good start for CRM UI automation, especially because the basic separation of tests, page objects, config, utilities, and data is already present. The next step is not to add more specs immediately, but to stabilize the foundation: fixtures, typed data, shared workflows, reliable waits, stronger selectors, and better reporting.

Once those are in place, new CRM scenarios can be added with much less duplication and much lower maintenance cost.
