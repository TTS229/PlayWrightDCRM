# Role Permission Matrix

Source basis: `knowledge/CURRENT_APPLICATION_BEHAVIOR.md`, `knowledge/GAP_ANALYSIS.md`, and `knowledge/UPDATED_BUSINESS_RULES.md`.

`Confirmed` means directly visible or explicitly documented in higher-priority evidence. `Workflow/PRD` means lower-priority policy exists but current UI evidence is incomplete. `TBD` means clarification is required before automation.

| Role | Create | Edit | Delete | Reassign | Stage Change | Convert | Upload File | Activity |
|---|---|---|---|---|---|---|---|---|
| ISA | Workflow/PRD says yes | Workflow/PRD says update lead yes | TBD | Workflow/PRD says no for assignment | Locator/test evidence says stage flow can be done by ISA | Workflow/PRD says yes; current role-specific UI not confirmed | Workflow/PRD says Pre-Sales can upload floor plan; current role-specific UI not confirmed | Locator/test evidence uses activity, role-specific permission TBD |
| Pre-Sales Manager | Locator evidence uses create flow | Locator evidence uses detail edit flow | TBD | Locator evidence shows owner selection/reassignment areas; exact permission TBD | Locator/test evidence supports stage work | Workflow/PRD says yes; current role-specific UI not confirmed | Workflow/PRD says Pre-Sales can upload floor plan; current role-specific UI not confirmed | Locator evidence supports activity posting |
| Store Head | Locator comment says create can be done by PSM/SM/SH | TBD | TBD | TBD | Locator comment says processing can be done by ISA/PSM/SM/SH | Workflow/PRD says yes; current UI not role-confirmed | TBD | TBD |
| Store Manager | Workflow/PRD says yes | Workflow/PRD says yes | TBD | Workflow/PRD says manager can reassign | Workflow/PRD says yes | Workflow/PRD says yes; conversion/meeting done by BM or Store Manager | Workflow/PRD says BM/Store Manager can upload floor plan | TBD |
| Sales Manager / Business Manager | Locator evidence includes Business Manager owner value; workflow says create/update yes | Workflow/PRD says yes | TBD | Workflow/PRD says manager can reassign | Workflow/PRD says yes | Workflow/PRD says BM can mark Meeting Done/Converted | Workflow/PRD says BM can upload floor plan | TBD |
| Admin | Workflow/PRD says yes | Workflow/PRD says yes | TBD | Workflow/PRD says yes | Workflow/PRD says backward moves admin-only, current UI not confirmed | Workflow/PRD says yes | TBD | TBD |
| Unassigned/System | No user action | No | No | System can auto-assign per evidence | No | No | No | System creates audit/timeline events |

## Permission Clarifications Required

- Delete permission is not evidenced for any role.
- Role-specific enablement for `Convert to Opportunity` is not visible in screenshots.
- Role-specific enablement for `Reassign Lead` is not visible in screenshots.
- Role-specific file upload permission is not visible in screenshots.
- Stage-change permission by role is not fully visible in screenshots.
- Activity posting permission by role is not fully visible in screenshots.
