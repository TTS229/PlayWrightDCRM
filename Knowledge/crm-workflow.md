# CRM Lead-to-Won Workflow

**Tinttone & Shade CRM · Reference v1.0 · June 2026**

---

## 1. Lead Creation

### Sources
| Source Type | Channel | How it enters CRM |
|---|---|---|
| Paid | Meta Lead Ads | Auto via webhook → creates Fresh Lead |
| Paid | Google Ads | UTM capture on website form |
| Organic | Website Form | Public API endpoint |
| Direct | Manual Entry | Agent creates in CRM UI |
| Referral | Manual Entry | Agent creates, marks referrer |
| Sheet | Google/Excel Sheet | Sheet integration sync |

### Fields Captured at Creation

| Field | Type | Required | Notes |
|---|---|---|---|
| `fullName` | string | ✅ | Contact name |
| `primaryPhone` | string | ✅ | Unique per org |
| `email` | string | ❌ | |
| `source` | enum | ✅ | Paid / Organic / Direct / Referral |
| `campaignSource` | enum | ❌ | Google / Meta / OTT / LinkedIn |
| `campaignId` | string | ❌ | Meta/Google campaign ID |
| `adSetId` | string | ❌ | Meta ad set |
| `adId` | string | ❌ | Meta ad |
| `keyword` | string | ❌ | Google Ads keyword |
| `utmSource` | string | ❌ | UTM parameter |
| `utmMedium` | string | ❌ | UTM parameter |
| `utmCampaign` | string | ❌ | UTM parameter |
| `utmContent` | string | ❌ | UTM parameter |
| `utmTerm` | string | ❌ | UTM parameter |
| `projectCity` | string | ❌ | Required before Connected |
| `budgetRange` | enum | ❌ | Required before Connected |
| `whatsAppConsent` | boolean | ❌ | Default false |
| `callingConsent` | boolean | ❌ | Default false |

**On creation:** Status = `Fresh Lead` · Sub-status = `Unassigned`

---

## 2. Lead Assignment

```
Fresh Lead / Unassigned
        ↓
  Auto or Manual Assignment
        ↓
  Sub-status → First Attempt Pending
  Owner = Inside Sales Agent (ISA)
```

**Auto Assignment:** Round-robin across available ISAs  
**Manual Assignment:** Admin/Manager selects agent  
**On assign:** Sub-status changes to `First Attempt Pending`, activity log entry `ASSIGNMENT` created

---

## 3. Lead Update — What Can Be Changed

These are all fields an agent can update on a lead after creation:

### Contact Info
| Field | Who Can Edit |
|---|---|
| `fullName` | All |
| `email` | All |
| `address` | All |
| `whatsAppConsent` | All |
| `callingConsent` | All |
| `rcsConsent` | All |

### Assignment & Ownership
| Field | Who Can Edit |
|---|---|
| `ownerId` | Admin, Manager (reassign) |
| `businessManagerId` | Admin, Manager |
| `storeId` | Admin, Manager |

### Project & Qualification Info
| Field | Who Can Edit |
|---|---|
| `projectCity` | All |
| `projectState` | All |
| `projectPincode` | All |
| `projectLocation` | All |
| `propertyName` | All |
| `propertyConfiguration` | All |
| `budgetRange` | All |
| `budget` | All |
| `requirementType` | All |
| `interiorRequirements` | All |

### Follow-up & Scheduling
| Field | Who Can Edit |
|---|---|
| `nextFollowUpDate` | All |
| `preferredMeetingDateTime` | All (required for Meeting Scheduled) |
| `meetingType` | All |

### Status & Classification
| Field | Who Can Edit |
|---|---|
| `status` | All (with validation — see §4) |
| `subStatus` | All (within allowed list for current status) |
| `source` | All |
| `campaignSource` | All |

> **Every field change creates a system activity log entry of type `LEAD_UPDATE`.**  
> Status changes create a separate `LEAD_STATUS_CHANGE` entry with old → new values.

---

## 4. Lead Status Workflow

### Status Progression

```
Fresh Lead
    ↓
Connected
    ↓
Qualified
    ↓
Meeting Scheduled
    ↓
Converted  ──────────────────────────→  Opportunity Created
```

> Forward-only by default. Backward transition only allowed with override flag.

---

### Status → Sub-Status Matrix

#### 🔵 Fresh Lead
| Sub-Status | Meaning | Default? |
|---|---|---|
| Unassigned | No agent assigned yet | On creation |
| First Attempt Pending | Assigned, not yet called | **Default on assign** |
| Assigned | Agent acknowledged | |
| Duplicate Suspected | Same number seen before | |
| Invalid Lead | Wrong number / spam | |
| RnR | Rest & Relax — revisit later | |

**Required fields to move to Connected:**
- `projectCity` · `leadSource` · `budgetRange`

---

#### 🟡 Connected
*Agent has made contact with the lead.*

| Sub-Status | Meaning | Default? |
|---|---|---|
| Follow Up | Continue follow-up | **Default** |
| Callback Requested | Lead asked to call back | |
| Busy | Could not talk now | |
| Late Handover | Lead came in too late to process | |
| Not Qualified | Does not meet criteria | |
| Junk | Not a genuine lead | |
| RnR | Rest & Relax | |

**Required fields to move to Qualified:**
- `projectCity` · `projectPincode` · `propertyName` · `budgetRange`
- `propertyConfiguration` · `requirementType` · `interiorRequirements`

---

#### 🟣 Qualified
*Lead meets qualification criteria.*

| Sub-Status | Meaning | Default? |
|---|---|---|
| Follow Up | Continue discussions | **Default** |
| Awaiting Confirmation | Waiting on lead response | |
| Lost Prospect | Lost interest | |
| Late Handover | Handed over late | |
| No Immediate Requirement | Interested but not now | |

**Required fields to move to Meeting Scheduled:**
- All Qualified fields +
- `preferredMeetingDateTime` · `meetingType`
- `storeId` *(if meeting type = Store Visit)*

---

#### 🟢 Meeting Scheduled
*Meeting booked with the lead.*

| Sub-Status | Meaning | Default? |
|---|---|---|
| Meeting Confirmed | Confirmed with lead | **Default** |
| Meeting Rescheduled | Date changed | |
| No Show | Lead did not attend | |
| Confirmation Pending | Awaiting lead confirmation | |
| Follow Up | Following up to confirm | |
| Lost Prospect | Lost before meeting | |

**Required fields to Convert to Opportunity:**
- All above fields confirmed
- Lead must be in `Meeting Scheduled` status

---

#### ✅ Converted
*Lead has attended first meeting. Opportunity is created.*

| Sub-Status | Meaning | Default? |
|---|---|---|
| Initial Meeting | First meeting done | **Default** |

---

## 5. Activity Area

Activities are logged against a lead at any point in the lifecycle.

### Activity Types — User Created

| Type | When Used |
|---|---|
| `NOTE` | Free-text note by agent |
| `CALL` | Manual call log entry |
| `MEETING` | Meeting log |
| `EMAIL` | Email correspondence note |
| `VISIT` | Site or store visit log |
| `FOLLOW_UP` | Follow-up action logged |
| `MEETING_SCHEDULED` | Meeting booking confirmation |

### Activity Types — System Generated

| Type | Trigger |
|---|---|
| `LEAD_STATUS_CHANGE` | Any status or sub-status change |
| `LEAD_UPDATE` | Any field update on lead |
| `ASSIGNMENT` | Lead assigned/reassigned |
| `REMINDER` | Follow-up reminder fires |
| `FOLLOW_UP_OVERDUE` | Follow-up date passed without update |
| `RULE_ACTION` | Automation rule executed |
| `OPP_CREATED` | Opportunity created from lead |

### Call Activity Fields (Exotel)
| Field | Description |
|---|---|
| `callType` | `incoming` / `outgoing` |
| `callStatus` | `queued` / `in-progress` / `completed` / `failed` / `busy` / `no-answer` |
| `callDuration` | Duration in seconds |
| `recordingUrl` | S3 URL to call recording |
| `providerCallId` | Exotel call reference ID |
| `callNote` | Agent note after call |

---

## 6. Convert Lead → Opportunity

### Conversion Trigger
When status reaches `Converted`, an opportunity is automatically created.

### Fields Carried Over from Lead to Opportunity
| Lead Field | Opportunity Field |
|---|---|
| `contact` | `contactId` |
| `leadId` | `leadId` (1:1 link) |
| `ownerId` | `ownerId` |
| `businessManagerId` | `businessManagerId` |
| `storeId` | `storeId` |
| `budgetRange` | `budgetRange` |
| `propertyConfiguration` | `propertyConfiguration` |
| `projectCity` | `projectCity` |

**On creation:** Opportunity Stage = `Visit Done`

---

## 7. Opportunity Stage Workflow

### Stage Progression

```
Visit Done
    ↓
Proposal Sent
    ↓
Followup
    ↓
Closure Meeting        ← Business Manager / Store Manager only
    ↓
Awaiting Payment       ← Business Manager / Store Manager only
    ↓
Closed Won             ← Business Manager / Store Manager only
    ↗
Closed Lost            ← Business Manager / Store Manager only (any stage)
```

---

### Opportunity Stage → Sub-Status Matrix

#### 🔵 Visit Done
*Client has visited / first meeting done.*

| Sub-Status | Meaning |
|---|---|
| Follow Up | Continue engagement |
| Revisit Scheduled | Second visit planned |
| Proposal Pending | Working on proposal |

**Fields to progress to Proposal Sent:**
- `sizeSqft` · `propertyConfiguration` · `budgetRange`

---

#### 🟡 Proposal Sent
*Quotation shared with client.*

| Sub-Status | Meaning |
|---|---|
| Awaiting Feedback | Waiting for client response |
| Follow Up | Continuing follow-up |
| Revision Requested | Client wants changes to quote |

**Linked Action:** Quotation must be in `Published` status

---

#### 🟠 Followup
*Active follow-up phase.*

| Sub-Status | Meaning |
|---|---|
| Follow Up | Regular follow-up |
| Awaiting Decision | Client deciding |
| Price Negotiation | Negotiating final value |

---

#### 🟣 Closure Meeting
*Final meeting to close the deal. BM/Store Manager only.*

| Sub-Status | Meaning |
|---|---|
| Meeting Scheduled | Closure meeting set |
| Meeting Done | Meeting completed |
| Follow Up | Post-meeting follow-up |

---

#### 🟤 Awaiting Payment
*Deal agreed, waiting for advance payment. BM/Store Manager only.*

| Sub-Status | Meaning |
|---|---|
| Payment Pending | Advance not received yet |
| Payment Partial | Partial advance received |
| Payment Received | Full advance confirmed |

**Required fields:**
- `finalAgreedValue` · `advanceAmount` · `discountPercentage`

---

#### ✅ Closed Won
*Deal closed successfully. BM/Store Manager only.*

**Required fields to close as Won:**
| Field | Description |
|---|---|
| `finalAgreedValue` | Final agreed project value |
| `closeDate` | Date deal closed |
| `commissionValue` | Commission amount |
| `advanceAmount` | Advance received |

**On close:** ERP project is created. Handover to Design team begins.

---

#### ❌ Closed Lost
*Deal lost. BM/Store Manager only.*

**Required fields to close as Lost:**
| Field | Options |
|---|---|
| `wonLostReason` | Budget Mismatch / Competitor / No Response / Timeline Mismatch / Quality Concern / Other |
| `lostReasonNote` | Free text elaboration |

---

## 8. Full End-to-End Workflow Summary

```
[Lead Source]
Meta Ads / Website / Google / Manual / Referral / Sheet
        │
        ▼
[Lead Created]
Status: Fresh Lead
Sub-status: Unassigned
        │
        ▼
[Assignment]
Auto round-robin ISA / Manual assign
Sub-status: First Attempt Pending
Activity: ASSIGNMENT logged
        │
        ▼
[First Contact]
Agent calls / WhatsApp
Sub-status updates (Follow Up / Callback / Busy)
Activity: CALL or NOTE logged
        │
        ▼
[Connected]
Status: Connected
Requires: projectCity, leadSource, budgetRange
        │
        ▼
[Qualification]
Status: Qualified
Requires: + propertyName, pincode, propertyConfiguration,
            requirementType, interiorRequirements
        │
        ▼
[Meeting Booked]
Status: Meeting Scheduled
Requires: + preferredMeetingDateTime, meetingType
Activity: MEETING_SCHEDULED logged
        │
        ▼
[Meeting Done]
Status: Converted
Sub-status: Initial Meeting
Activity: OPP_CREATED logged
        │
        ▼
════════════════════════════════════
         OPPORTUNITY CREATED
════════════════════════════════════
Stage: Visit Done
        │
        ▼
[Proposal]
Stage: Proposal Sent
Quotation created & published
Requires: sizeSqft, propertyConfiguration, budgetRange
        │
        ▼
[Negotiation]
Stage: Followup / Closure Meeting
BM/Store Manager takes over
        │
        ▼
[Payment]
Stage: Awaiting Payment
Requires: finalAgreedValue, advanceAmount
        │
     ┌──┴──┐
     ▼     ▼
  WON    LOST
Requires:  Requires:
finalAgreedValue  wonLostReason
closeDate  lostReasonNote
        │
        ▼
[ERP Handover]
Design workflow begins
```

---

## 9. Quotation States (linked to Opportunity)

```
Draft  →  Published  →  Client Approved
```

| State | Who Can Change | What It Means |
|---|---|---|
| `Draft` | Sales / BM | Being prepared, not shared |
| `Published` | BM / Store Manager | Shared with client |
| `Client Approved` | BM / Store Manager | Client has signed off |

### Key Quotation Fields
| Field | Description |
|---|---|
| `totalPreDiscount` | Total before any discount |
| `totalPostDiscount` | After line-item discounts |
| `woodCategoryDiscount` | Category-level wood discount |
| `additionalDiscountPct` | Extra % discount |
| `additionalDiscountFlat` | Extra flat discount amount |
| `transportationFee` | Logistics fee |
| `deepCleaningFee` | Post-installation cleaning |
| `floorProtectionFee` | Site protection fee |
| `platformFee` | Platform/service fee |
| `gstAmount` | GST applied |
| `finalTotal` | Final amount payable |

---

## 10. Role Restrictions Summary

| Action | ISA | Sales Exec | Business Manager | Store Manager | Admin |
|---|---|---|---|---|---|
| Create Lead | ✅ | ✅ | ✅ | ✅ | ✅ |
| Update Lead | ✅ | ✅ | ✅ | ✅ | ✅ |
| Assign Lead | ❌ | ❌ | ✅ | ✅ | ✅ |
| Convert Lead → Opp | ✅ | ✅ | ✅ | ✅ | ✅ |
| Move Opp to Closure Meeting | ❌ | ❌ | ✅ | ✅ | ✅ |
| Move Opp to Awaiting Payment | ❌ | ❌ | ✅ | ✅ | ✅ |
| Close Won | ❌ | ❌ | ✅ | ✅ | ✅ |
| Close Lost | ❌ | ❌ | ✅ | ✅ | ✅ |
| Publish Quotation | ❌ | ❌ | ✅ | ✅ | ✅ |
| View All Reports | ❌ | ❌ | ✅ | ✅ | ✅ |
| Manage Integrations | ❌ | ❌ | ❌ | ❌ | ✅ |

---

*End of Workflow Reference Document*
