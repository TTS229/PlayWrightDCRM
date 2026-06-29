# Integration Matrix

Source basis: `knowledge/CURRENT_APPLICATION_BEHAVIOR.md`, `knowledge/GAP_ANALYSIS.md`, and `knowledge/UPDATED_BUSINESS_RULES.md`.

`Confirmed` means the integration is visible in screenshots/locators or strongly supported by the current business rules. `TBD` indicates incomplete current evidence.

| Source | Target | Interaction | Trigger | Evidence Level | Confirmed Outputs | Open Questions |
|---|---|---|---|---|---|---|
| Lead | Contact | Contact is created automatically if new | New Lead creation | Screenshot text / business rules | Contact link appears under Core Relations; Contact tab displays identity/channel/address/KYC | Duplicate matching rules; re-enquiry behavior |
| Contact | Lead | Contact details are shown within Lead detail | Open Contact tab | Screenshots | Primary phone, secondary phone, consent, address, PAN/GST/customer type fields | Which fields are editable by role |
| Lead | Assignment | Pre-Sales Owner auto-assignment | Create Lead with default owner | Screenshot/locator | Auto-assign via Round Robin/load balancing | Exact Round Robin algorithm |
| Lead | Assignment | Manual owner selection | User selects owner in popup/detail | Locator evidence | Selected owner shown as Ownership/Pre-Sales Owner | Permission by role; audit entry details |
| Assignment | Timeline | Assignment event logged | Auto/manual assignment | Timeline screenshot/workflow | ASSIGNMENT event; e.g. `Lead auto-assigned to ISA 2` | Manual assignment entry format |
| Assignment | Activity History | Assignment audit logged | Assignment/reassignment | Workflow/test evidence | BM assignment entry per tests | Exact old/new values and Modified By/Date layout |
| Lead | Meeting | Appointment data captured | Move/schedule meeting | Screenshots/test evidence | Appointment card with date/time/store/type | Whether meeting required for all conversion paths |
| Meeting | Assignment | Business Manager assignment may use meeting/store | Meeting Scheduled or Converted | Conflicting workflow/test evidence | Business Manager field populated in some records | Exact BM trigger and pool rule |
| Meeting | Timeline | Meeting scheduled event expected | Meeting scheduling | Workflow evidence | MEETING_SCHEDULED event type documented | Current timeline display format |
| Meeting | Activity History | Meeting/stage change logged | Move to Meeting Scheduled | Existing test evidence | Status updated to Meeting Scheduled | Exact entry shape |
| Lead | Timeline | Lead creation logged | Create Lead | Timeline screenshot/workflow | LEAD_CREATED event; actor text visible | Full event metadata |
| Lead | Timeline | Status changes logged | Stage transition | Workflow/test evidence | LEAD_STATUS_CHANGE expected | Whether shown in timeline panel or only Activity |
| Lead | Activity History | Field changes logged | Save edits | Workflow evidence | LEAD_UPDATE expected | Whether old/new values are visible |
| Lead | Activity History | Manual notes/calls/meetings/email logged | Activity panel post | Locator evidence/workflow | Activity composer and type buttons | Required fields per activity type |
| Activity History | Timeline | Possible shared event stream | Activity/timeline events | Not confirmed | Both show activity-like records | Whether both read same source |
| Lead | Files | Files attached to lead | Upload File | Screenshot/locator | File categories; empty state | Upload validation, success message, file list columns |
| Files | Lead | Floor Plan Available may relate to floor_plan upload | Upload floor plan / set field | Screenshot/locator | Floor Plan Available field; floor_plan category | Whether upload auto-updates field |
| Lead | Notifications | Bell/notification available | Bell icon click / events | Screenshot evidence | Popup exists | Notification contents and rules |
| Timeline | Notifications | Follow-up/activity may drive notifications | Event/follow-up | Not confirmed | None confirmed | Triggering events and recipients |
| Lead | Exotel | Calls synced to Calls tab | Inbound/outbound call | Calls tab screenshot/workflow | Empty state says Exotel calls sync automatically | Whether integration is active; populated call fields |
| Exotel | Activity History | Calls may create call activity | Call sync/manual call | Workflow evidence | CALL event type documented | Current UI entry format |
| Exotel | Timeline | Calls may appear in timeline | Call sync | Workflow evidence only | CALL event type documented | Whether timeline shows calls |
| Lead | Opportunity | Opportunity conversion | Convert to Opportunity / Converted stage | Screenshot/workflow | Convert button; Core Relations Opportunities; OPP_CREATED documented | Exact conversion prerequisites |
| Opportunity | Lead | Opportunity linked back to lead | Conversion | Workflow evidence | Core Relations can show Opportunities | Link display after conversion |
| Lead | Re-engagement | Re-enquiry count/date/note shown | Duplicate/re-enquiry | Screenshots show fields; lower-priority rules | Is Re-enquiry, Re-enquiry Count, Re-engagement Note fields | Current duplicate decision tree |
| Lead | Import | Leads can be imported | Import action | Screenshot | Import button visible | Accepted formats, field mapping, validations |
| Lead | Tracking IDs | Tracking IDs displayed in list | Lead list load | Screenshot | Tracking IDs column | Meaning/source of values |

## Integration Rule Summary

- Lead is the central record connecting Contact, Assignment, Meeting, Timeline, Activity History, Files, Notifications, Exotel calls, and Opportunity.
- Contact integration is directly visible through automatic contact creation text and Contact tab/Core Relations fields.
- Assignment integration is visible through owner fields and assignment timeline events.
- Meeting integration is visible through appointment cards and meeting fields.
- Timeline and Activity History overlap conceptually, but their shared or separate data source is not confirmed.
- File integration is visible through Files tab and floor plan fields, but upload validation is unknown.
- Exotel integration is referenced by Calls tab empty state and workflow docs, but populated call behavior is unknown.
- Opportunity integration is visible through `Convert to Opportunity` and Core Relations, but conversion prerequisites remain unclear.
