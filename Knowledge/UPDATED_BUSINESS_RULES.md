# Updated Business Rules

## Evidence Priority

These rules are based on the current `knowledge` artifacts, using this source priority:

1. Current application screenshots
2. Locator recordings/files
3. Workflow documentation
4. Existing test cases
5. PRD

When evidence conflicts, screenshots and locator recordings are treated as the current source of truth. Rules that cannot be confirmed from available evidence are listed under Clarifications Required instead of being inferred.

## 1. Lead Creation Rules

- Users create leads from the `+ New Lead` action.
- The create form opens as a `New Lead` popup.
- The popup states that a contact will be created automatically if new.
- The popup is scrollable and has fixed bottom actions: `Cancel` and `Create Lead`.
- Lead creation is organized into these sections:
  - Contact Information
  - Lead Details
  - Language Preference
  - Pre-Sales Owner (Optional)
  - Description / Notes
  - Attribution
- The current create-lead mandatory fields are:
  - First Name
  - Phone
  - City
  - Project Type
  - Channel
  - Lead Funnel
  - Source
  - Campaign Source
  - Lead Source
- The current create-lead optional fields are:
  - Middle Name
  - Last Name
  - Email
  - Budget Range
  - Configuration
  - Language Preference
  - Pre-Sales Owner
  - Description / Notes
- Pre-Sales Owner can be left as `Auto-assign via Round Robin`.
- If Pre-Sales Owner is left empty, helper text says the system auto-assigns based on load balancing.
- Workflow and test evidence indicate new leads start as `Fresh Lead` with `Unassigned` sub-status, but this default is not fully visible in the create popup screenshots.
- Phone country code is selected through a dropdown. Screenshots show `+91`; locator evidence also includes `+971`, `+1`, `+44`, and `+65`.

## 2. Assignment Rules

- Leads have an Ownership or Pre-Sales Owner value.
- Leads have a Business Manager value.
- The Leads list displays both Ownership and Business Manager columns.
- The Lead detail page displays Pre-Sales Owner and Business Manager in Lead Control.
- The create popup supports automatic Pre-Sales Owner assignment via `Auto-assign via Round Robin`.
- Users can manually select an owner instead of using auto assignment.
- Lead detail pages expose a `Reassign Lead` action.
- Locator evidence shows selectable owner values including Business Manager, Pre Sales Manager, ISA 3, ISA 2, and Unassigned.
- Some leads show Business Manager populated; other leads show Business Manager as Unassigned.
- Existing test evidence says Business Manager is auto-populated when the lead reaches Converted based on meeting location store.
- Workflow and PRD evidence say Business Manager may be assigned when the lead reaches Meeting Scheduled.
- Because current screenshots do not prove the exact Business Manager assignment trigger, the trigger remains a known conflict.

## 3. Round Robin Rules

- The current UI exposes `Auto-assign via Round Robin` for Pre-Sales Owner during lead creation.
- The current UI helper says leaving Pre-Sales Owner empty triggers auto-assignment based on load balancing.
- Locator evidence confirms users can switch between auto assignment and manual owner selection.
- Workflow and PRD describe round-robin pools, assignment caps, leave handling, city routing, store routing, and fallback routing.
- These detailed round-robin mechanics are not visible in screenshots or locator evidence and should not be automated as confirmed current behavior until clarified.

Confirmed current Round Robin rule:

- If the user leaves Pre-Sales Owner empty/defaulted during lead creation, the system is expected to auto-assign a Pre-Sales Owner using load balancing or Round Robin.

Unconfirmed Round Robin details:

- Agent pool calculation.
- Whether assignment is city-specific or PAN India.
- Agent cap calculation.
- Over-cap behavior.
- On-leave skipping.
- Redistribution behavior.
- Fallback city/store behavior.
- Whether converted leads count against cap.

## 4. Stage Transition Rules

The current Lead detail stage bar shows this sequence:

1. Fresh Lead
2. Connected
3. Qualified
4. Meeting Scheduled
5. Converted

Current screenshots show:

- The active stage is highlighted.
- Previous stages can show completed-state styling/checkmarks.
- Meeting Scheduled is an observed intermediate stage and must be treated as part of current behavior even though some deliverables focus only on Fresh, Connected, Qualified, and Converted.

Current evidence supports these transition areas:

- Fresh Lead can progress to Connected.
- Connected can progress to Qualified.
- Qualified can progress to Meeting Scheduled.
- Meeting Scheduled can progress to Converted.
- Status can be edited from the Lead detail page.
- Locator evidence shows users selecting multiple status values, including Fresh Lead, Connected, Qualified, Meeting Scheduled, and Converted.

Known transition rules from lower-priority evidence:

- Moving to Connected requires follow-up date/time and Budget Range.
- Moving to Meeting Scheduled requires Email, Meeting Date, Meeting Time, Meeting Location, and Meeting Type.
- Moving to Converted creates or enables opportunity conversion behavior.

Unconfirmed transition rules:

- Whether stage progression is strictly forward-only in the current UI.
- Whether direct jumps between non-adjacent stages are permitted.
- Whether backward movement is permitted.
- Which roles can perform each transition.
- Whether `Convert to Opportunity` is enabled only at Converted or available earlier with validation.

## 5. Mandatory Field Rules

### Lead Creation Mandatory Fields

The create popup marks these fields mandatory:

- First Name
- Phone
- City
- Project Type
- Channel
- Lead Funnel
- Source
- Campaign Source
- Lead Source

### Lead Detail Mandatory Fields

Current detail screenshots show mandatory markers for these fields in Lead detail context:

- City
- Budget Range
- Configuration on a Meeting Scheduled lead
- Requirement Type on a Meeting Scheduled lead
- Interior Requirements on a Meeting Scheduled lead
- Property Name on a Meeting Scheduled lead
- Location on a Meeting Scheduled lead

### Meeting Scheduling Mandatory Fields

Existing passed test evidence states these are required to move to Meeting Scheduled:

- Email
- Meeting Date
- Meeting Time
- Meeting Location
- Meeting Type

### Follow-up Mandatory Fields

Existing test evidence states follow-up date/time is required for:

- Callback Requested
- Follow-up Pending
- No Immediate Requirement

Workflow evidence also lists First Attempt Pending as requiring next follow-up details, but this is not confirmed by screenshots.

## 6. Sub-status Rules

### Fresh Lead

Sub-statuses confirmed from locator evidence:

- Unassigned
- First Attempt Pending
- Assigned
- Duplicate Suspected

Additional lower-priority documented value:

- Invalid Lead

Observed default:

- Fresh Lead detail screenshots show `Unassigned`.

### Connected

Sub-statuses supported by existing passed test evidence:

- Requirement Discussion
- Callback Requested
- Follow-up Pending
- Interested
- Exploring Options
- No Immediate Requirement
- Not Qualified
- Junk

Additional values from locator/workflow evidence:

- Follow Up
- Busy
- Late Handover
- RnR
- Lost Prospect

### Qualified

Sub-statuses supported by existing passed test evidence:

- Consultation Recommended
- Follow-up Ongoing
- Considering Options
- Discussing Internally
- Awaiting Confirmation

Additional values from locator/workflow evidence:

- Follow Up
- Lost Prospect
- No Immediate Requirement
- On Hold

### Meeting Scheduled

Sub-statuses from locator evidence:

- Meeting Confirmed
- Meeting Scheduled
- Meeting Rescheduled
- No Show
- Confirmation Pending
- Follow Up
- Lost Prospect

Additional existing test evidence values:

- Store Visit Scheduled
- Site Visit Scheduled
- Follow-up Pending
- Rescheduled
- Lost

### Converted

Sub-status confirmed from current list screenshot:

- Initial Meeting

Additional lower-priority documented values:

- Walk-in Completed
- Opportunity Created

## 7. Reason Field Rules

- A Reason field is visible in the Details tab under Lead Control.
- Existing test and locator evidence show reasons are used or required for negative or non-progressing outcomes.
- Existing test evidence supports reason requirement for:
  - Not Qualified
  - Junk
  - Lost
- Locator evidence shows reason options selected for Connected, Qualified, and Meeting Scheduled style sub-statuses.

Reason options observed in locator evidence include:

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
- Call Later
- Discussing with Family
- Reviewing other vendors

Unconfirmed reason rules:

- Exact reason list by status.
- Exact reason list by sub-status.
- Whether every negative sub-status requires a reason.
- Whether `Other` or `Others` requires free-text notes.

## 8. Follow-up Rules

- Lead header displays Next Follow-up as either a value or a `Set follow-up` action.
- Lead detail pages display Next Follow-up in Lead Control or Personal Details areas.
- Schedule Follow-up popup contains:
  - Date
  - Time
  - Engagement Note
  - Cancel
  - Save Follow-up
- Existing test evidence states follow-up date/time is required for:
  - Callback Requested
  - Follow-up Pending
  - No Immediate Requirement
- Existing test evidence states Callback Requested without follow-up date is a validation error.
- Existing test evidence states Follow-up Pending and No Immediate Requirement save successfully when follow-up date/time is provided.
- Timeline/activity evidence indicates follow-up updates should be logged, but the exact timeline entry shape is not visible in screenshots.

Unconfirmed follow-up rules:

- Whether Engagement Note is required.
- Whether follow-up date can be in the past.
- Whether follow-up time can be blank when date exists.
- Which statuses/sub-statuses require follow-up beyond the test-supported cases.
- Whether Converted leads can or must have follow-up.

## 9. Timeline Rules

- A timeline side panel can be opened from the Leads list row action.
- The timeline panel title uses the pattern `Timeline: <lead name>`.
- Timeline supports Add Quick Note.
- Timeline shows Recent Activity.
- Timeline has close and pagination controls.
- Visible timeline events include:
  - ASSIGNMENT
  - LEAD_CREATED
- Visible timeline event details include:
  - `Lead auto-assigned to ISA 2`
  - `Lead created`
  - actor text such as `By Pre Sales Manager`
  - relative timing such as `1 day overdue`

Workflow-documented timeline/activity event types include:

- LEAD_STATUS_CHANGE
- LEAD_UPDATE
- ASSIGNMENT
- REMINDER
- FOLLOW_UP_OVERDUE
- RULE_ACTION
- OPP_CREATED
- NOTE
- CALL
- MEETING
- EMAIL
- VISIT
- FOLLOW_UP
- MEETING_SCHEDULED

Unconfirmed timeline rules:

- Whether all workflow-documented events appear in the current timeline UI.
- Whether timeline and Activity panel display the same event source.
- Whether quick notes create NOTE events in the same timeline.
- Exact ordering rules for events.
- Whether pagination is chronological or reverse chronological.

## 10. Activity History Rules

- Lead detail page has an Activity side panel.
- Locator evidence shows activity creation and filtering controls for:
  - Note
  - Call
  - Meeting
  - Visit
  - Email
  - Notes
  - System Logs
  - Calls
  - WhatsApp
  - Meetings
  - All
- Users can enter free text in `Log a note, call, or meeting`.
- Users can post activity using `Post`.
- Existing test evidence states stage changes are logged in Activity History.
- Existing test evidence states follow-up changes update Activity History.
- Existing test evidence states BM assignment creates an Activity History entry.
- Workflow evidence states:
  - Field changes create `LEAD_UPDATE`.
  - Status/sub-status changes create `LEAD_STATUS_CHANGE`.
  - Assignment creates `ASSIGNMENT`.

Requested Activity History audit fields:

- Modified By is partially evidenced through Created By, Updated By, and timeline actor text.
- Modified Date is partially evidenced through Created At, Updated At, Last Activity, and event timestamps.
- Old Value is workflow-documented but not visible in screenshots.
- New Value is workflow-documented but not visible in screenshots.

Unconfirmed activity history rules:

- Exact field-level audit layout.
- Whether old/new values are visible to users.
- Whether audit entries are filterable by event type.
- Whether manual activity entries and system audit entries share one panel.

## 11. File Upload Rules

- Lead detail page has a Files tab.
- Files tab has a file category dropdown.
- Files tab has an Upload File button.
- Empty Files tab displays `No files uploaded yet`.
- Empty state text says users can upload agreements, floor plans, site photos, and more.
- Locator evidence shows these file category values:
  - agreement
  - floor_plan
  - site_photo
  - quotation
  - document
  - image
- Details tab has `Floor Plan Available`.
- Locator evidence includes `Upload floor plan`.
- Files tab category evidence includes `floor_plan`.

Unconfirmed file upload rules:

- Allowed file extensions.
- Maximum file size.
- Required document categories by stage.
- Upload success message.
- Upload failure message.
- Whether floor plan upload changes Floor Plan Available.
- Whether file categories are role-restricted.
- Whether documents can be deleted or replaced.

## 12. Validation Rules

Confirmed or evidenced validation rules:

- Create Lead requires First Name.
- Create Lead requires Phone.
- Create Lead requires City.
- Create Lead requires Project Type.
- Create Lead requires Channel.
- Create Lead requires Lead Funnel.
- Create Lead requires Source.
- Create Lead requires Campaign Source.
- Create Lead requires Lead Source.
- Existing test evidence says phone accepts only a 10-digit number.
- Existing test evidence says moving to Connected requires follow-up date/time and Budget Range.
- Existing test evidence says Callback Requested requires follow-up date/time.
- Existing test evidence says Follow-up Pending requires Budget Range and follow-up date/time.
- Existing test evidence says No Immediate Requirement requires Budget Range and follow-up date/time.
- Existing test evidence says Not Qualified/Junk/Lost require a reason.
- Existing test evidence says Meeting Scheduled requires Email, Meeting Date, Meeting Time, Meeting Location, and Meeting Type.

Validation rules requiring clarification:

- Exact error text for each current mandatory field.
- Whether Email is required only for Meeting Scheduled or earlier.
- Whether Phone length differs by country code.
- Whether attribution fields are dependent and must be selected in a specific order.
- Whether invalid source/campaign/lead-source combinations are blocked.
- Whether date/time fields reject past values.
- Whether `Other` reason requires notes.
- Whether file upload validation exists.
- Whether stage transition validation is role-dependent.

## 13. Integration Rules

### Contact Integration

- New Lead popup states contact is created automatically if new.
- Lead detail page links to a contact under Core Relations.
- Contact tab displays contact identity, contact channels, address, and KYC/compliance fields.
- Duplicate/re-enquiry behavior is documented in lower-priority sources but not confirmed by current screenshots or locator evidence.

### Opportunity Integration

- Lead detail page has `Convert to Opportunity`.
- Details tab has Core Relations with Opportunities.
- Workflow evidence says conversion creates an opportunity.
- Current screenshots show some leads with no opportunities yet.
- Existing test evidence says Business Manager assignment is involved before or at conversion, but the exact trigger conflicts across sources.

### Calling Integration

- Calls tab is titled `Call Log & Recordings`.
- Calls tab empty state says every inbound or outbound call via Exotel is automatically synced.
- Workflow documentation lists call activity fields such as call type, call status, duration, recording URL, provider call ID, and call note.
- Populated call record layout is not confirmed by screenshots.

### Notification Integration

- A notification/bell icon exists in list row actions and header.
- A screenshot exists for a bell-icon popup.
- Exact notification rules and event payloads are not confirmed.

### Import Integration

- Leads list shows an Import action.
- Accepted import file types, mapping rules, and validation behavior are not confirmed.

## 14. Known Business Rule Conflicts

### Business Manager Assignment Trigger

- Workflow/PRD evidence: BM assignment occurs when lead reaches Meeting Scheduled.
- Existing passed test evidence: BM is auto-assigned when lead reaches Converted.
- Screenshot evidence: Business Manager field exists, but trigger is not proven.
- Current rule status: unresolved. Do not automate trigger-specific assertions until clarified.

### Current Sub-status Lists

- Screenshots do not expose complete dropdown values for every status.
- Locator evidence contains one set of status/sub-status values.
- Existing passed test cases contain another set for Connected, Qualified, and Meeting Scheduled.
- PRD/workflow contain additional or different values.
- Current rule status: use screenshots/locators first; treat lower-priority-only values as provisional.

### Mandatory Lead Creation Fields

- Current screenshots and locator evidence show attribution fields are mandatory during creation.
- Older test cases treat only First Name, Phone, City, and Project Type as the core mandatory set.
- Current rule status: current create-flow automation must include attribution mandatory fields.

### Create Popup Naming

- Current screenshots show `New Lead` and `Create Lead`.
- Older test cases mention `Quick Add Lead` and `Create Lead Now`.
- Current rule status: use `New Lead` and `Create Lead`.

### City and Environment Values

- Current screenshots/locators emphasize Dubai/UAE city values.
- Some older test cases use Chennai, Bengaluru, and staging-style values.
- Current rule status: environment-specific datasets must be separated before automation.

### Converted Sub-status

- Current list screenshot shows Converted with `Initial Meeting`.
- PRD/test evidence mentions `Walk-in Completed` and `Opportunity Created`.
- Current rule status: only `Initial Meeting` is confirmed by current screenshot evidence.

### Duplicate/Re-enquiry Rules

- PRD and existing test cases describe duplicate/re-enquiry logic.
- Current screenshots and locator evidence do not confirm the behavior.
- Current rule status: business scenario exists in lower-priority evidence, but current behavior needs confirmation.

## 15. Clarifications Required

Clarify these items before using this document as an automation contract:

- Exact default status and sub-status after lead creation in the current UI.
- Exact current sub-status dropdown values for Fresh Lead, Connected, Qualified, Meeting Scheduled, and Converted.
- Default sub-status automatically selected for each stage transition.
- Exact mandatory fields for each stage transition.
- Whether stage progression is strictly forward-only.
- Whether backward stage movement is allowed.
- Whether direct non-sequential stage jumps are allowed.
- Role permissions for create, edit, stage change, reassign, convert, file upload, and activity posting.
- Exact Business Manager assignment trigger.
- Whether BM assignment uses store, city, meeting location, role pool, or another rule.
- Complete Round Robin algorithm.
- Agent cap behavior.
- Agent on-leave behavior.
- City-specific versus PAN India assignment behavior.
- Fallback behavior when no eligible agent exists.
- Whether converted leads count against assignment capacity.
- Exact Reason dropdown values by status and sub-status.
- Which sub-statuses require Reason.
- Which sub-statuses require follow-up date/time.
- Whether follow-up Engagement Note is required.
- Follow-up date/time validation, including past-date behavior.
- Exact create-lead validation error messages.
- Exact stage-transition validation error messages.
- Phone validation by country code.
- Whether Email is required before Meeting Scheduled only or earlier.
- Attribution dependency rules and invalid combinations.
- Duplicate and re-enquiry business rules in the current application.
- Whether re-enquiry count and date update automatically.
- File upload allowed extensions.
- File upload maximum size.
- Required document categories by stage.
- Whether floor plan upload updates Floor Plan Available.
- Whether files can be deleted, downloaded, replaced, or previewed.
- Populated Calls tab layout and Exotel sync behavior.
- Notification popup rules and event contents.
- Import workflow, accepted formats, and validation behavior.
- Exact Activity History fields and whether Old Value/New Value are visible.
- Whether timeline and Activity panel read from the same activity log.
- Whether quick notes appear in Activity, Timeline, or both.
- Tracking IDs column meaning and expected values.
