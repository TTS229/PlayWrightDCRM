# Current Application Behavior

## Source Priority and Evidence Rules

This document describes the current Lead module behavior using the evidence available in the `knowledge` folder.

Source priority, highest to lowest:

1. Current application screenshots in `knowledge/Leads_Flow_SS`
2. Locator recordings/files, especially `knowledge/Leads_flow_Full_Locators.txt`
3. Workflow documentation, especially `knowledge/crm-workflow.md`
4. Existing test cases in CSV/XLSX files
5. PRD content in `knowledge/CRM_PRD.md`

When sources conflict, screenshots and locator evidence are treated as the source of truth. Behavior that is not visible or directly documented in the available evidence is listed under Missing Information instead of being inferred.

## Lead Module

### Available Pages

The current Lead module evidence shows these pages and views:

- Leads list page.
- New Lead popup/modal.
- Lead detail page.
- Timeline side panel from the Leads list.
- Schedule Follow-up popup.
- Notification popup opened from the bell icon.

### Leads List Page

The Leads list page shows:

- Left navigation with Dashboard, Leads, Opportunities, Team, Reports, Store Performance, and Profile.
- Header search for people, leads, and projects.
- `+ New Lead` action.
- Import action.
- List-level search field.
- List filter tabs:
  - All
  - Fresh Lead
  - Connected
  - Qualified
  - Meeting Scheduled
  - Converted
  - Junk
  - Lost Prospect
- Table columns visible in screenshots:
  - Lead Info
  - Location
  - Status
  - Ownership
  - Business Manager
  - Follow-up
  - Created At
  - Tracking IDs
  - Actions
- Row actions visible as icons:
  - Call
  - Bell/notification or timeline-related action
  - Document/detail action
- Pagination and total count summary.

### Lead Detail Page

The Lead detail page shows:

- Back to Leads navigation.
- Lead name and phone number.
- Current status badge with age/duration.
- Next Follow-up link or value.
- Created timestamp.
- Last Activity timestamp.
- Stage bar:
  - Fresh Lead
  - Connected
  - Qualified
  - Meeting Scheduled
  - Converted
- Header actions:
  - Convert to Opportunity
  - Reassign Lead
- Detail tabs:
  - Key Details
  - Details
  - Contact
  - Files
  - Calls
- Activity side panel toggle.
- Edit action on editable tabs.

### Sections and Panels

Observed Lead detail sections include:

- Personal Details.
- Lead Control.
- Meeting Details.
- Project Details or Project Scope.
- Location Details.
- Timeline & Possession.
- Appointments.
- Core Relations.
- Re-engagement.
- Attribution Details.
- Campaign Details collapsed section.
- System Info.
- Personal Identity.
- Contact Channels.
- Address Information.
- KYC & Compliance.
- Files panel.
- Call Log & Recordings panel.
- Activity panel.

### Key Details Tab

The Key Details tab shows:

- Personal Details:
  - Title
  - First Name
  - Middle Name
  - Last Name
  - Email Address
  - Language Preference
  - Status
  - Sub Status
  - Next Follow-up
- Project Scope:
  - Configuration
  - Size (Sqft)
  - Requirement Type
  - Budget Range
  - Interior Requirements
- Location Details:
  - Property Name
  - City
  - State
  - Zipcode
  - Location
  - Serviceability Status
- Timeline & Possession:
  - Possession Date
  - Possession Status
  - Timeline Category
- Appointments:
  - Appointment date and time
  - Meeting type
  - Store
  - Appointment summary card

### Details Tab

The Details tab shows:

- Lead Control:
  - Status
  - Sub Status
  - Reason
  - Pre-Sales Owner
  - Business Manager
  - Next Follow-up
  - Intent Score
  - Qualification %
  - Language Preference
- Meeting Details:
  - Meeting Type
  - Store
  - Visit Booked At
  - Preferred Meeting Time
- Project Details:
  - Budget Range
  - Project Type
  - Property Configuration
  - Size (Sqft)
  - Floor Plan Available
  - Requirement Type
  - Decision Maker
- Core Relations:
  - Linked Contact
  - Opportunities
- Re-engagement:
  - Is Re-enquiry
  - Re-enquiry Count
  - Re-engagement Note
- Attribution Details:
  - Channel
  - Source
  - Campaign Source
  - Lead Source
  - Lead Funnel Stage
- System Info:
  - Created By
  - Updated By
  - External ID
  - Created At
  - Updated At

### Contact Tab

The Contact tab shows:

- Personal Identity:
  - Title
  - First Name
  - Middle Name
  - Last Name
  - Full Name
  - Language
- Contact Channels:
  - Primary Phone
  - Secondary Phone
  - WhatsApp Consent
  - Calling Consent
  - RCS Consent
- Address Information:
  - Residential Address
  - City
  - State
  - Zipcode
  - Country
- KYC & Compliance:
  - PAN Number
  - GST Number
  - Customer Type
  - NRI Status

### Files Tab

The Files tab shows:

- File category dropdown.
- Upload File button.
- Empty state: `No files uploaded yet`.
- Empty state text indicating uploads can include agreements, floor plans, site photos, and more.

### Calls Tab

The Calls tab shows:

- `Call Log & Recordings` heading.
- Call count badge.
- Empty state: `No calls logged yet`.
- Empty state text indicating inbound or outbound calls via Exotel are automatically synced.

### Activity Panel

The Activity panel evidence shows:

- Activity toggle on the Lead detail page.
- Quick activity/log controls from locator evidence:
  - Note
  - Call
  - Meeting
  - Visit
  - Email
  - Post
  - Notes
  - System Logs
  - Calls
  - WhatsApp
  - Meetings
  - All
- Hide Activity action.

## Lead Creation

### New Lead Popup

The New Lead popup shows:

- Title: `New Lead`.
- Subtitle: `Contact will be created automatically if new`.
- Close icon.
- Fixed bottom actions:
  - Cancel
  - Create Lead
- Scrollable content.
- Helper text for Pre-Sales Owner: `If left empty, system will auto-assign based on load balancing`.

### Mandatory Fields

The following fields are marked mandatory in current screenshots or locator evidence:

- First Name.
- Phone.
- City.
- Project Type.
- Channel.
- Lead Funnel.
- Source.
- Campaign Source.
- Lead Source.

### Optional Fields

The following fields are visible without mandatory markers in current screenshots or locator evidence:

- Middle Name.
- Last Name.
- Email.
- Budget Range.
- Configuration.
- Language Preference.
- Pre-Sales Owner.
- Description / Notes.

### Default Values and Auto-Populated Behavior

Observed defaults and auto-populated behavior:

- Contact is created automatically if the entered contact is new.
- Phone country code defaults to a visible country code selector. Screenshots show `+91`; locator evidence includes `+91`, `+971`, `+1`, `+44`, and `+65`.
- Pre-Sales Owner defaults to `Auto-assign via Round Robin` / load balancing when left empty.
- Newly created leads are documented in workflow and test evidence as starting in `Fresh Lead` with `Unassigned` sub-status.

### Creation Sections

The popup includes these sections:

- Contact Information.
- Lead Details.
- Language Preference.
- Pre-Sales Owner (Optional).
- Description / Notes.
- Attribution.

### Creation Field Options From Locator Evidence

City options include:

- Dubai
- Abu Dhabi
- Sharjah
- Ajman
- Ras Al Khaimah
- Fujairah
- Umm Al Quwain
- Other

Project Type options include:

- Residential
- Commercial
- Villa
- Office
- Mixed-Use

Budget Range options include:

- Unspecified
- Under 50K AED
- 50K-100K AED
- 100K-250K AED
- 250K-500K AED
- Above 500K AED

Configuration options include:

- Studio
- 1 BHK
- 2 BHK
- 3 BHK
- 4 BHK
- 5 BHK+
- Villa

Language Preference options include:

- English
- Hindi
- Tamil
- Telugu
- Kannada
- Malayalam
- Marathi
- Bengali
- Gujarati
- Punjabi
- Arabic
- Other

Channel options include:

- Online
- Offline
- Referral

Lead Funnel options include:

- LP Form
- Meta Lead Form
- WhatsApp
- ManyChat (DM / Comment)
- GMB Click / Call
- Phone Call (Inbound)
- Walk-in
- Website Form
- Get Free Estimate
- Website Chat

Source options include:

- Paid
- Organic
- Direct
- Offline
- Referral

Campaign Source options include:

- Google
- Meta
- OTT
- LinkedIn
- PropertyPortal
- WhatsApp
- Instagram Organic
- Google Organic
- Direct
- GMB
- Branding
- Channel Partner
- Event
- Customer
- Employee

Lead Source options include:

- WhatsApp Campaign
- Google Search
- Google Display
- Google PMAX
- YouTube
- GMB
- Facebook Ads
- Instagram Ads
- Hotstar
- LinkedIn
- Bayut
- Dubizzle
- Property Finder
- Search Organic
- Direct Website
- Direct WhatsApp
- Direct Call
- Walk-in (Unspecified)
- Billboard
- Digital Hoarding
- Flyer
- Exhibition / Event
- B2B Event
- Employee Referral
- Customer Referral

## Lead Stages

### Observed Stage Bar

The current detail page stage bar contains:

1. Fresh Lead
2. Connected
3. Qualified
4. Meeting Scheduled
5. Converted

The requested stages Fresh, Connected, Qualified, and Converted are part of the observed stage bar. Meeting Scheduled is also documented because it is visible in screenshots and locator evidence as an intermediate stage.

### Fresh Lead

Observed/default behavior:

- Fresh Lead appears as the initial stage in list and detail screenshots.
- The current active stage is highlighted in the stage bar.
- Detail screenshots show `Fresh Lead` with sub-status `Unassigned`.

Observed sub-status options from locator evidence:

- Unassigned
- First Attempt Pending
- Assigned
- Duplicate Suspected

Additional sub-statuses from workflow/test evidence only:

- Invalid Lead

Mandatory fields visible on current detail pages:

- City is marked mandatory.
- Budget Range is marked mandatory on the Key Details/Details view.

Validation rules evidenced:

- Existing test evidence states phone is required during lead creation.
- Existing test evidence states property city is required during lead creation.
- Existing test evidence states Fresh Lead to Connected requires follow-up date/time and Budget Range. This is test evidence, not directly visible in screenshots.

Reason fields:

- No Fresh Lead reason requirement is visible in screenshots.

Follow-up fields:

- Next Follow-up is visible in the header and detail fields.
- Schedule Follow-up popup includes Date, Time, and Engagement Note.

### Connected

Observed stage behavior:

- Connected appears in the stage bar.
- Locator evidence shows status can be selected as `Connected`.

Observed/current sub-status options from existing passed test evidence:

- Requirement Discussion
- Callback Requested
- Follow-up Pending
- Interested
- Exploring Options
- No Immediate Requirement
- Not Qualified
- Junk

Additional sub-statuses from locator/workflow evidence:

- Follow Up
- Busy
- Late Handover
- RnR
- Lost Prospect

Mandatory fields and validations evidenced:

- Existing passed test evidence states moving Fresh Lead to Connected makes Next follow-up date/time and Budget Range mandatory.
- Existing test evidence states Callback Requested requires follow-up date/time.
- Existing test evidence states Follow-up Pending requires Budget Range and follow-up date/time.
- Existing test evidence states No Immediate Requirement requires Budget Range and follow-up date/time.
- Workflow evidence says moving to Qualified requires project details such as city, pincode, property name, budget range, configuration, requirement type, and interior requirements.

Reason fields:

- Reason field is visible in the Details tab under Lead Control.
- Existing test and locator evidence show reasons are required/used for Not Qualified and Junk.

Reason options from locator evidence include:

- Budget not matching
- Not interested anymore
- No response after multiple attempts
- Duplicate lead
- Out of service area
- Looking for rental only
- Project cancelled
- Booked with Competitor
- Timeline Too Far
- Design Preference Not Matching
- Looking for commercial only
- Out of Service
- Other
- Answered & Busy
- Switched Off
- Out of Station
- RNR (Ring No Response)
- No Requirements
- Repeated Leads
- Contractor / Vendors Number
- Looking for Job
- Lead was a Test / Spam
- Bot Leads
- Invalid Number
- Wrong Number
- Others

Follow-up fields:

- Next Follow-up date and time are visible/editable in locator evidence.
- Schedule Follow-up popup contains Date, Time, and Engagement Note.

### Qualified

Observed stage behavior:

- Qualified appears in the stage bar.
- Locator evidence shows status can be selected as `Qualified`.

Observed/current sub-status options from existing passed test evidence:

- Consultation Recommended
- Follow-up Ongoing
- Considering Options
- Discussing Internally
- Awaiting Confirmation

Additional sub-statuses from locator/workflow evidence:

- Follow Up
- Lost Prospect
- No Immediate Requirement
- On Hold

Mandatory fields and validations evidenced:

- Current screenshots show, on a Meeting Scheduled lead, mandatory markers for Configuration, Requirement Type, Budget Range, Interior Requirements, Property Name, City, and Location.
- Existing test evidence states Qualified to Meeting Scheduled requires Email, Meeting Date, Meeting Time, Meeting Location, and Meeting Type.
- Workflow evidence says qualification fields include city, property name, project type, configuration, budget amount/range, possession date, requirement type, project description, and timeline.

Reason fields:

- Locator evidence shows reasons can be selected for some Qualified sub-statuses, including RNR, Switched Off, Out of Station, Answered & Busy, Call Later, Out of Service, Discussing with Family, and Reviewing other vendors.
- Exact reason requirement by each Qualified sub-status is not fully visible in screenshots.

Follow-up fields:

- Next Follow-up remains visible in header and detail fields.
- Follow-up requirements for Qualified sub-statuses are not fully determinable from screenshots.

### Meeting Scheduled

Meeting Scheduled is not one of the four requested stage headings, but it is visible in screenshots and locator evidence as the stage before Converted.

Observed sub-status options:

- Meeting Confirmed
- Meeting Scheduled
- Meeting Rescheduled
- No Show
- Confirmation Pending
- Follow Up
- Lost Prospect

Additional sub-statuses from existing passed test evidence:

- Store Visit Scheduled
- Site Visit Scheduled
- Follow-up Pending
- Rescheduled
- Lost

Mandatory fields and validations evidenced:

- Existing passed test evidence states moving to Meeting Scheduled is blocked without Email.
- Existing passed test evidence states moving to Meeting Scheduled is blocked without Meeting Date.
- Existing passed test evidence states moving to Meeting Scheduled is blocked without Meeting Time.
- Existing passed test evidence states moving to Meeting Scheduled is blocked without Meeting Location.
- Existing passed test evidence states moving to Meeting Scheduled is blocked without Meeting Type.
- Current screenshots show appointment fields for Appointment Time, Meeting Type, and Store.

Reason fields:

- Existing test evidence states Lost requires a reason.
- Locator evidence shows reason options for Follow Up/Lost Prospect-style states.

Follow-up fields:

- Header shows Next Follow-up value on Meeting Scheduled lead screenshots.
- Appointment details are shown with meeting date/time and store.

### Converted

Observed stage behavior:

- Converted appears in the Leads list filter tabs and stage bar.
- Converted leads appear in the list with sub-status `Initial Meeting`.
- The stage bar shows Converted as the final stage.

Observed sub-status options:

- Initial Meeting appears in list screenshots.

Additional sub-statuses from PRD/workflow/test evidence only:

- Walk-in Completed
- Opportunity Created

Mandatory fields and validations evidenced:

- Workflow evidence states conversion creates an opportunity.
- Lead detail screenshots show a `Convert to Opportunity` action.
- Existing test evidence states Business Manager is auto-populated based on meeting location store when a lead reaches Converted.
- The exact UI validation required to move to Converted is not fully visible in screenshots.

Reason fields:

- No converted-stage reason requirement is visible in current screenshots.

Follow-up fields:

- Converted rows in the Leads list may show future follow-up values.
- Required follow-up behavior for Converted is not determinable from screenshots.

## Assignment

### Round Robin Behavior

Current evidence shows:

- New Lead popup has a Pre-Sales Owner field marked optional.
- The default Pre-Sales Owner value is `Auto-assign via Round Robin`.
- Helper text states: `If left empty, system will auto-assign based on load balancing`.
- Locator evidence shows the user can select specific owners manually instead of auto assignment.

### Lead Owner Behavior

Current evidence shows:

- Leads list has an Ownership column.
- Detail page shows Pre-Sales Owner in Lead Control.
- Locator evidence shows selectable owner values such as Business Manager, Pre Sales Manager, ISA 3, ISA 2, and Unassigned.
- Header action `Reassign Lead` is visible on Lead detail pages.

### Business Manager Behavior

Current evidence shows:

- Leads list has a Business Manager column.
- Lead detail page shows Business Manager in Lead Control.
- Some list rows show Business Manager populated; some show Unassigned.
- Existing test evidence states Business Manager can be auto-populated when a lead reaches Converted based on meeting location store.
- PRD/workflow evidence states Business Manager assignment may occur when Meeting Scheduled is reached. This conflicts with existing passed test evidence and is not fully proven by screenshots.

### Auto Assignment

Auto assignment is evidenced for Pre-Sales Owner through the popup default and helper text. Detailed round-robin rules, cap behavior, leave handling, city fallback, and store fallback are not visible in screenshots or locator evidence.

## File Upload

### Files Tab Behavior

The Files tab shows:

- File category dropdown.
- Upload File button.
- Empty state when no files exist.
- Empty state text: uploads can include agreements, floor plans, site photos, and more.

### Supported Document Categories

Locator evidence shows these selectable upload categories:

- agreement
- floor_plan
- site_photo
- quotation
- document
- image

### Floor Plan Behavior

Current evidence shows:

- Details tab has a `Floor Plan Available` field.
- Screenshot example shows `Floor Plan Available` = `No`.
- Locator evidence includes an `Upload floor plan` action.
- Files tab category evidence includes `floor_plan`.

### Validation Rules

The available evidence does not confirm:

- Allowed file extensions.
- Maximum file size.
- Required document categories by stage.
- Upload failure behavior.
- Whether floor plan upload changes `Floor Plan Available` automatically.

These are listed under Missing Information.

## Timeline

### Timeline Side Panel

The timeline screenshot shows:

- Panel title: `Timeline: <lead name>`.
- Add Quick Note area.
- Recent Activity section.
- Close action.
- Pagination.

### Timeline Events Identified

Timeline events directly visible or evidenced include:

- ASSIGNMENT.
- LEAD_CREATED.
- Quick note added from the timeline panel.

Timeline or activity events documented in workflow and locator evidence include:

- LEAD_STATUS_CHANGE.
- LEAD_UPDATE.
- FOLLOW_UP.
- FOLLOW_UP_OVERDUE.
- REMINDER.
- RULE_ACTION.
- OPP_CREATED.
- NOTE.
- CALL.
- MEETING.
- VISIT.
- EMAIL.
- MEETING_SCHEDULED.
- WhatsApp activity/filter.
- System Logs.

### Timeline Event Details

Visible example details:

- ASSIGNMENT event shows text such as `Lead auto-assigned to ISA 2`.
- LEAD_CREATED event shows `Lead created`.
- LEAD_CREATED event shows actor text such as `By Pre Sales Manager`.
- Timeline items show relative timing such as `1 day overdue`.

## Activity History

### Activity Area

Locator evidence shows the Activity panel supports:

- Posting free-text activity.
- Selecting Note.
- Selecting Call.
- Selecting Meeting or Visit.
- Selecting Email.
- Filtering by Notes, System Logs, Calls, WhatsApp, Meetings, and All.

### Activity History Events

Existing test evidence states activity history logs:

- Status updated to Connected.
- Status updated to Qualified.
- Status updated to Meeting Scheduled.
- Status updated to Converted.
- BM assignment entry.
- Follow-up updates.

Workflow evidence states:

- Every field change creates a `LEAD_UPDATE`.
- Status and sub-status changes create `LEAD_STATUS_CHANGE`.
- Assignment creates `ASSIGNMENT`.

### Modified By, Modified Date, Old Value, New Value

The requested Activity History fields are only partially evidenced:

- Modified By: actor names are visible in System Info as Created By and Updated By; timeline also shows `By Pre Sales Manager`.
- Modified Date: Created At, Updated At, and event timestamps are visible.
- Old Value: workflow says status changes include old to new values, but screenshots do not show an Old Value field.
- New Value: workflow says status changes include old to new values, but screenshots do not show a New Value field.

Because the exact Activity History table/field layout for Modified By, Modified Date, Old Value, and New Value is not visible in current screenshots, the full structure is not confirmed.

## Missing Information

The following cannot be determined from the available evidence without inference:

- Exact validation messages for every mandatory field in the current application.
- Whether all creation dropdown values from locator recordings are currently active in the latest UI.
- Exact source/campaign/lead-source dependency rules and invalid combinations.
- Exact current sub-status options for every stage from screenshots alone.
- Exact default sub-status for Connected, Qualified, Meeting Scheduled, and Converted in the latest UI.
- Whether `Invalid Lead`, `Walk-in Completed`, and `Opportunity Created` are current sub-statuses or PRD/test-only values.
- Complete validation rules for Fresh Lead to Connected beyond test evidence.
- Complete validation rules for Connected to Qualified.
- Complete validation rules for Qualified sub-status reasons and follow-up requirements.
- Complete validation rules for Converted.
- Whether backward stage movement is allowed in the current UI.
- Whether direct Fresh Lead to Converted transition is allowed or only appeared in locator exploration.
- Whether Convert to Opportunity is enabled before the lead reaches Converted.
- Exact Business Manager assignment trigger: Meeting Scheduled versus Converted.
- Detailed Round Robin algorithm.
- Agent cap behavior.
- Agent leave behavior.
- City-specific versus PAN India assignment mode behavior.
- Store fallback and city fallback behavior.
- Manual reassignment permissions by role.
- File upload allowed extensions.
- File upload maximum size.
- File upload required categories by stage.
- File upload success and error messages.
- Whether uploading a floor plan automatically changes Floor Plan Available.
- Whether Exotel call sync is active in the current environment.
- Exact call log fields shown after calls exist.
- Exact Activity History field layout for Modified By, Modified Date, Old Value, and New Value.
- Whether timeline events and Activity panel events are the same data source.
- Notification popup behavior from the bell icon beyond the available screenshot.
- Duplicate/re-enquiry behavior in the current UI beyond lower-priority test and PRD evidence.
- Permissions for Create Lead, Edit Lead, Convert to Opportunity, Reassign Lead, Upload File, and Activity posting by role.
