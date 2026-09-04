# Gary, Indiana — Civic Infrastructure Reliability

**A living Omoluabi source desk for disaster resilience, infrastructure continuity, recovery, and public accountability**

Status: **OPEN / DEVELOPING**  
Last substantive review: **2026-09-03**

## Purpose

This dossier uses Gary, Indiana's August 2026 storm and prolonged power crisis as an Omoluabi proof-of-method case.

The central question is broader than electricity and broader than surveillance:

> **When a city is under infrastructure stress, which systems fail, which systems remain available, what dependencies connect those systems, how quickly are they restored, and who has access to resilient infrastructure?**

Flock cameras and the Gary Real-Time Crime Center are retained as **one subsystem** inside a larger civic-resilience investigation. They are not the organizing premise.

The inquiry now covers:

1. electric generation/distribution and restoration;
2. roads, blocked routes, traffic signals, and transit;
3. drinking water and wastewater;
4. cellular, Wi-Fi, public-safety communications, 311/211, and 911 continuity;
5. fuel access and commercial refrigeration/cooking;
6. hospitals, emergency care, oxygen, medications, assistive devices, and home medical equipment;
7. schools and other public facilities;
8. shelters, charging, cooling, food distribution, and emergency resource sites;
9. police, fire, RTCC, fixed cameras, LPR, Flock, and other public-safety systems;
10. critical-facility backup power, generators, batteries, satellite links, and restoration priority.

The goal is not to produce a single reliability score. It is to expose **dependencies, failure cascades, redundancy, restoration order, and unequal access to continuity**.

## What the August 2026 event already shows

The public record supports several layers of disruption beyond household electricity:

- Large portions of Gary remained without power for many days after August 11.
- Reporting documented nonfunctioning traffic signals, difficulty storing/cooking food, and difficulty managing medications and powered medical devices.
- A Gary gas station reported pumps unable to operate; a generator kept part of the business running, but fuel had to be obtained elsewhere.
- Gary Community School Corporation schools remained closed more than a week after the storm because of ongoing storm-related issues.
- The city operated a 24/7 shelter and charging location at the YWCA.
- The city opened an oxygen-cylinder refill operation for home-use patients affected by the outage.
- AT&T and ITDRC deployed charging and connectivity resources in Gary; Verizon also provided Wi-Fi/charging at the YWCA.
- FirstNet deployed a satellite truck to a NIPSCO facility in Gary to support utility recovery communications.
- The city reported 2,097 damage sites/assistance requests by August 18, with more than 80% involving fallen trees and blocked roads; 75% of reported blocked roads had reopened by then.
- Indiana American Water issued Gary main-break/boil-advisory notices during the recovery period on August 18, August 20, and August 26. The available notices establish water-service interruptions/low pressure and boil advisories, but **do not by themselves establish that the storm caused those main breaks**.

These facts indicate a **cascading civic reliability problem**, not merely an electric outage.

## Current evidence map

| Infrastructure edge | Status | Omoluabi note |
|---|---|---|
| August 11 storm → widespread Gary electric disruption | **CONFIRMED** | City/state records document outages, downed lines, flooding, structural damage, and prolonged restoration. |
| Electric outage → traffic-signal failure in large areas | **REPORTED / STRONGLY SUPPORTED** | Free Press Indiana/WFYI documented large swaths without working traffic signals. City/INDOT logs still needed. |
| Electric outage → household food/medication/medical-device vulnerability | **REPORTED + OFFICIAL RESPONSE EVIDENCE** | Reporting documents household impacts; city opened oxygen-refill and charging support. |
| Electric outage → fuel-access disruption | **REPORTED** | CBS documented a Gary Citgo where pumps were not functioning and generator operation depended on obtaining fuel elsewhere. |
| Storm/recovery → school closure | **REPORTED / STRONGLY SUPPORTED** | CBS reported Gary public schools remained closed on August 19 due to ongoing storm issues. |
| Recovery response → shelter + charging infrastructure | **CONFIRMED** | City/IDHS list the Gary YWCA as shelter and charging location. |
| Recovery response → supplemental connectivity infrastructure | **CONFIRMED** | City and AT&T document charging/Wi-Fi deployments; FirstNet satellite support was deployed to NIPSCO's Gary facility. |
| Recovery period → drinking-water main breaks / boil advisories | **CONFIRMED EVENT; CAUSATION NOT ESTABLISHED** | Indiana American Water notices document service interruption/low pressure and boil advisories on multiple dates. Storm causation remains unproven in this dossier. |
| Wastewater treatment continuity | **NOT YET DOCUMENTED** | Gary Sanitary District exists as the wastewater utility, but plant/pump-station outage, generator, overflow, or bypass records are still needed. |
| Hospital / emergency-department continuity | **NOT YET DOCUMENTED** | Methodist Northlake is a major Gary emergency-care facility; outage/generator/transfer/operational records are needed. |
| 911 / dispatch continuity | **NOT YET DOCUMENTED** | First-responder activity is documented, but CAD/911 uptime and backup communications have not yet been established. |
| Public transit continuity | **NOT YET DOCUMENTED** | Gary Public Transportation Corporation operational impacts require schedules, service alerts, dispatch/fueling, and facility records. |
| Gary Police → RTCC + surveillance/LPR | **CONFIRMED** | Official Gary page documents RTCC and integrated surveillance/LPR systems. |
| Gary Police → Flock cameras | **CONFIRMED** | Official Lake County minutes describe Gary PD as having an extensive Flock array. |
| Gary Flock / RTCC → remained operational during blackout | **NOT ESTABLISHED** | Requires device and system uptime records. |

## Omoluabi's new unit of analysis: the dependency chain

The POC should no longer ask only **"Was this system on or off?"** It should trace what each service depends on.

For example:

```text
ELECTRICITY
  ↓
traffic signal controller
  ↓
intersection safety / road throughput

ELECTRICITY
  ↓
gas-station pump + payment system
  ↓
fuel availability
  ↓
generators / vehicles / emergency response

ELECTRICITY
  ↓
refrigerator + powered medical equipment
  ↓
food / medication / oxygen / assistive-device continuity

CELL SITE POWER + BACKHAUL
  ↓
mobile connectivity
  ↓
family contact / emergency information / field coordination

UTILITY FIELD COMMUNICATIONS
  ↓
crew dispatch + restoration coordination
  ↓
electric restoration
```

This matters because infrastructure failures **compound**. A generator is not resilient if fuel pumps fail. A cell tower is not resilient if backup fuel runs out or backhaul fails. A shelter is not fully resilient if people cannot reach it because roads are blocked or paratransit is unavailable.

## The infrastructure-asymmetry question

Omoluabi should test resilience across **all** system types rather than assuming that surveillance is uniquely resilient.

The broader proposition is:

> **Which systems in Gary were designed with independent power, backup communications, alternate routing, stored fuel, generators, batteries, or priority restoration — and which essential resident-facing systems lacked comparable continuity?**

Flock is useful here only because its possible solar/battery/cellular architecture gives Omoluabi one testable example of distributed redundancy.

Other potentially resilient systems include:

- utility field communications;
- FirstNet/public-safety communications;
- hospitals and emergency departments;
- fire stations and police facilities;
- water/wastewater pumping and treatment;
- shelters and charging hubs;
- cellular sites;
- traffic-management equipment;
- government data/network facilities;
- commercial generators;
- industrial facilities.

## Preliminary timeline

### August 11, 2026 — severe storm

Gary reports widespread power outages, downed trees and power lines, flooding, property damage, and damage to city infrastructure.

### August 17–18 — emergency support infrastructure expands

The city lists the YWCA as a 24/7 shelter/charging station and opens an oxygen refill station at Indiana University Northwest for home-use patients affected by the outages. AT&T/ITDRC and Verizon provide charging/connectivity support. FirstNet deploys satellite communications support to the NIPSCO facility in Gary.

### August 18 — roads and water become important layers

The city reports 2,097 damage sites and assistance requests; more than 80% involve fallen trees and blocked roads, with 75% of reported blocked roads reopened. Indiana American Water issues a Gary emergency-repair/boil-advisory notice for a main break. The available notice does not establish storm causation.

### August 19–22 — cascading household/civic impacts remain visible

Reporting documents more than 27,000 Gary buildings/homes still without power on August 19, school closures, a gas station with inoperable pumps, and large areas without traffic signals. Residents describe difficulty finding ice/fuel and managing food, medications, and medical devices.

### August 20 and August 26 — additional water-service notices

Indiana American Water issues additional Gary main-break/boil-advisory notices. Their relationship, if any, to storm damage or prolonged outage conditions needs engineering/maintenance records.

### August 25–27 — electric restoration substantially completes

NIPSCO reports 99% system restoration by August 25 and substantial completion by August 26. CBS reports some Gary homes/businesses had waited nearly two weeks for restoration.

## Priority records by infrastructure layer

### Electric power
- NIPSCO feeder/circuit/substation outage and restoration data;
- pole, transformer, substation, vegetation, and transmission damage records;
- critical-load and restoration-priority criteria;
- mutual-aid crew deployment and staging logs.

### Roads + traffic + transit
- Gary/INDOT traffic-signal outage/restoration logs;
- road-closure and reopening GIS/timestamps;
- GPTC service alerts, route suspensions, missed trips, dispatch records, fuel availability, garage power, and paratransit continuity.

### Water + wastewater
- Indiana American Water main-break and pressure-zone records;
- relationship, if any, between August breaks and storm/outage conditions;
- treatment/pump-station generator and power logs;
- Gary Sanitary District pump/treatment outage, overflow, bypass, generator/fuel, and emergency-work records.

### Communications
- carrier outage/degradation maps and FCC DIRS data if available;
- FirstNet deployment records and mission rationale;
- city CAD/911/dispatch uptime and backup communications;
- 311/211 service volumes and failure reports;
- municipal network, radio, fiber, and internet outages.

### Medical + disability continuity
- Methodist Hospitals Northlake generator/utility transfer records, ED continuity, cancellations/transfers, and critical-system incidents;
- oxygen-station usage totals and request logs;
- home medical-device emergency requests;
- accessible transportation to shelters/medical care;
- cooling/charging/assistive-device support.

### Food + fuel + commerce
- gas-station outage/pump/payment functionality;
- emergency fuel availability and generator-fueling logistics;
- grocery refrigeration losses;
- food distribution and spoilage assistance.

### Schools + public facilities
- Gary Community School Corporation closure/reopening records and facility outages;
- city-hall/library/community-center power and public access;
- public computer/charging/communications availability.

### Public safety + surveillance
- police/fire facility generator, UPS, radio, CAD, dispatch, and fuel logs;
- RTCC uptime and access logs;
- Flock inventory, configuration, power, connectivity, device-health telemetry, and maintenance;
- other camera, shot-detection, and sensor-system continuity.

## Omoluabi investigation matrix

| System | Primary dependency | Redundancy to test | Known August state | Highest-value next evidence |
|---|---|---|---|---|
| Residential electricity | NIPSCO grid | Household generators/batteries | Major prolonged outage | Feeder/circuit restoration timeline |
| Traffic signals | Electric service/controller | Battery/UPS/generator by intersection | Failures reported in large areas | Signal outage logs |
| Roads | Physical access/clearance | Alternate routes | Extensive blockages; partial reopening documented | GIS closure/reopening timeline |
| Fuel stations | Electric pumps/payment + fuel supply | Generator/manual procedures | At least one pump failure documented | Station survey + fuel logistics |
| Cellular/Wi-Fi | Site power + backhaul | Batteries/generators/COWs/satellite | Supplemental Wi-Fi/charging deployed | Carrier/FCC outage data |
| Utility field communications | Network + field equipment | FirstNet/satellite | FirstNet satellite support documented at NIPSCO | Deployment/mission logs |
| 911/CAD/dispatch | Facility/network/radio | Generator/UPS/radio failover | Not established | CAD/911 uptime + generator logs |
| Drinking water | Pumps/pressure/grid + mains | Backup generators/storage | Multiple main-break/boil notices during recovery | Pressure/pump/main-break records |
| Wastewater | Pumps/treatment/grid | Generator/bypass capacity | Not established | GSD operational/overflow logs |
| Hospital/ED | Grid + clinical systems | Emergency generation | Not established | Northlake generator/incident records |
| Home medical support | Household grid + supplies | Batteries/oxygen/relocation | Vulnerability documented; oxygen refill response confirmed | Demand/usage + medical-support logs |
| Schools | Facility power/access | Generator/alternate sites | Closures documented | District facility/reopening records |
| GPTC transit/paratransit | Roads + fuel + dispatch + facility power | Alternate routing/fueling | Not established | Service/dispatch/fuel logs |
| Shelter/charging | Facility power + supplies | Generator/connectivity kits | YWCA support confirmed | Facility power/source/usage logs |
| Gary RTCC | Facility power + network | UPS/generator/redundant network | Not established | Uptime/system-health logs |
| Flock LPR | Deployment-specific | Vendor supports solar/battery/cellular | Not established | Device telemetry/configuration |

## Design proposition — civic redundancy

The strongest Omoluabi design lesson is no longer simply "copy the camera's solar panel."

It is to design **resident-facing redundancy as a network**:

- neighborhood solar/battery charging;
- accessible emergency communications;
- mesh/local information relay;
- medical-device and mobility-device charging;
- refrigeration support for medications;
- community weather/environment sensors;
- low-power outage and road-status reporting;
- public water/air safety readings;
- printed, audio, tactile, SMS, and offline information channels;
- transparent ownership, minimal data collection, consent, and public governance.

A resilience node is useful only if it fits into a larger dependency plan for **power + communications + mobility + water + medical access + food/fuel**.

## Evidence rules

- **Normal reliability is not disaster resilience.**
- **Failure in one system can disable a second system that appears unrelated.**
- **A generator without fuel access is not independent.**
- **A powered communications device without backhaul is not connected.**
- **A vendor capability is not deployment evidence.**
- **A water main break during recovery is not automatically storm-caused.**
- **An emergency response resource documents a need, but not necessarily the total scale of that need.**
- **The survival of one subsystem does not prove another was intentionally deprived.**
- **Restoration percentages must be checked against neighborhood/circuit timelines.**
- **Human testimony, system logs, utility records, device telemetry, contracts, and physical observations should be aligned in time.**
- **When evidence is insufficient, Omoluabi requests another reading or record.**

## Files in this research desk

- [`SOURCE_NOTES.md`](SOURCE_NOTES.md) — annotated source ledger.
- [`data/claims.json`](data/claims.json) — machine-readable claim-status register.
- [`index.html`](index.html) — public POC research page.

## Corrections and additions

This is a version-controlled research resource. Claim status should change only when stronger evidence proves, qualifies, or contradicts the relevant edge. Document leads and corrections can be submitted through GitHub issues.
