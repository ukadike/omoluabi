# Source Notes

Official source page:
https://www.war.gov/ufo/

The official page describes PURSUE as the Presidential Unsealing and Reporting System for UAP Encounters. It states that records are released on a rolling basis, with Release 01 on May 8, 2026; Release 02 on May 22, 2026; and Release 03 on June 12, 2026.

The page states that the materials are unresolved cases, meaning the government is unable to make a definitive determination on the nature of the observed phenomena, sometimes because of insufficient data.

The page also says users can search, filter, sort, view, and download available PURSUE records.

Important engineering note:
The previous package guessed a per-release CSV pattern. Claude review flagged that as wrong and identified a single CSV endpoint candidate:
https://www.war.gov/Portals/1/Interactive/2026/UFO/uap-csv.csv

Before final build, verify this endpoint through network inspection or Action logs.
