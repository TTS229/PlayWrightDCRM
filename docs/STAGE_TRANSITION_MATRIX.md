# Stage Transition Matrix

Source basis: `knowledge/CURRENT_APPLICATION_BEHAVIOR.md`, `knowledge/GAP_ANALYSIS.md`, and `knowledge/UPDATED_BUSINESS_RULES.md`.

`Allowed` reflects available evidence, not final product policy. `TBD` means the current evidence does not confirm the rule.

| Current Stage | Target Stage | Allowed | Mandatory Fields | Required Sub-status | Required Reason | Required Follow-up | Timeline Entry | Activity History Entry |
|---|---|---|---|---|---|---|---|---|
| New Lead form | Fresh Lead | Yes, by creation evidence | First Name, Phone, City, Project Type, Channel, Lead Funnel, Source, Campaign Source, Lead Source | Unassigned per workflow/test evidence | No | No confirmed requirement | LEAD_CREATED visible/evidenced | Creation entry evidenced |
| Fresh Lead | Connected | Yes, supported by stage sequence and tests | Budget Range and follow-up date/time per existing test evidence; exact current rule TBD | Connected default TBD; Requirement Discussion in test evidence | No confirmed general reason | Yes per tests for transition | LEAD_STATUS_CHANGE per workflow | Status updated to Connected per test evidence |
| Fresh Lead | Qualified | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Fresh Lead | Meeting Scheduled | TBD | Email, meeting fields if allowed; direct transition not confirmed | TBD | TBD | TBD | TBD | TBD |
| Fresh Lead | Converted | TBD | Conversion requirements not confirmed | TBD | TBD | TBD | OPP_CREATED if conversion occurs per workflow | TBD |
| Connected | Fresh Lead | TBD | Backward movement not confirmed | Fresh Lead sub-status if allowed | TBD | TBD | LEAD_STATUS_CHANGE if allowed | TBD |
| Connected | Qualified | Yes, supported by stage sequence and tests | Workflow lists city, pincode, property name, budget range, configuration, requirement type, interior requirements; exact current mandatory set TBD | Consultation Recommended per test evidence, default not confirmed | No general reason confirmed | Not generally confirmed | LEAD_STATUS_CHANGE per workflow | Status updated to Qualified per test evidence |
| Connected | Meeting Scheduled | TBD | Email, meeting date/time/location/type if allowed | TBD | TBD | TBD | LEAD_STATUS_CHANGE if allowed | TBD |
| Connected | Converted | TBD | Conversion requirements not confirmed | TBD | TBD | TBD | OPP_CREATED if conversion occurs | TBD |
| Qualified | Fresh Lead | TBD | Backward movement not confirmed | TBD | TBD | TBD | LEAD_STATUS_CHANGE if allowed | TBD |
| Qualified | Connected | TBD | Backward movement not confirmed | TBD | TBD | TBD | LEAD_STATUS_CHANGE if allowed | TBD |
| Qualified | Meeting Scheduled | Yes, supported by stage sequence and tests | Email, Meeting Date, Meeting Time, Meeting Location/Store, Meeting Type; current screenshots also show required project/location fields | Confirmation Pending or Consultation Recommended default conflict; exact required sub-status TBD | No general reason confirmed | Meeting scheduled fields, not follow-up, are required | LEAD_STATUS_CHANGE / MEETING_SCHEDULED per workflow | Status updated to Meeting Scheduled per test evidence |
| Qualified | Converted | TBD | Conversion requirements not confirmed; Meeting Scheduled may be required first | TBD | TBD | TBD | OPP_CREATED if conversion occurs | TBD |
| Meeting Scheduled | Fresh Lead | TBD | Backward movement not confirmed | TBD | TBD | TBD | LEAD_STATUS_CHANGE if allowed | TBD |
| Meeting Scheduled | Connected | TBD | Backward movement not confirmed | TBD | TBD | TBD | LEAD_STATUS_CHANGE if allowed | TBD |
| Meeting Scheduled | Qualified | TBD | Backward movement not confirmed | TBD | TBD | TBD | LEAD_STATUS_CHANGE if allowed | TBD |
| Meeting Scheduled | Converted | Yes, supported by stage sequence and tests | Conversion prerequisites TBD; meeting details likely required but exact rule not confirmed | Initial Meeting visible for Converted rows | No confirmed general reason | No confirmed requirement | LEAD_STATUS_CHANGE and OPP_CREATED per workflow | Status updated to Converted; BM assignment entry per test evidence |
| Converted | Any prior stage | TBD | Backward movement not confirmed | TBD | TBD | TBD | LEAD_STATUS_CHANGE if allowed | TBD |

## Transition Notes

- The observed stage order is Fresh Lead -> Connected -> Qualified -> Meeting Scheduled -> Converted.
- Locator evidence shows status dropdown interaction with all stage values, but locator exploration alone does not prove business-valid transitions.
- Workflow states forward-only by default with backward override, but current UI evidence does not confirm this.
- `Convert to Opportunity` is visible on the Lead detail page, but enablement and exact conversion validations are not confirmed.
