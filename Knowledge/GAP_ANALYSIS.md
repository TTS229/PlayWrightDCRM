# Gap Analysis

## Source Priority

This gap analysis compares existing knowledge artifacts using the required source priority:

1. Current application screenshots
2. Locator recordings/files
3. Workflow documentation
4. Existing test cases
5. PRD

Screenshots and locator evidence override workflow documentation, existing test cases, and PRD whenever there is a conflict. Functionality not visible or directly documented is treated as a clarification gap.

## Existing Functionality Confirmed From Current Evidence

### Lead List

Confirmed from screenshots:

- Leads list page exists.
- List filters exist for All, Fresh Lead, Connected, Qualified, Meeting Scheduled, Converted, Junk, and Lost Prospect.
- List search exists.
- Import action exists.
- Lead row actions include call, bell/notification or timeline, and document/detail action icons.
- Columns include Lead Info, Location, Status, Ownership, Business Manager, Follow-up, Created At, Tracking IDs, and Actions.

### Lead Creation

Confirmed from screenshots and locator evidence:

- `+ New Lead` opens the New Lead popup.
- Popup title is `New Lead`.
- Popup subtitle states contact is created automatically if new.
- Contact Information, Lead Details, Language Preference, Pre-Sales Owner, Description/Notes, and Attribution sections exist.
- Mandatory creation fields are First Name, Phone, City, Project Type, Channel, Lead Funnel, Source, Campaign Source, and Lead Source.
- Optional creation fields include Middle Name, Last Name, Email, Budget Range, Configuration, Language Preference, Pre-Sales Owner, and Description/Notes.
- Pre-Sales Owner can be left as Auto-assign via Round Robin/load balancing.
- Cancel and Create Lead actions exist.

### Lead Detail

Confirmed from screenshots:

- Lead detail page exists with header summary, status badge, next follow-up, created timestamp, and last activity.
- Stage bar exists with Fresh Lead, Connected, Qualified, Meeting Scheduled, and Converted.
- Header actions include Convert to Opportunity and Reassign Lead.
- Tabs exist for Key Details, Details, Contact, Files, and Calls.
- Activity side panel toggle exists.
- Edit mode exists on detail tabs.

### Stage and Field Management

Confirmed from screenshots, locator evidence, and workflow/test support:

- Fresh Lead, Connected, Qualified, Meeting Scheduled, and Converted are application stages.
- Stage bar visually marks active and completed stages.
- Status and Sub Status fields are editable in detail pages.
- Reason field appears in Lead Control.
- Next Follow-up is visible in the header and details.
- Appointment fields exist for meeting date/time, meeting type, and store.

### Assignment

Confirmed from screenshots and locator evidence:

- Ownership/Pre-Sales Owner is displayed.
- Business Manager is displayed.
- Auto-assign via Round Robin is available for Pre-Sales Owner on create.
- Manual owner selection is available.
- Reassign Lead action exists.

### Files and Floor Plan

Confirmed from screenshots and locator evidence:

- Files tab exists.
- Upload File action exists.
- File category dropdown exists.
- File category options include agreement, floor_plan, site_photo, quotation, document, and image.
- Floor Plan Available is displayed in Details.
- Upload floor plan action appears in locator evidence.

### Timeline and Activity

Confirmed from screenshots and locator evidence:

- Timeline side panel exists from the lead list action.
- Timeline supports Add Quick Note.
- Timeline events include ASSIGNMENT and LEAD_CREATED.
- Activity panel exists on the detail page.
- Activity supports notes and multiple activity filters/actions, including calls, visits/meetings, email, WhatsApp, and system logs.

## Existing Test Cases Still Valid

The following existing test areas remain valid because they align with screenshots, locator evidence, or workflow evidence.

### High Priority

- New Lead popup opens from the Leads page.
- New Lead popup shows title, subtitle, Cancel, and Create Lead actions.
- New Lead popup has scrollable content and fixed bottom actions.
- Create lead with mandatory fields remains valid, but expected mandatory fields must match the current popup.
- Missing First Name and Phone validation scenarios remain valid in principle.
- Missing City and Project Type validation scenarios remain valid in principle.
- Create lead with optional Description/Notes remains valid.
- Pre-Sales Owner left empty triggers auto-assignment/load balancing behavior.
- Manual Pre-Sales Owner selection overrides auto-assignment.
- Stage transition coverage remains valid for Fresh Lead, Connected, Qualified, Meeting Scheduled, and Converted.
- Activity history/status-change logging remains valid in principle.
- Callback Requested with follow-up date remains valid.
- Callback Requested without follow-up date remains valid in principle.
- Not Qualified/Junk/Lost reason-required scenarios remain valid in principle.
- Meeting Scheduled blocked without Email, Meeting Date, Meeting Time, Meeting Location, or Meeting Type remains valid in principle.
- File upload tab/category coverage remains valid in principle.

### Medium Priority

- Optional field persistence on Lead detail remains valid.
- Lead detail tabs Key Details, Details, Contact, Files, and Calls remain valid.
- Contact tab field verification remains valid.
- Calls tab empty state remains valid.
- Follow-up scheduling popup coverage remains valid.
- Attribution dropdown coverage remains valid, but option names and dependencies need updates from locator evidence.
- Duplicate/re-enquiry scenarios remain valid as business scenarios, but current UI evidence is not enough to automate without clarification.

### Low Priority

- Stage bar color-change cases remain valid as visual checks but should be lower priority than business behavior.
- Empty-state checks for Files and Calls remain valid.
- Pagination and list count display checks remain valid.

## Existing Test Cases Requiring Updates

These test areas remain relevant but should be updated before automation.

### New Lead Popup Field Expectations

Update required because current screenshots show more mandatory fields than older test cases.

- Older cases that list only First Name, Phone, Project Type, and Project City as mandatory must include current mandatory attribution fields:
  - Channel
  - Lead Funnel
  - Source
  - Campaign Source
  - Lead Source
- Older wording such as `Quick Add Lead`, `Create Lead Now`, or project-city-only flow should be replaced with current `New Lead` popup and `Create Lead` action where current evidence supports it.

Priority: High.

### Attribution Options

Update required because PRD/test examples mention generic values such as Digital, Walk-in, Social Media, and Events, while locator evidence shows current values such as Online, Offline, Referral, Paid, Organic, Direct, Google, Meta, PropertyPortal, WhatsApp, and specific lead source values.

Priority: High.

### Stage Sub-Statuses

Update required because PRD, workflow, locator evidence, and test cases do not fully agree.

- Use current screenshots/locator evidence first.
- Use passed test cases only where screenshots/locators do not provide complete stage lists.
- Keep conflicting PRD-only values out of executable expectations until clarified.

Priority: High.

### Meeting Scheduled and Conversion Rules

Update required because sources conflict about when Business Manager assignment occurs.

- PRD/workflow suggest BM assignment at Meeting Scheduled.
- Existing passed test evidence says BM auto-assigned when the lead reaches Converted.
- Screenshots show Business Manager field but do not confirm trigger.

Priority: High.

### File Upload Test Cases

Update required because upload category values are known from locators, but file extension/size validation is not confirmed.

- Keep category dropdown and upload button checks.
- Do not assert unsupported file validation rules until clarified.

Priority: Medium.

### Duplicate and Re-Enquiry Test Cases

Update required because duplicate/re-enquiry behavior is mostly from lower-priority test cases and PRD, not screenshots or locator evidence.

- Keep as business-rule tests only after clarification.
- Avoid assuming same-phone/same-city behavior until confirmed in current application.

Priority: Medium.

### Activity History Field Checks

Update required because existing tests mention Activity History updates, but the requested Modified By, Modified Date, Old Value, and New Value layout is not visible in screenshots.

Priority: Medium.

## Existing Test Cases That Are Obsolete

The following test expectations should not be automated as-is because they are contradicted or superseded by higher-priority current evidence.

- Test cases that treat only First Name, Phone, City, and Project Type as the full mandatory create-lead requirement are obsolete as written.
- Test cases using `Create Lead Now` as the button label are obsolete as written; current screenshots show `Create Lead`.
- Test cases using `Quick Add Lead` as the popup name are obsolete as written; current screenshots show `New Lead`.
- Test cases expecting Channel values such as Digital, Social Media, Walk-in, or Events as the primary current set are obsolete as written unless those values are confirmed in the current UI.
- Test cases expecting old staging city data such as Chennai/Bengaluru as the only city set are obsolete for the Dubai-current screenshot set, unless environment-specific tests are intentionally split.
- PRD-only stage or opportunity expectations that are not visible in current Lead screenshots/locators should not be treated as current automation targets.

## New Functionality Observed But Missing From Existing Test Cases

Observed current functionality that appears under-covered or missing:

- Leads list filter coverage for Junk and Lost Prospect.
- Import action visibility on Leads list.
- Tracking IDs column behavior.
- Row action coverage for call, bell/timeline, and document/detail icons.
- Timeline side panel from list row action.
- Timeline quick note posting.
- Timeline pagination.
- Notification popup opened from the bell icon.
- Header search behavior for people, leads, and projects.
- Convert to Opportunity button visibility and enabled/disabled behavior by stage.
- Reassign Lead action behavior.
- Activity panel filters/actions for WhatsApp and System Logs.
- Files tab empty state.
- Calls tab empty state and Exotel sync message.
- Campaign Details collapsed section in Details.
- Re-engagement fields: Is Re-enquiry, Re-enquiry Count, Re-engagement Note.
- System Info fields: Created By, Updated By, External ID, Created At, Updated At.
- Contact tab consent fields: WhatsApp Consent, Calling Consent, RCS Consent.
- KYC & Compliance fields: PAN Number, GST Number, Customer Type, NRI Status.
- Floor Plan Available field and Upload floor plan action.
- Appointment summary card and Edit appointment action.
- Unsaved changes floating bar in edit mode.
- Stage bar completed-state checkmarks.

## Missing Automation Coverage

### High Priority

- Full current mandatory lead creation flow including all attribution mandatory fields.
- Mandatory field validation for each current create-lead required field.
- Current attribution dependency chain:
  - Channel
  - Source
  - Campaign Source
  - Lead Source
  - Lead Funnel
- Auto assignment when Pre-Sales Owner is left empty.
- Manual Pre-Sales Owner selection.
- Status/sub-status transition coverage using current values.
- Reason-required validation for Not Qualified, Junk, Lost, and Lost Prospect where applicable.
- Follow-up required validation for Callback Requested, Follow-up Pending, and No Immediate Requirement where applicable.
- Meeting Scheduled required validation for Email, Meeting Date, Meeting Time, Meeting Location, and Meeting Type.
- Convert to Opportunity visibility and behavior.
- Activity/timeline logging for lead creation, assignment, status change, and follow-up.
- Reassign Lead behavior and permissions.

### Medium Priority

- Lead list filters and counts.
- Lead list row actions.
- Timeline quick note.
- Schedule Follow-up popup.
- Optional lead fields persistence.
- Contact tab field display and edit behavior.
- Files tab category selection and upload happy path.
- Floor Plan Available and floor plan upload behavior.
- Calls tab empty and populated states.
- Activity panel filters.
- Appointment creation/edit behavior.
- Re-engagement fields.
- System Info fields.

### Low Priority

- Stage bar colors and completed-state visual styling.
- Empty states for no files and no calls.
- Pagination UI.
- Import button visibility without import workflow.
- Cosmetic layout checks.
- Secondary metadata display-only checks.

## Recommended Automation Priority

| Area | Priority | Reason |
|---|---|---|
| Current lead creation mandatory flow | High | Core business intake path |
| Create-lead mandatory validations | High | Prevents invalid CRM records |
| Attribution field dependencies | High | Mandatory current create-flow requirement |
| Pre-Sales auto/manual assignment | High | Drives ownership and follow-up accountability |
| Stage transitions | High | Core lead lifecycle |
| Meeting scheduling validations | High | Required before downstream conversion |
| Reason/follow-up required rules | High | Prevents incomplete dispositions |
| Convert to Opportunity | High | Critical handoff to sales/opportunity flow |
| Activity/timeline audit logging | High | Business audit and accountability |
| Reassign Lead | High | Ownership correction workflow |
| Lead list filters/search | Medium | Operational usability |
| Optional lead fields | Medium | Data completeness |
| Contact tab and consent fields | Medium | Customer profile integrity |
| Files and floor plan basics | Medium | Required supporting documents |
| Calls tab and Exotel sync states | Medium | Communication history |
| Follow-up scheduling popup | Medium | Agent productivity |
| Activity filters | Medium | Audit discoverability |
| Stage bar color-only checks | Low | Cosmetic risk |
| Empty states | Low | Useful but not business-critical |
| Pagination/list count | Low | Operational but lower risk |

## Business Rules Requiring Clarification Before Automation

Clarify these items before writing executable automation:

- Exact current mandatory fields for each stage transition.
- Exact current sub-status list for every status from the live UI.
- Default sub-status selected when moving to Connected, Qualified, Meeting Scheduled, and Converted.
- Which sub-statuses require Reason.
- Which sub-statuses require Next Follow-up Date and Time.
- Exact Reason dropdown options by status and sub-status.
- Whether Meeting Scheduled is a required stage before Converted.
- Whether direct transition from Fresh Lead or Connected to Converted is allowed.
- Whether backward stage movement is allowed and for which roles.
- Exact Business Manager auto-assignment trigger: Meeting Scheduled or Converted.
- Whether BM assignment uses store, city, meeting location, or another rule.
- Round Robin algorithm details.
- Agent cap behavior.
- Agent on-leave behavior.
- City-specific versus PAN India assignment mode.
- City/store fallback assignment behavior.
- Permissions by role for create, edit, reassign, convert, upload, and activity posting.
- Current duplicate/re-enquiry rules.
- File upload allowed extensions.
- File upload maximum size.
- File upload category requirements by stage.
- Whether floor plan upload automatically updates Floor Plan Available.
- Whether Exotel call sync is active and what a populated call record contains.
- Exact Activity History fields and whether Modified By, Modified Date, Old Value, and New Value are displayed in a table or timeline format.
- Whether timeline and Activity panel use the same audit event source.
- Notification popup behavior and expected contents.
- Import workflow behavior and accepted file formats.
- Tracking IDs column meaning and expected values.
