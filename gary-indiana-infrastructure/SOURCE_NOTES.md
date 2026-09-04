# Gary, Indiana — Energy Reliability + Flock Infrastructure
## Source Notes

Last reviewed: **2026-09-03**

This ledger separates official records, vendor technical claims, credible reporting, and unresolved operational questions. A source is included for the proposition it can support — not for conclusions it cannot establish.

---

## 1. City of Gary — storm recovery update

**Source:** City of Gary, Mayor's Office / city news update, August 18, 2026  
**URL:** https://www.gary.gov/news-updates/mayor-melton-provides-storm-recovery-update

### Supports

- Severe weather struck Gary beginning August 11, 2026.
- The city documented widespread power outages, downed trees and power lines, flooding, structural damage, and continuing recovery work.
- The city relayed NIPSCO's system-wide restoration figures and estimates during the recovery period.

### Does not establish

- A circuit-by-circuit Gary restoration timeline.
- The uptime of any RTCC, LPR, Flock, cellular, or other surveillance infrastructure.
- Whether any particular subsystem was deliberately prioritized over residential service.

---

## 2. Indiana Department of Homeland Security — August 2026 disaster

**Source:** Indiana Department of Homeland Security  
**URL:** https://www.in.gov/dhs/emergency-management-and-preparedness/august-2026-disaster/

### Supports

- Severe weather beginning August 11 caused widespread outages and damage in northern Indiana.
- More than 300,000 power outages were reported at peak statewide, with the majority concentrated in Lake and Porter counties.

### Does not establish

- Gary-specific customer totals or restoration duration by neighborhood.
- Surveillance-system uptime.

---

## 3. City of Gary Police Department — Real-Time Crime Center

**Source:** Gary Police Department, official RTCC page  
**URL:** https://www.gary.gov/police/real-time-crime-center

### Supports

- Gary operates a Real-Time Crime Center.
- The RTCC uses surveillance cameras and fixed/mobile license-plate recognition.
- The city describes integration with CAD, shot-detection technology, and other law-enforcement databases.

### Does not establish

- Which LPR units are Flock-branded.
- The number, exact locations, or power configuration of current Flock units.
- RTCC or camera uptime during the August 2026 outage.

---

## 4. Lake County Board of Commissioners — July 17, 2024 minutes

**Source:** Official Lake County commissioners' meeting minutes  
**URL:** https://lakecountyin.gov/departments/commissioners/minutes-c/2024-commissioners-minutes/2024%2007-17-2024.pdf

### Supports

During discussion of a proposed Lake County Flock deployment, the minutes record Chief Balbo stating that three county police departments were using Flock and that **Gary PD had an "extensive array" of those cameras**. The discussion also describes the network benefit Lake County expected from joining Flock.

### Why this matters

This is stronger evidence for Gary-specific Flock deployment than an online crowd map or inference from generic LPR use.

### Does not establish

- Gary's current 2026 camera count.
- Exact locations, power configuration, network configuration, or uptime.
- Whether a particular camera was functioning on any date in August 2026.

---

## 5. Flock Safety — technical FAQ

**Source:** Flock Safety, vendor FAQ  
**URL:** https://www.flocksafety.com/faq

### Supports — as vendor-described capability

Flock describes a camera architecture that can use:

- solar and battery power; and
- cellular connectivity for data transmission.

### Evidentiary caution

This is a **vendor source**. It documents product architecture/capability, not independent verification of field performance.

Most importantly, it does **not** prove that Gary's deployed units:

- use the same power configuration;
- had sufficient battery/solar availability during the storm;
- retained cellular service;
- remained online;
- transmitted usable data; or
- remained accessible to the Gary RTCC.

Device-specific contracts, configuration records, telemetry, maintenance logs, and RTCC records are required.

---

## 6. Chicago Sun-Times — Gary outage scale on August 20

**Source:** Chicago Sun-Times, August 20, 2026  
**URL:** https://chicago.suntimes.com/news/2026/08/20/gary-power-outage-storms-indiana

### Supports — credible reporting

- More than 22,000 of approximately 35,800 Gary customers remained without power on August 20, about 61% of the utility's Gary accounts.
- The outage was still a major civic disruption more than a week after the August 11 storm.

### Does not establish

- The status of each Gary neighborhood, feeder, substation, or critical facility.
- Surveillance-system uptime.

---

## 7. Indianapolis Recorder / Capital B Gary — prolonged Gary outage

**Source:** Indianapolis Recorder / Capital B Gary reporting, August 24, 2026  
**URL:** https://indianapolisrecorder.com/gary-power-outage-why-lasting/

### Supports — credible reporting

- Reporting described a roughly 99 mph wind gust associated with the storm.
- Nearly 38,300 utility customers in Gary initially lost power.
- Roughly 20,000 customers were still without service ten days later.
- Reporting attributed to NIPSCO the assessment that Gary experienced the most widespread outage of any community in its Indiana territory.

### Does not establish

- A complete utility engineering explanation for every restoration delay.
- Surveillance-system operation.

---

# Evidence still needed

The central unresolved proposition is:

> **Did Gary's Flock / LPR / RTCC infrastructure remain operational, partially operational, or unavailable during the August 2026 electric outage?**

The highest-value records are:

1. Flock device-health / heartbeat / uptime exports for Gary units, August 11–25, 2026.
2. Gary RTCC system-health, outage, dispatch-access, maintenance, and incident logs for the same dates.
3. Gary's Flock contract, statements of work, deployment inventory, hardware models, power configuration, and connectivity configuration.
4. NIPSCO Gary feeder/circuit/substation outage and restoration data.
5. RTCC facility generator/UPS and fuel records.
6. Carrier/network outage records for cellular service supporting camera communications.
7. Traffic-signal outage/restoration logs and emergency charging/cooling/communications-site records for direct civic comparison.

# Do not collapse these claims

```text
Gary suffered a prolonged large-scale power outage.                 SUPPORTED
Gary operates an RTCC using surveillance and LPR.                   CONFIRMED
Official county minutes document Gary PD using Flock cameras.       CONFIRMED
Flock offers solar/battery + cellular camera architecture.          VENDOR-DESCRIBED CAPABILITY
Gary's Flock cameras stayed online during the blackout.             NOT ESTABLISHED
Gary prioritized surveillance power over residents.                 NOT ESTABLISHED
```

That separation is the Omoluabi method.
