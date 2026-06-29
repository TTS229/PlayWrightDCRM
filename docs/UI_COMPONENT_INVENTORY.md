# UI Component Inventory

Source basis: `knowledge/CURRENT_APPLICATION_BEHAVIOR.md`, `knowledge/GAP_ANALYSIS.md`, and `knowledge/UPDATED_BUSINESS_RULES.md`.

## Buttons

| Component | Screen / Area | Evidence / Notes |
|---|---|---|
| `+ New Lead` | Header / Leads module | Opens New Lead popup |
| `Create Lead` | New Lead popup | Submits lead creation |
| `Cancel` | New Lead popup | Cancels creation |
| Close icon | New Lead popup | Closes popup |
| `Import` | Leads list | Import action visible |
| Call icon | Leads list row actions | Row action |
| Bell/notification icon | Leads list row actions / header | Opens notification/timeline-related popup |
| Document/detail icon | Leads list row actions | Opens/acts on lead detail |
| `Back to Leads` | Lead detail | Returns to list |
| `Convert to Opportunity` | Lead detail header | Conversion action visible |
| `Reassign Lead` | Lead detail header | Assignment action visible |
| `Edit` | Lead detail tabs | Enables edit mode |
| `Save` | Lead detail edit mode | Saves edits |
| `Cancel` | Lead detail edit mode | Cancels edits |
| Floating `Save` | Unsaved changes bar | Appears during edit mode |
| Floating `Cancel` | Unsaved changes bar | Appears during edit mode |
| `Activity` | Lead detail | Opens activity side panel |
| `Hide Activity` | Activity panel | Hides activity panel |
| `Post` | Activity panel | Posts activity text |
| `Note` | Activity panel | Activity type/filter |
| `Call` | Activity panel | Activity type/filter |
| `Meeting` | Activity panel | Activity type |
| `Visit` | Activity panel | Activity type |
| `Email` | Activity panel | Activity type/filter |
| `Notes` | Activity panel | Activity filter |
| `System Logs` | Activity panel | Activity filter |
| `Calls` | Activity panel | Activity filter |
| `WhatsApp` | Activity panel | Activity filter |
| `Meetings` | Activity panel | Activity filter |
| `All` | Activity panel | Activity filter |
| `Set follow-up` | Lead header / detail | Opens Schedule Follow-up popup |
| `Save Follow-up` | Schedule Follow-up popup | Saves follow-up |
| `Cancel` | Schedule Follow-up popup | Cancels follow-up |
| `Upload File` | Files tab | Opens file upload flow |
| `Upload floor plan` | Details/File context | Locator evidence |
| `Edit appointment` | Key Details Appointments | Opens appointment editor |

## Dropdowns

| Component | Screen / Area | Values / Notes |
|---|---|---|
| Phone country code | New Lead popup | `+91`, `+971`, `+1`, `+44`, `+65` evidenced |
| City | New Lead popup / Details | Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain, Other |
| Project Type | New Lead popup / Details | Residential, Commercial, Villa, Office, Mixed-Use |
| Budget Range | New Lead popup / Details | Unspecified, Under 50K AED, 50K-100K AED, 100K-250K AED, 250K-500K AED, Above 500K AED |
| Configuration | New Lead popup / Details | Studio, 1 BHK, 2 BHK, 3 BHK, 4 BHK, 5 BHK+, Villa |
| Pre-Sales Owner | New Lead popup / Details | Auto-assign via Round Robin, Business Manager, Pre Sales Manager, ISA values, Unassigned |
| Channel | New Lead popup Attribution | Online, Offline, Referral |
| Lead Funnel | New Lead popup Attribution | LP Form, Meta Lead Form, WhatsApp, ManyChat, GMB, Phone Call, Walk-in, Website Form, Get Free Estimate, Website Chat |
| Source | New Lead popup Attribution | Paid, Organic, Direct, Offline, Referral |
| Campaign Source | New Lead popup Attribution | Google, Meta, OTT, LinkedIn, PropertyPortal, WhatsApp, Instagram Organic, Google Organic, Direct, GMB, Branding, Channel Partner, Event, Customer, Employee |
| Lead Source | New Lead popup Attribution | Google Search, Google Display, Google PMAX, YouTube, Facebook Ads, Instagram Ads, Hotstar, LinkedIn, Bayut, Dubizzle, Property Finder, Direct Website, Direct WhatsApp, Direct Call, etc. |
| Title | Detail / Contact | Mr., Ms., Mrs., Dr., Prof. |
| Status | Detail edit | Fresh Lead, Connected, Qualified, Meeting Scheduled, Converted |
| Sub Status | Detail edit | Status-scoped values; see `SUB_STATUS_MATRIX.md` |
| Reason | Detail edit | Reason values; see `SUB_STATUS_MATRIX.md` and business rules |
| Intent Score | Details | Hot, Warm, Cold |
| Requirement Type | Key Details | Full Home Interiors, Partial Home Interiors, Modular Kitchen, Bathroom Only, etc. from locator evidence |
| State | Location Details | UAE state/emirate options evidenced |
| Possession Status | Timeline & Possession | Ready to Move-in, Possession within 3 Months, Possession between 3-6 Months, Possession > 6 Months |
| Timeline Category | Timeline & Possession | 0-3 Months, 3-6 Months, 6-12 Months, 12+ Months |
| Meeting Type | Appointment / Meeting Details | Store Visit, Site Visit, Virtual |
| Store | Appointment / Meeting Details | Store list values are environment-specific |
| Decision Maker | Details | Self, Spouse, Parents, Joint |
| Customer Type | Contact KYC | B2B, B2C |
| File Category | Files tab | agreement, floor_plan, site_photo, quotation, document, image |

## Popups

| Popup | Trigger | Contents |
|---|---|---|
| New Lead | `+ New Lead` | Contact, lead details, language, owner, notes, attribution, Cancel/Create Lead |
| Schedule Follow-up | `Set follow-up` | Date, Time, Engagement Note, Cancel, Save Follow-up |
| Notification/Bell popup | Bell icon | Exact contents not fully documented |

## Panels

| Panel | Screen | Contents |
|---|---|---|
| Timeline panel | Leads list row action | Add Quick Note, Recent Activity, ASSIGNMENT, LEAD_CREATED, pagination |
| Activity panel | Lead detail | Activity composer, activity type buttons, filters, system/user activity |
| Files panel | Files tab | Category dropdown, upload button, empty state/files list |
| Calls panel | Calls tab | Call Log & Recordings, count badge, empty state/recordings |

## Tabs

| Tab | Screen | Key Contents |
|---|---|---|
| Key Details | Lead detail | Personal Details, Project Scope, Location Details, Timeline & Possession, Appointments |
| Details | Lead detail | Lead Control, Meeting Details, Project Details, Core Relations, Re-engagement, Attribution, System Info |
| Contact | Lead detail | Personal Identity, Contact Channels, Address, KYC & Compliance |
| Files | Lead detail | File upload and file list |
| Calls | Lead detail | Call log and recordings |

## Grids

| Grid | Screen | Columns / Contents |
|---|---|---|
| Leads list grid | Leads list | Lead Info, Location, Status, Ownership, Business Manager, Follow-up, Created At, Tracking IDs, Actions |
| Attribution flow sequence | Details tab | Channel, Source, Campaign Source, Lead Source, Lead Funnel Stage |
| Activity list | Activity panel | Manual/system activity entries; exact columns TBD |
| Timeline recent activity | Timeline panel | Event type, message, actor/timing |
| File list | Files tab | Empty state shown; populated columns TBD |
| Call log list | Calls tab | Empty state shown; populated columns TBD |

## Filters

| Filter | Screen | Values / Notes |
|---|---|---|
| Lead status tabs | Leads list | All, Fresh Lead, Connected, Qualified, Meeting Scheduled, Converted, Junk, Lost Prospect |
| List search | Leads list | Search this list |
| Global search | Header | Search people, leads, projects |
| Activity filters | Activity panel | Notes, System Logs, Calls, WhatsApp, Meetings, All |

## Actions

| Action | Screen / Area | Notes |
|---|---|---|
| Create lead | New Lead popup | Creates lead/contact |
| Cancel lead creation | New Lead popup | Closes or cancels popup |
| Edit lead | Lead detail | Enables edit mode |
| Save lead | Lead detail | Saves field changes |
| Change stage/status | Lead detail edit | Uses Status dropdown |
| Change sub-status | Lead detail edit | Uses Sub Status dropdown |
| Set reason | Lead detail edit | Uses Reason dropdown |
| Set follow-up | Header/detail popup | Date/time/note |
| Reassign lead | Lead detail | Assignment workflow, exact rules TBD |
| Convert to Opportunity | Lead detail | Conversion workflow, exact rules TBD |
| Upload file | Files tab | Category + file upload |
| Upload floor plan | Details/File context | Floor plan-specific upload |
| Log activity | Activity panel | Notes/calls/visits/email |
| Open timeline | Leads list row action | Opens timeline side panel |
| Import leads | Leads list | Import workflow TBD |
