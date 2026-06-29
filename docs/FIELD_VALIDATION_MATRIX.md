# Field Validation Matrix

Source basis: `knowledge/CURRENT_APPLICATION_BEHAVIOR.md`, `knowledge/GAP_ANALYSIS.md`, and `knowledge/UPDATED_BUSINESS_RULES.md`.

Evidence priority: screenshots, locator recordings, workflow docs, existing test cases, PRD. `TBD` means the current evidence does not confirm the value.

| Field Name | Screen | Mandatory | Editable | Default Value | Validation | Error Message | Stage Dependency |
|---|---|---:|---:|---|---|---|---|
| First Name | New Lead popup | Yes | Yes | Empty | Required | TBD | Creation |
| Middle Name | New Lead popup | No | Yes | Empty | None confirmed | None confirmed | Creation |
| Last Name | New Lead popup | No | Yes | Empty | None confirmed | None confirmed | Creation |
| Phone country code | New Lead popup | Yes, as part of Phone | Yes | Screenshot shows `+91`; locator includes `+971`, `+1`, `+44`, `+65` | Must be selected with phone | TBD | Creation |
| Phone | New Lead popup | Yes | Yes | Empty | Required; existing tests say 10 digits | `Phone Number is required` in older test evidence | Creation |
| Email | New Lead popup / Key Details / Contact | No at creation | Yes | Empty | Existing tests say required before Meeting Scheduled | `A contact email address is required before scheduling a meeting.` | Required for Meeting Scheduled per test evidence |
| City | New Lead popup / Key Details | Yes | Yes | Empty / selected value on saved lead | Required | Older tests reference city-required warning, exact current text TBD | Creation; detail screenshots mark City required |
| Project Type | New Lead popup / Details | Yes | Yes | Empty | Required | TBD | Creation |
| Budget Range | New Lead popup / Key Details / Details | No at creation; Yes in detail screenshots | Yes | Empty | Required for Connected transition per test evidence | TBD | Fresh to Connected; detail required marker |
| Configuration | New Lead popup / Key Details | No at creation; required marker on Meeting Scheduled screenshot | Yes | Empty | Required in Meeting Scheduled lead detail evidence | TBD | Qualification/Meeting Scheduled context |
| Language Preference | New Lead popup / Key Details | No | Yes | Empty | Multi-select buttons, no validation confirmed | None confirmed | Creation/detail |
| Pre-Sales Owner | New Lead popup / Details | No | Yes | `Auto-assign via Round Robin` | If empty/default, auto-assigned by load balancing | None confirmed | Creation/assignment |
| Description / Notes | New Lead popup | No | Yes | Empty | Free text; optional per test evidence | None confirmed | Creation |
| Channel | New Lead popup Attribution | Yes | Yes | Empty | Required | TBD | Creation |
| Lead Funnel | New Lead popup Attribution | Yes | Yes | Empty | Required | TBD | Creation |
| Source | New Lead popup Attribution | Yes | Yes | Empty/disabled until dependency in UI not fully confirmed | Required | TBD | Creation; may depend on Channel/Lead Funnel |
| Campaign Source | New Lead popup Attribution | Yes | Yes | Empty/disabled until dependency in UI not fully confirmed | Required | TBD | Creation; may depend on Source |
| Lead Source | New Lead popup Attribution | Yes | Yes | Empty/disabled until dependency in UI not fully confirmed | Required | TBD | Creation; may depend on Campaign Source |
| Title | Key Details / Contact | No | Yes | Empty | Options include Mr., Ms., Mrs., Dr., Prof. from locator evidence | None confirmed | Detail/contact |
| Status | Key Details / Details | Yes | Yes | Fresh Lead after creation per workflow/test evidence | Must use supported stage values | TBD | All lifecycle stages |
| Sub Status | Key Details / Details | Yes where status requires | Yes | Unassigned for Fresh Lead screenshot | Must use status-scoped values | TBD | Depends on Status |
| Reason | Details Lead Control | Conditional | Yes | Empty / dash | Required for Not Qualified, Junk, Lost per test evidence | TBD | Negative/lost sub-statuses |
| Next Follow-up Date | Header / Key Details / Details / Follow-up popup | Conditional | Yes | Empty / `Set follow-up` | Required for Callback Requested, Follow-up Pending, No Immediate Requirement per test evidence | Follow-up validation text TBD | Follow-up-required sub-statuses |
| Next Follow-up Time | Header / Key Details / Details / Follow-up popup | Conditional | Yes | Empty | Required with follow-up date per test evidence | TBD | Follow-up-required sub-statuses |
| Engagement Note | Schedule Follow-up popup | TBD | Yes | Empty | Requirement not confirmed | TBD | Follow-up popup |
| Intent Score | Details | No | Yes | Example: Cold | Options include Hot, Warm, Cold | None confirmed | Detail |
| Qualification % | Details | No/TBD | TBD | Example: `40% Qualified` | Manual/auto calculation not confirmed in UI | TBD | Qualification context |
| Meeting Date / Appointment Date | Key Details / Appointment editor | Required for Meeting Scheduled per tests | Yes | Empty | Required to move to Meeting Scheduled | `Meeting Date is required` | Qualified to Meeting Scheduled |
| Meeting Time / Appointment Time | Key Details / Appointment editor | Required for Meeting Scheduled per tests | Yes | Empty | Required to move to Meeting Scheduled | `Meeting Time is required` | Qualified to Meeting Scheduled |
| Meeting Type | Key Details / Meeting Details / Appointment editor | Required for Meeting Scheduled per tests | Yes | Empty | Required; options include Store Visit, Site Visit, Virtual | `Meeting Type is required` | Qualified to Meeting Scheduled |
| Store / Meeting Location | Key Details / Meeting Details / Appointment editor | Required for Meeting Scheduled per tests | Yes | Empty | Required to move to Meeting Scheduled | `Meeting Location is required` | Qualified to Meeting Scheduled |
| Visit Booked At | Details Meeting Details | No/TBD | TBD | Empty/dash | No validation confirmed | TBD | Meeting context |
| Property Name | Key Details / Location Details | Required marker on Meeting Scheduled screenshot | Yes | Empty | Required in Meeting Scheduled context | TBD | Qualification/Meeting Scheduled context |
| State | Key Details / Location Details | No | Yes | Empty | No validation confirmed | None confirmed | Detail |
| Zipcode | Key Details / Location Details | No | Yes | Empty | No current validation confirmed | TBD | Detail |
| Location | Key Details / Location Details | Required marker on Meeting Scheduled screenshot | Yes | Empty | Required in Meeting Scheduled context | TBD | Meeting Scheduled context |
| Serviceability Status | Key Details / Location Details | No/TBD | Yes | Example: Serviceable/Unserviceable | No validation confirmed | TBD | Detail |
| Size (Sqft) | Key Details / Project Scope | No | Yes | Empty | Numeric/text validation not confirmed | TBD | Detail |
| Requirement Type | Key Details / Project Scope | Required marker on Meeting Scheduled screenshot | Yes | Empty | Required in Meeting Scheduled context | TBD | Qualification/Meeting Scheduled context |
| Interior Requirements | Key Details / Project Scope | Required marker on Meeting Scheduled screenshot | Yes | Empty | Required in Meeting Scheduled context | TBD | Qualification/Meeting Scheduled context |
| Possession Date | Key Details / Timeline & Possession | No/TBD | Yes | Empty | Date/month-year validation not confirmed | TBD | Detail |
| Possession Status | Key Details / Timeline & Possession | No | Yes | Empty | Options seen in locator evidence | None confirmed | Detail |
| Timeline Category | Key Details / Timeline & Possession | No | Yes | Unknown | Options include 0-3, 3-6, 6-12, 12+ Months | None confirmed | Detail |
| Floor Plan Available | Details Project Details | No/TBD | Yes | Example: No | Toggle/dropdown behavior not fully confirmed | TBD | File/floor-plan context |
| Decision Maker | Details Project Details | No | Yes | Empty | Options include Self, Spouse, Parents, Joint | None confirmed | Detail |
| Linked Contact | Details Core Relations | System | No/TBD | Auto-linked contact | Auto-created/linked when contact is new | N/A | Creation/contact integration |
| Opportunities | Details Core Relations | System | No/TBD | `No opportunities yet` where none exist | Updated by opportunity conversion | N/A | Converted/opportunity integration |
| Is Re-enquiry | Details Re-engagement | System/TBD | TBD | Example: No | Duplicate/re-enquiry rule not confirmed | TBD | Re-enquiry |
| Re-enquiry Count | Details Re-engagement | System/TBD | TBD | Empty/dash | Duplicate/re-enquiry rule not confirmed | TBD | Re-enquiry |
| Re-engagement Note | Details Re-engagement | No | Yes | Empty | No validation confirmed | TBD | Re-engagement |
| Created By | Details System Info | System | No | Creator user | System-generated | N/A | All saved records |
| Updated By | Details System Info | System | No | Last updater | System-generated | N/A | On update |
| External ID | Details System Info | System | No | Generated ID | System-generated | N/A | All saved records |
| Created At | Details System Info / Header | System | No | Creation timestamp | System-generated | N/A | On creation |
| Updated At | Details System Info | System | No | Update timestamp | System-generated | N/A | On update |
| Secondary Phone | Contact tab | No | Yes | Empty | Phone validation not confirmed | TBD | Contact |
| WhatsApp Consent | Contact tab | No | Yes/TBD | Example: No | Boolean/toggle behavior not confirmed | TBD | Contact |
| Calling Consent | Contact tab | No | Yes/TBD | Example: No | Boolean/toggle behavior not confirmed | TBD | Contact |
| RCS Consent | Contact tab | No | Yes/TBD | Example: No | Boolean/toggle behavior not confirmed | TBD | Contact |
| Residential Address | Contact tab | No | Yes | Empty | No validation confirmed | TBD | Contact |
| Country | Contact tab | System/TBD | TBD | Example: India | No validation confirmed | TBD | Contact |
| PAN Number | Contact tab KYC | No in Lead evidence | Yes | Empty | Closed Won requirement is PRD/opportunity-only | TBD | Contact/KYC |
| GST Number | Contact tab KYC | No in Lead evidence | Yes | Empty | B2B requirement is PRD/opportunity-only | TBD | Contact/KYC |
| Customer Type | Contact tab KYC | No/TBD | Yes | Example: B2C | Options include B2B, B2C | TBD | Contact/KYC |
| NRI Status | Contact tab KYC | No | Yes/TBD | Example: No | Toggle behavior not confirmed | TBD | Contact/KYC |
| File Category | Files tab | Yes for upload | Yes | Document in screenshot | Must choose upload category | TBD | Files |
| File Upload | Files tab | Conditional | Yes | No file | Allowed extensions/size not confirmed | TBD | Files |
