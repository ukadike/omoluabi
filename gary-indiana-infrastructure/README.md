# Gary, Indiana — Energy Reliability + Flock Infrastructure

**A living Omoluabi source desk for civic infrastructure reliability, recovery, and surveillance-system resilience**

Status: **OPEN / DEVELOPING**  
Last substantive review: **2026-09-03**

## Purpose

This dossier uses Gary, Indiana's August 2026 power crisis as an Omoluabi proof-of-method case.

It asks a deliberately comparative question:

> **When a city is under infrastructure stress, which systems fail, which systems remain available, how quickly are they restored, and who controls the systems designed to remain resilient?**

The inquiry covers two connected but evidentially distinct layers:

1. **Residential and civic energy reliability** — outage scale, duration, restoration, traffic signals, communications, schools, fuel access, charging, and emergency services.
2. **Surveillance and public-safety infrastructure** — Gary's Real-Time Crime Center, license-plate recognition, Flock cameras, fixed surveillance, connectivity, backup power, and operational continuity.

The comparison is useful only if Omoluabi keeps **technical possibility separate from demonstrated operation**.

## Current evidence map

| Claim edge | Status | Omoluabi note |
|---|---|---|
| August 11, 2026 severe storm → widespread Gary power disruption | **CONFIRMED** | City of Gary and Indiana emergency-management records document widespread outages and storm damage. |
| Gary outage → prolonged restoration affecting a large share of customers | **REPORTED / STRONGLY SUPPORTED** | Credible reporting documents tens of thousands still without service many days after the storm. |
| Gary Police Department → RTCC + surveillance cameras + fixed/mobile LPR | **CONFIRMED** | Gary's official RTCC page describes these systems. |
| Gary Police Department → Flock cameras | **CONFIRMED** | Official Lake County commissioners' minutes describe Gary PD as having an "extensive array" of Flock cameras. |
| Flock architecture → solar/battery + cellular operation | **CONFIRMED AS VENDOR-DESCRIBED CAPABILITY** | Flock states that its camera architecture can use solar/battery power and cellular data. This is a product capability, not proof of Gary-specific uptime. |
| Gary Flock cameras → remained operational during the August blackout | **NOT ESTABLISHED** | Device-specific uptime, power-state, network-health, and RTCC access records are still needed. |
| Gary government → prioritized surveillance electricity over residents | **NOT ESTABLISHED** | Different subsystems may have different power architectures. Persistence alone would not prove a policy choice or diversion of residential power. |

## The infrastructure-asymmetry question

Omoluabi should not begin with the headline **"surveillance stayed on while residents lost power."** That has not been established.

Instead, it should test the narrower proposition:

> **Did any public-safety surveillance nodes maintain autonomous power and communications during the same period that nearby residential or civic systems were unavailable?**

If the answer is yes, the next questions are architectural and civic:

- What powered each node: grid, solar, battery, UPS, generator, or another source?
- What communications path remained: cellular LTE, municipal network, wired backhaul, or other?
- Did the camera remain powered but lose network connectivity?
- Did the RTCC remain able to receive, search, or act on data?
- What maintenance or battery-replacement events occurred during the outage?
- Were traffic signals, emergency charging sites, cooling centers, communications hubs, and medically essential household loads afforded comparable resilience?
- Who decided which systems received redundant power and communications?

This is the evidence threshold between **infrastructure difference** and **infrastructure asymmetry**.

## Preliminary timeline

### August 11, 2026 — severe storm

Gary reports widespread disruption from severe weather including power outages, downed trees and power lines, flooding, and structural damage. Indiana emergency-management reporting says more than 300,000 customers were without power statewide at peak, with the majority of outages in Lake and Porter counties.

### August 18, 2026 — restoration still underway

Gary's storm-recovery update described extensive system-wide NIPSCO restoration work and continuing assessment of larger service areas.

### August 20, 2026 — large Gary outage persists

Chicago Sun-Times reporting, citing utility figures, said more than **22,000 of approximately 35,800 Gary customers — about 61% — remained without power**.

### Late August 2026 — recovery continues

Regional reporting documented households and businesses remaining without power well beyond the initial storm period. Omoluabi should build a circuit- and neighborhood-level restoration timeline rather than treating a system-wide restoration percentage as a Gary-specific endpoint.

## What is confirmed about Flock in Gary

Gary's official Real-Time Crime Center describes an integrated public-safety system using surveillance cameras, fixed and mobile license-plate recognition, CAD, shot-detection technology, and other law-enforcement databases.

Separately, official Lake County commissioners' minutes from July 17, 2024 record a county law-enforcement presentation stating that **"Gary PD has an extensive array" of Flock cameras** while Lake County considered joining the Flock network.

Flock's own technical FAQ describes solar/battery power and cellular connectivity as part of its camera architecture.

Those three propositions do **not** establish that Gary's Flock network remained operational during the August 2026 outage. That requires operational records.

## Priority records

The strongest next evidence would be:

- NIPSCO outage and restoration data for Gary at the circuit, feeder, substation, and neighborhood level for August 11–25, 2026;
- Gary RTCC uptime, dispatch-access, system-health, outage, maintenance, and incident logs for the same period;
- Flock camera inventory, model, location, installation date, power configuration, connectivity configuration, and maintenance status;
- Flock device-health / heartbeat / uptime records and battery or solar telemetry held by Gary or its vendor;
- contracts, statements of work, invoices, and deployment diagrams identifying how Gary's Flock units are powered and connected;
- generator, UPS, backup-power, and fuel logs for the RTCC and other city public-safety facilities;
- cellular carrier outage or network-degradation records relevant to Gary during the storm;
- traffic-signal outage and restoration logs;
- emergency charging, cooling, shelter, and communications-site records;
- records identifying critical facilities or circuits prioritized for restoration and the criteria used;
- after-action reports from Gary, Lake County, NIPSCO, emergency management, and public-safety agencies.

## Omoluabi investigation matrix

The POC should compare systems on the same dimensions instead of comparing unlike infrastructure by headline alone:

| System | Grid dependent? | Backup power? | Independent communications? | Outage observed? | Restoration time | Evidence quality |
|---|---:|---:|---:|---:|---:|---|
| Residential electric service | Yes | Household-specific | Household-specific | Yes | To document by area | Utility + public records + testimony |
| Traffic signals | Usually | Location-specific | N/A / control-network specific | To document | To document | City/INDOT records |
| Cellular service | Network-specific | Often site backup | Core function | To document | To document | Carrier/FCC/public records |
| Gary RTCC | Facility-specific | To document | Multiple possible links | To document | To document | City system logs |
| Flock LPR nodes | Configuration-specific | Vendor supports solar/battery | Vendor supports cellular | **Not established** | **Not established** | Device-specific records required |
| Emergency charging / resilience sites | Site-specific | To document | Site-specific | To document | To document | City/emergency-management records |

## Design proposition — not a factual finding

If distributed solar/battery/cellular nodes prove capable of remaining functional under local grid failure, Omoluabi can treat that architecture as a **design precedent**, not an endorsement of surveillance.

A resident-governed resilience node could adapt the same basic principles for public benefit:

- emergency information;
- phone and assistive-device charging;
- low-power local communications or mesh relay;
- weather and environmental sensing;
- neighborhood outage observations;
- accessible alerts and tactile/audio status;
- transparent ownership, data minimization, consent, and community governance.

The design question is:

> **What would it mean to engineer civic survival infrastructure with the same expectation of continuity that cities engineer into selected sensing and public-safety systems?**

## Evidence rules

This desk follows Omoluabi's core rules:

- **Normal reliability is not the same as disaster resilience.**
- **A vendor capability is not evidence that a particular deployed device used that capability.**
- **A powered camera is not necessarily a connected camera.**
- **A connected camera is not necessarily accessible to the RTCC.**
- **Survival of one subsystem does not prove that another subsystem was intentionally deprived.**
- **Geographic coincidence does not prove electrical or network dependence.**
- **Human testimony, utility records, device telemetry, contracts, and timelines should be compared rather than collapsed.**
- **When evidence is insufficient, Omoluabi says so and asks for another reading or record.**

## Files in this research desk

- [`SOURCE_NOTES.md`](SOURCE_NOTES.md) — source ledger with evidentiary notes and limitations.
- [`data/claims.json`](data/claims.json) — machine-readable claim-status register.
- [`index.html`](index.html) — public POC research page.

## Corrections and additions

This is a version-controlled research resource. Claim status should change only when stronger evidence proves, qualifies, or contradicts the relevant edge. Document leads and corrections can be submitted through GitHub issues.
