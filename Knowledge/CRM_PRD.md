# DesignCRM — Product Requirements Document

> Living document. Updated module by module as requirements are clarified.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Data Model](#2-data-model)
3. [Lead Generation Flow](#3-lead-generation-flow)
4. [Lead Assignment Flow](#4-lead-assignment-flow)
5. [Post-Assignment Flow (Pre-Sales)](#5-post-assignment-flow-pre-sales)
6. [Opportunity Flow (BM / Store Manager)](#6-opportunity-flow-bm--store-manager)
7. [Rule Engine](#rule-engine)

---

## 1. Product Overview

An end-to-end CRM for interior design organisations. Supports multi-store, multi-city operations in India and Dubai. Each country runs as a separate organisation instance. Organisations can have stores across cities within their country.

**Target users:** Pre-Sales (ISA/CC) agents, Pre-Sales Managers, Sales Managers (Business Managers), Designers, Leadership.

---

## 2. Data Model

4-tier pipeline:

```
Contact → Lead → Opportunity → Project
```

| Record | Purpose |
|---|---|
| **Contact** | Deduplicated person record. Matched by primary phone or email. |
| **Lead** | Inquiry / pre-sales record. Owned by Pre-Sales team. |
| **Opportunity** | Sales record. Created on Lead conversion (visit booked). |
| **Project** | Delivery record. Auto-created when Opportunity is marked Booked/Won. |

---

## 3. Lead Generation Flow

### 3.1 Source

Website visitor submits an inquiry form. Website posts lead data (with attribution) to the CRM public lead endpoint.

### 3.2 Mandatory Fields

| Field | Notes |
|---|---|
| Name | Full name of the visitor |
| Primary Phone | Used for Contact deduplication |
| Property Location | City dropdown — drives Pre-Sales assignment |
| Property Type / Configuration | Type of property (e.g., 2BHK, Villa, etc.) |
| Channel | Marketing channel (e.g., Digital, Walk-in) |
| Source | Traffic source (e.g., Google, Facebook) |
| Campaign Source | Campaign name/ID |
| Lead Source | Broad source category |
| Landing Page URL | Page the lead came from |

### 3.3 Attribution Fields

- Channel
- Source
- Campaign Source
- Lead Source
- Landing Page URL

### 3.4 Referral Tracking

Pre-Sales agents can mark a referral on an existing lead record after it is created. Fields captured:

- Referral Name
- Referral Phone Number
- Referral Customer ID (existing Contact/Customer)

Referral data is used for reporting and bonus tracking. CRM tracks the data only — bonus processing is handled outside the CRM.

### 3.5 Duplicate / Re-enquiry Logic

On every new lead submission, the system checks for an existing Contact with the same primary phone number.

**Decision tree:**

```
Same phone found?
├── No  → Create new Contact + new Lead
└── Yes → Check existing open Lead(s) under Contact
    ├── Lead exists AND submitted within re-enquiry window
    │   AND same property location
    │   AND Lead not yet converted to Opportunity (or Opp not Closed Won)
    │   → Update re-enquiry count + re-enquiry date on existing Lead (no new Lead)
    ├── Lead exists BUT property location is different
    │   → Create new Lead under existing Contact
    ├── Lead already converted to Opportunity OR Opportunity is Closed Won
    │   → Create new Lead under existing Contact
    └── Lead exists BUT submitted after re-enquiry window expires
        → Create new Lead under existing Contact
```

**Re-enquiry window:** Configurable per organisation (admin panel). Default TBD.
**Long-gap window:** If re-submission occurs after 6–10 months, a new Lead is always created regardless of other conditions. This range is configurable per org.

> **Rule Engine:** Re-enquiry logic (all conditions above) is implemented as a configurable rule. See [Rule Engine → RE-01](#re-01-re-enquiry--duplicate-lead-logic).

### 3.6 Post-Creation Notification

After a lead is created and assigned, a web push / in-app notification is sent to the assigned Pre-Sales agent only. No notification to the submitter at this stage.

---

## 4. Lead Assignment Flow

### 4.1 Assignment Model

- Pre-Sales agents are tagged to a **city** (and a store within that city) in the Admin Panel.
- Assignment is based on the **Pre-Sales agent's assigned city**, matched against the lead's **Property Location** city.
- The Pre-Sales team for a city also has a **Pre-Sales Manager**.

### 4.2 PAN India vs City-Specific Mode

Configurable per organisation via a toggle in the Admin Panel.

| Mode | Behaviour |
|---|---|
| **City-Specific** | Lead is assigned to the Pre-Sales pool of agents tagged to the matching city. |
| **PAN India** | All Pre-Sales agents across all cities form one shared pool. City matching is ignored. |

**Switching modes:**
- System offers both **auto re-map** (system maps agents to cities based on their tagged city) and **manual re-map** (admin maps agents manually) when switching from PAN India → City-Specific.
- Admin chooses which method to apply.

### 4.3 City Fallback (No Agents for a City)

When City-Specific mode is active and no Pre-Sales agents are tagged to the lead's city, two fallback options are configurable in Admin Panel:

1. **Fallback to PAN India pool** — route lead to the full agent pool.
2. **Fallback to a specific city's pool** — route lead to a designated fallback city's agents.

> **Rule Engine:** Fallback routing is configured as a rule. See [Rule Engine → AS-02](#as-02-city-fallback-routing).

### 4.4 Round-Robin Assignment Logic

Leads are assigned via a cyclic round-robin across available agents in the pool.

**Cap behaviour:**
- Each agent has a configurable **lead cap** (max active assigned leads).
- Active lead count = leads in any status except **Junk** and **Lost** (and optionally Converted — see below).
- Converted leads (lead became an Opportunity) count against the agent's cap. Whether converted leads are freed from cap is **configurable per org via rule engine**.
- Round-robin cycles A → B → C → A…, **skipping** any agent who has hit their cap.
- If ALL agents in the pool have hit their cap, the next agent in rotation still receives the lead (cap is a soft limit — assignment continues over-limit).

**Cap configuration:** Configurable per org (and optionally per agent). Admin Panel.

> **Rule Engine:** Cap counting rules (which statuses count against cap) are configurable. See [Rule Engine → AS-03](#as-03-cap-counting-rules).

### 4.5 Agent Availability

**Leave / inactive:**
- Pre-Sales Manager can mark an agent as **On Leave** via the Admin Panel.
- Agents marked On Leave are skipped in round-robin (treated as if at cap).
- When marked On Leave, the manager has the option to **redistribute** the agent's active leads to other agents in the pool.
- Manager can reassign any individual lead to a different Pre-Sales agent at any time.

**Deactivated agent:**
- If an agent's account is deactivated, their leads are automatically flagged for redistribution.
- Manager is notified and can action redistribution.

---

## 6. Opportunity Flow (BM / Store Manager)

### 6.1 Opportunity Creation

Triggered automatically when a Lead is marked **Meeting Done / Converted** (by BM or Store Manager).

**Fields copied from Lead to Opportunity:**
- Basic qualification fields (City, Project Type, Configuration, Budget Amount, Budget Range, Possession Date, Requirement Type, Project Description)
- Floor Plan (availability flag + uploaded file if present)
- Meeting details (Date, Time, Location, Type)

**Initial Opportunity stage:** `Visit Done`

### 6.2 Opportunity Stage Pipeline

```
Visit Done
    ↓  (quote created — sub-status updated, stage stays)
    [Sub-status: Proposal Created]
    ↓  (quote sent to client — auto-triggered by system)
Proposal Sent
    ↓  (auto — if no stage change within 24 hours)
Follow Up
    ↓  (BM or Store Manager only)
In-Discussion
    ↓  (BM or Store Manager only)
Closed Won  /  Closed Lost
```

### 6.3 Stage Rules

| Transition | Trigger | Who |
|---|---|---|
| Visit Done → sub-status "Proposal Created" | Quote created in system | Auto |
| Visit Done → Proposal Sent | BM clicks **Send to Client** CTA on quote | Auto (triggered by send action) |
| Proposal Sent → Follow Up | No stage change within 24 hours | Auto (rule engine) |
| Any → In-Discussion | Manual | BM or Store Manager only |
| Any → Closed Won | Manual | BM or Store Manager only |
| Any → Closed Lost | Manual | BM or Store Manager only |
| Any backward stage move | Manual | Admin only |

> **Rule Engine:** See [Rule Engine → OPP-01](#opp-01-proposal-sent-to-follow-up-auto-move).

**Permissions:**
- In-Discussion, Closed Won, Closed Lost: BM and Store Manager only (role permission flag).
- Backward stage moves: Admin only.

### 6.4 Quote / Proposal

- Quote (Quotation record) created within CRM, linked to the Opportunity.
- On quote creation → sub-status on Visit Done updates to **Proposal Created** (auto).
- BM clicks **Send to Client** → quote delivered to client + stage auto-moves to **Proposal Sent**.
- If another quote is sent while in Follow Up stage → stage does **not** revert to Proposal Sent; remains Follow Up.

### 6.5 Closed Won — Pre-conditions

The following must be satisfied before an Opportunity can be marked **Closed Won**:

| # | Condition / Field | Where captured | Notes |
|---|---|---|---|
| 1 | One active Quotation marked **Client Approved** | Quotation record | Currently: BM manually marks approved. Future: client approves via Customer Dashboard. |
| 2 | **PAN** | Contact — Contact tab on Opp page | Mandatory for all |
| 3 | **GST Number** | Contact — Contact tab on Opp page | Mandatory only if Customer Type = B2B |
| 4 | **Full Name** (First, Middle, Last) | Contact — Contact tab on Opp page | — |
| 5 | **Shipping Address** | Opportunity — separate field | Client's current residential address (distinct from project/property address which is still under construction) |
| 6 | **Booking Agreement** | Opportunity — file upload | BM uploads scanned signed PDF manually |

**Customer Type (B2B / B2C):** Field on the **Contact** object. Updated in the Contact tab on the Opportunity page before payment collection or Closed Won.

**Where to update before Closed Won:** BM fills PAN, GST, name, Customer Type via the **Contact tab** on the Opportunity page. Shipping Address is on the Opportunity record.

### 6.5a Closed Won → Project Creation

On Closed Won (all pre-conditions met):
1. **Project record auto-created** and linked to the Opportunity.
2. Project represents the delivery phase. _Project module details TBD._

**Order Book Value:** Sourced from `finalAgreedValue` on the Opportunity at the point of Closed Won (or when a quote is accepted by the client — whichever comes first). This value feeds BM's Order Book Value KPI.

### 6.6 Opportunity Sub-Statuses

**Lost Reasons (mandatory on Closed Lost):**

- Price Too High
- Competitor
- Not Ready
- Budget Constraint
- No Response
- Other

> No "Won Reason" required.

**Proposed sub-statuses per stage (for review):**

| Stage | Proposed Sub-Statuses |
|---|---|
| **Visit Done** | Site Visit Completed, Consultation Done, Proposal Creating, Proposal Created _(auto)_, Revisit Scheduled |
| **Proposal Sent** | Awaiting Client Response, Under Review, Revision Requested |
| **Follow Up** | Follow-up Scheduled, Callback Requested, Client Reviewing, Not Responding |
| **In-Discussion** | Negotiating Price, Design Review, Contract Drafting, Final Discussions |
| **Closed Won** | _(no sub-status / reason required)_ |
| **Closed Lost** | **Reason mandatory** — see Lost Reasons list below |

**Closed Lost — mandatory reason field:**
- Price Too High
- Competitor
- Not Ready
- Budget Constraint
- No Response
- Other

> **Action required:** Review and confirm/edit the proposed sub-statuses above.

---

## 7. Implementation Gap List

> Tracks what is documented in this PRD but not yet built. Update status as work completes.
>
> **Note on city:** `city` is a direct field on the User model (identity service). Pre-Sales agents are city-based — their assigned city drives routing independently of store. BMs are store-based — their effective city is derived from their primary store. Both models coexist: Pre-Sales use `user.city`; BM assignment uses `UserStore.isPrimary → store.city`.

---

### 7.1 Schema Changes (DB migrations required)

| # | Model | Change | Service |
|---|---|---|---|
| S-01 | Lead | Add `hasFloorPlan Boolean @default(false)` | CRM |
| S-02 | Lead | Add `channel String?` | CRM |
| S-03 | Lead | Add `referralName String?` | CRM |
| S-04 | Lead | Add `referralPhone String?` | CRM |
| S-05 | Lead | Add `referralCustomerId String?` | CRM |
| S-06 | Opportunity | Add `shippingAddress String?` | CRM |
| S-07 | Quotation | Add `isClientApproved Boolean @default(false)` | CRM |
| S-08 | Quotation | Add `sentToClientAt DateTime?` | CRM |
| S-09 | UserStore _(identity)_ | Add `isPrimary Boolean @default(false)` | Identity |

---

### 7.2 Backend Logic

**Legend:** `[RE]` = implementable via Rule Engine config | `[CODE]` = requires hardcoded system logic

#### Lead Assignment
| # | Type | Gap | Notes |
|---|---|---|---|
| B-01 | `[CODE]` | PAN India vs City-Specific mode toggle | Org-level config flag; drives routing in assignment service |
| B-02 | `[CODE]` | City fallback routing | Deterministic routing logic in assignment service; org-configurable option |
| B-03 | `[CODE]` | Per-agent / per-org configurable cap | Currently global env var; needs per-org DB storage |
| B-04 | `[CODE]` | Auto + manual re-map on mode switch | Admin-triggered operation; not rule-based |

#### Re-enquiry
| # | Type | Gap | Notes |
|---|---|---|---|
| B-05 | `[RE]` | Configurable re-enquiry window per org | Rule condition: time since last lead < window threshold |
| B-06 | `[RE]` | Full re-enquiry decision tree | Rule with conditions: same phone + window + same city + opp status → action: update count or create new lead |

#### BM Auto-assignment
| # | Type | Gap | Notes |
|---|---|---|---|
| B-07 | `[RE]` | Auto-assign BM on Meeting Scheduled stage change | Rule trigger: lead stage = Meeting Scheduled → action: assign role (BM) from store pool |
| B-08 | `[CODE]` | Primary store scoping for BM pool | Assignment service logic; requires S-09 |

#### Opportunity Stage Automation
| # | Type | Gap | Notes |
|---|---|---|---|
| B-09 | `[CODE]` | "Send to Client" sets `sentToClientAt` + auto-moves to Proposal Sent | Side-effect on quotation send endpoint; not rule-based |
| B-10 | `[RE]` | Auto sub-status → Proposal Created on quote creation | Rule trigger: quotation created → action: set lead/opp sub-status |
| B-11 | `[RE]` | Auto-move Proposal Sent → Follow Up after 24hrs | Rule OPP-01; rule engine ready, rule not yet configured |

#### Validations (all `[CODE]` — stage-transition guards in service layer)
| # | Gap | Notes |
|---|---|---|
| B-12 | Email mandatory before Meeting Scheduled | Stage-transition guard in leads.service.ts |
| B-13 | Next follow-up date mandatory for: Callback Requested, Follow-up Pending, No Immediate Requirement, First Attempt Pending | subStatus update guard |
| B-14 | Lost/Junk reason mandatory when sub-status = Not Qualified / Junk / Lost | subStatus update guard |
| B-15 | Closed Won pre-condition checks: active client-approved quote, PAN, name, shipping address, booking agreement | Stage-transition guard; requires S-06, S-07 |

#### Permissions (all `[CODE]` — role guards in service layer)
| # | Gap | Notes |
|---|---|---|
| B-16 | Only BM / Store Manager can set Opp stage to In-Discussion, Closed Won, Closed Lost | Role check on Opp stage update |
| B-17 | Only Admin can move Opp stages backward | Role check on Opp stage update |

---

### 7.3 Admin Panel UI

| # | Gap | Depends on |
|---|---|---|
| A-01 | Assignment mode toggle (PAN India ↔ City-Specific) per org | B-01 |
| A-02 | City fallback config | B-02 |
| A-03 | Agent on-leave management — mark on leave, set date, redistribute leads | — |
| A-04 | Lead redistribution UI — reassign leads from on-leave / deactivated agent | — |
| A-05 | Target setting — Pre-Sales (per agent, monthly/quarterly: Meetings Scheduled + Done) | — |
| A-06 | Target setting — BM (per agent: Meeting Done, Order Book Count, Order Book Value) | — |
| A-07 | Primary store designation on user–store assignment | S-09 |

---

### 7.4 CRM Frontend UI

| # | Gap | Depends on |
|---|---|---|
| F-01 | Floor plan toggle + file upload on Lead page (Pre-Sales + BM) | S-01 |
| F-02 | Floor plan toggle + upload on Opportunity page | S-01 |
| F-03 | Referral fields on Lead (Name, Phone, Customer ID) | S-03–S-05 |
| F-04 | Channel field on lead form | S-02 |
| F-05 | Shipping Address field on Opportunity (Contact tab) | S-06 |
| F-06 | "Send to Client" CTA on Quotation | B-09, S-08 |
| F-07 | `isClientApproved` toggle on Quotation | S-07 |
| F-08 | Opp sub-status map (Visit Done, Proposal Sent, Follow Up, In-Discussion) | — |
| F-09 | Stage permission enforcement in UI (disable Won/Lost/In-Discussion for non-BM/SM) | B-16 |

---

### 7.5 Rule Engine Items to Configure

These require no new code — they can be set up via the Rule Engine UI once the rule engine frontend is complete:

| Rule | Trigger | Config needed |
|---|---|---|
| B-05 / RE-01 | New lead submitted | Re-enquiry window duration (org setting) |
| B-06 / RE-01 | New lead submitted | Conditions: same phone, city match, opp status, time window |
| B-07 / AS-BM | Lead stage → Meeting Scheduled | Action: assign BM from store pool (role = business_manager) |
| B-10 | Quotation created | Action: set opp sub-status = Proposal Created |
| B-11 / OPP-01 | 24hrs after stage = Proposal Sent, no change | Action: move stage to Follow Up |

---

### 7.6 Recommended Implementation Order

```
Phase 1 — Schema (unblocks everything)
  S-01 to S-09  →  one migration per service (CRM + Identity)

Phase 2 — Backend (can run in parallel tracks)
  Track A: Validations   B-12 → B-13 → B-14 → B-15
  Track B: Permissions   B-16 → B-17
  Track C: Assignment    B-01 → B-02 → B-03 → B-04 → B-08

Phase 3 — Rule Engine configs  (after rule engine UI is live)
  B-05, B-06, B-07, B-10, B-11

Phase 4 — Frontend (parallel once backend is ready)
  Track A (CRM frontend): F-01 → F-02 → F-03 → F-04 → F-05 → F-06 → F-07 → F-08 → F-09
  Track B (Admin panel):  A-07 → A-03 → A-04 → A-01 → A-02 → A-05 → A-06
```

---

## Rule Engine

All rules below are configurable via the Rule Engine UI. Unless noted, org admins can enable/disable and modify conditions.

---

### RE-01 — Re-enquiry / Duplicate Lead Logic

**Trigger:** New lead submission (public endpoint).

**Conditions (all configurable):**

| Condition | Default |
|---|---|
| Same primary phone exists on a Contact | — |
| Submission within re-enquiry window | Org-configurable duration |
| Same property location city | — |
| Existing lead not converted to Opportunity | — |
| Opportunity (if exists) not Closed Won | — |
| Submission within long-gap window (6–10 months) | Org-configurable range |

**Actions:**
- Update re-enquiry count + date on existing lead (no new lead), OR
- Create new lead under existing Contact (based on which conditions match).

**Cannot be done on Rule Engine:** The branching decision tree itself (which action fires based on which combination of conditions) is system-level logic. The rule engine exposes the configurable thresholds (re-enquiry window, long-gap window) and the on/off toggle for each condition check.

---

### AS-01 — Assignment Mode

**Trigger:** New lead created.

**Conditions:** Organisation assignment mode = PAN India or City-Specific.

**Actions:** Route to correct agent pool.

---

### AS-02 — City Fallback Routing

**Trigger:** New lead created in City-Specific mode AND no active agents tagged to the lead's city.

**Actions (admin chooses one):**
- Assign from PAN India pool.
- Assign from a specific configured fallback city's pool.

---

### AS-03 — Cap Counting Rules

**Trigger:** Before each round-robin assignment, when calculating agent's active lead count.

**Configurable conditions:**

| Lead Status | Count against cap? | Default |
|---|---|---|
| Junk | No | Fixed |
| Lost | No | Fixed |
| Converted to Opportunity | Yes | Configurable |
| All other open statuses | Yes | Fixed |

---

### AS-04 — Over-Cap Behaviour

**Trigger:** All agents in pool are at cap.

**Action:** Continue assigning in round-robin order (over-limit). Alert Pre-Sales Manager.

---

### AS-05 — Agent On-Leave Redistribution

---

### OPP-01 — Proposal Sent → Follow Up Auto-Move

**Trigger:** Opportunity stage = Proposal Sent AND no stage change for 24 hours.

**Action:** Auto-move stage to Follow Up.

**Configurable:** 24-hour window is org-configurable.

---

### QF-01 — Qualification Percentage Auto-Calculation

**Trigger:** Qualification field updated on a lead.

**Conditions:** Configured set of criteria (10–15, org-configurable) — each criterion is a filled qualification field or a threshold met (e.g., budget > X).

**Action:** Auto-calculate and update `qualificationPercentage` on the lead.

**Current state:** Manual (agent sets %). Rule engine automation is a future enhancement.

---

## 5. Post-Assignment Flow (Pre-Sales)

### 5.1 Pre-Sales Targets

- KPIs tracked: **Meetings Scheduled** and **Meetings Done**.
- **Agent targets:** Set individually per agent by the Pre-Sales Manager, monthly or quarterly.
- **Manager targets:** Based on their team's aggregate Meetings Scheduled + Meetings Done.
- Targets **reset to zero** at the start of each new period (no carry-forward of shortfall).
- Manager can also mark agents as On Leave (see [§4.5](#45-agent-availability)).

### 5.2 Calling

After assignment, the Pre-Sales agent contacts the lead via phone.

**Call mode — configurable per organisation (Admin Panel):**

| Mode | Behaviour |
|---|---|
| **Exotel Click-to-Dial** | Agent clicks to dial from within the CRM; call is routed via Exotel. |
| **Normal Call** | Agent dials manually on their own device; CRM provides the number to call. |

### 5.3 Lead Stage Progression

```
New / Assigned
    ↓  (call placed)
Calling
    ↓  (call picked up)
Connected
    ├── Not Qualified  →  [Connected - Not Qualified]  (no further Pre-Sales action required)
    └── Qualified
            ├── No meeting commitment yet  →  [Qualified]
            └── Client gives meeting date/time/location/type  →  [Meeting Scheduled]
                        ↓  (client visits store — marked by Pre-Sales agent)
                    [Meeting Done / Converted]
                        ↓
                    Opportunity Created  ←  Pre-Sales involvement ends here
```

> **Note:** "Not Connected" call handling — see open questions below (§5.6).

### 5.4 Call Outcome — Connected

Agent marks the call as **Connected** and captures qualification details.

**Qualification fields:**

| Field | Type | Mandatory |
|---|---|---|
| City | Dropdown | Yes |
| Property Name | Text | Yes |
| Project Type | Dropdown (e.g., Residential, Commercial) | Yes |
| Configuration | Dropdown (e.g., 1BHK, 2BHK, Villa) | Yes |
| Budget Amount | Number | Yes |
| Budget Range | Dropdown (e.g., 10L–25L) | Yes |
| Possession Date | Date | Yes |
| Requirement Type | Dropdown: Full Home Interior / Only Modular Kitchen / Partial Home Interiors | Yes |
| Project Description | Long Text | Yes |
| Timeline | Dropdown / Date | No (kept on lead, excluded from mandatory list) |

**Qualification Percentage:**
- Currently set **manually** by the Pre-Sales agent.
- Scoring is based on the 9 qualification fields above. Number of criteria contributing to the score is **org-configurable (10–15 total criteria)**.
- Future: rule engine auto-calculates % as fields are filled.

> **Rule Engine:** See [Rule Engine → QF-01](#qf-01-qualification-percentage-auto-calculation).

### 5.5 Lead Stage & Sub-Status Map

**Lead pipeline stages (in order):**

`Fresh Lead → Connected → Qualified → Meeting Scheduled → Converted`

Sub-statuses are stage-scoped. Pre-Sales agent selects from the sub-statuses available for the current stage.

| Stage | Sub-Statuses |
|---|---|
| **Fresh Lead** | Unassigned, First Attempt Pending, Duplicate Suspected, Invalid Lead |
| **Connected** | Requirement Discussion, Callback Requested, Follow-up Pending, Interested, Exploring Options, No Immediate Requirement, Not Qualified, Junk |
| **Qualified** | Consultation Recommended, Follow-up Ongoing, Considering Options, Discussing Internally, Awaiting Confirmation |
| **Meeting Scheduled** | Store Visit Scheduled, Site Visit Scheduled, Confirmation Pending, Rescheduled, No Show, Lost |
| **Converted** | Walk-in Completed, Opportunity Created |

**Cap exclusions:** Leads with sub-status **Junk** or **Lost** do not count against the agent's cap.

---

### 5.5a Disposition Scenarios & Field Rules

The following scenarios drive mandatory field capture when specific sub-statuses are selected.

#### Scenario → Sub-Status Mapping

| # | Scenario | Mapped Sub-Status(es) | Stage |
|---|---|---|---|
| 1 | Ongoing discussion; RNR follow-ups in progress | Callback Requested, Follow-up Pending, First Attempt Pending | Fresh Lead / Connected |
| 2 | Has requirement but possession/handover is later | No Immediate Requirement | Connected |
| 3 | Lead connected but Lost / Junk / Not Serviceable | Not Qualified, Junk, Lost | Connected / Meeting Scheduled |
| 4 | Answered but currently busy; callback needed | Callback Requested | Connected |
| 5 | Has requirement but no immediate need | No Immediate Requirement | Connected |

#### Mandatory Fields by Scenario

| Scenario | Mandatory Additional Fields |
|---|---|
| 1 — Ongoing / RNR | Next Follow-up Date, Next Follow-up Time |
| 2 — Future requirement | Next Follow-up Date, Next Follow-up Time |
| 3 — Lost / Junk / Not Serviceable | Lost/Junk Reason (see below) |
| 4 — Currently busy | Next Follow-up Date, Next Follow-up Time |
| 5 — No immediate requirement | Next Follow-up Date, Next Follow-up Time |

#### Lost / Junk / Not Interested Reason (dropdown — appears when sub-status = Not Qualified / Junk / Lost)

- No Requirement
- Junk Lead
- Dropped Interior Plans
- Non-Serviceable Location
- Non-Serviceable Scope
- Budget Issue
- Invalid Number
- Searching for Property
- Commercial / Vendor
- Repeated Lead
- Major Civil Works
- Minimal Scope
- Booked with Others
- Continuous RNR
- Others

### 5.6 Meeting Scheduling

When a qualified lead commits to a meeting, agent captures:

| Field | Type | Notes |
|---|---|---|
| Meeting Date | Date picker | — |
| Meeting Time | Time picker | — |
| Meeting Location | Dropdown | Store list sourced from Identity Service |
| Meeting Type | Dropdown | Store Visit / Site Visit / Virtual |

**Mandatory fields to advance to Meeting Scheduled stage:**
- All qualification fields (§5.4)
- **Email ID** (must be captured before marking Meeting Scheduled)
- Meeting Date, Meeting Time, Meeting Location, Meeting Type

Stage moves to **Meeting Scheduled**.

### 5.6a Floor Plan

A field on the lead to track floor plan status and allow file upload.

| Field | Type | Notes |
|---|---|---|
| Floor Plan Available | Toggle / Dropdown (Yes / No) | Tracks whether client has shared a floor plan |
| Floor Plan File | File upload | PDF or image; uploadable by Pre-Sales Agent and Business Manager |

---

### 5.7 Business Manager (BM) Assignment

Once a lead reaches **Meeting Scheduled**, a Business Manager is assigned **automatically**.

**Assignment process:** Identical to Pre-Sales agent assignment — same round-robin and cap logic (see [§4.4](#44-round-robin-assignment-logic)).

**Store-based assignment rule:**
- BMs are assigned based on **store** (not city).
- BMs can be tagged to multiple stores; assignment uses **primary store only**.
- BM's primary store must match the meeting location store on the lead.

**Manual override:** Store Manager can manually reassign the BM at any time.

**No store assigned — BM:** BM with no primary store is excluded from auto-assignment. Only reachable via manual assignment. Admin panel should warn when a BM has no store assigned.

**No store assigned — Pre-Sales (city-specific mode):** Agent excluded from all city pools. Leads for their city fall through to city fallback logic. In PAN India mode, agent is included (pool is role-based, not store-scoped). Admin panel should warn when a Pre-Sales agent has no store assigned.

**BM Targets / KPIs:**
- Meeting Done Count
- Order Book Count
- Order Book Value

> **Rule Engine:** BM assignment follows the same rule set as Pre-Sales assignment (AS-01 through AS-05), applied at the Meeting Scheduled stage trigger with store-based pool scoping.

---

### 5.7a Conversion — Meeting Done

When the lead physically visits the store, the lead is marked **Meeting Done / Converted**. This can be done by:
- The assigned **Business Manager**, or
- The **Store Manager**.

This triggers:
1. Lead status → **Converted**.
2. **Opportunity auto-created** — carries over qualification and lead fields (full field mapping in codebase).
3. Pre-Sales team has **no further involvement** after this point.

### 5.8 Call Outcome — Not Connected

- Agent manually logs the attempt and schedules a callback.
- No system-enforced max retry count — fully manual process.
- Once Exotel integration is live, call attempts (missed/not answered) will be auto-logged via Exotel call logs.

**Trigger:** Agent marked On Leave.

**Actions:**
- Skip agent in round-robin.
- Optionally redistribute active leads (manager-triggered, auto or manual).
