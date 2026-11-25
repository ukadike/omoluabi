# National Enquirer UFO Chronology — Omoluabi research POC

This prototype tests Omoluabi's **Timeline, Source Ladder, and Contradiction** reasoning layers on UFO-related coverage published in *The National Enquirer*.

## Open the demonstration

When GitHub Pages is enabled for the repository, this page is served at:

- https://ukadike.github.io/omoluabi/national-enquirer-ufo-chronology/

The main interface is `index.html`. Structured records are maintained in `data/records.json`.

## Site formatting

The page now follows the Omoluabi/Small Systems Lab visual system: warm paper background, serif reading text, sans-serif headings, mono metadata, square borders, visible keyboard focus, and a skip link. Its data and image files load from relative paths, so the folder can be served under the GitHub Pages path or moved beneath a custom domain without rewriting asset URLs. Keep the `data/` directory alongside `index.html`.

## Research status

This is a starter corpus, not a complete issue-by-issue chronology. The Earl J. Neff clipping collection catalog describes a volume containing a couple hundred *National Enquirer* UFO articles from 1961–1988. That inventory, plus original issue scans, is the route to testing completeness. Current entries are selected records found through bibliographies, contemporary clipping digests, article transcriptions, and retrospective case research.

The word “magazine” is often used conversationally, but the Library of Congress catalogs *The National Enquirer* as a newspaper/tabloid publication. This project follows the publication's own issue dates and does not assume every item is a discrete UFO report.

## Evidence rules

1. **Publication is not verification.** An Enquirer headline establishes that an attribution or claim was published only when an issue scan or a reliable catalog confirms it.
2. **Keep dates distinct.** `issueDate` is the publication date; `eventDate` refers to the event described, if known.
3. **Keep source classes visible.** A source index, clipping digest, complaint record, government archive, issue scan, and witness account do not perform the same evidentiary role.
4. **Do not resolve conflicts silently.** Competing dates and denials are retained as explicit notes.
5. **No truth score or origin verdict.** The POC records what a source establishes and what remains unresolved.
6. **Headline-only is not a full article summary.** If the underlying issue has not been inspected, the entry says so.

## Record fields

| Field | Meaning |
|---|---|
| `issueDate` | Date on the Enquirer issue, as reported by the cited source |
| `eventDate` | Date of the reported event, when known; never substituted for publication date |
| `headline` | Reported headline or concise descriptive title |
| `theme` | Subject category for browsing |
| `reportedClaim` | Claim attributed to the publication, not endorsed by Omoluabi |
| `recordNote` | What the current source trail establishes and what remains open |
| `status` | Research state: secondary-indexed, contested, date-conflict, headline-only, or unverified-claim |
| `sources` | Link, source class, and its role in supporting the entry |

## Starter research leads

- [Library of Congress: National Enquirer Index and Database Files, 1977–](https://www.loc.gov/item/2018487908/)
- [Earl J. Neff clipping collection catalog: Volume 6, National Enquirer UFO articles 1961–1988](https://www.afu.se/afu2/?page_id=5428)
- [National News Council complaint summary on 1976–1977 Enquirer coverage](https://www.nhiarchives.com/newsletters/ground-saucer-watch/gsw-1977-12/the-trouble-with-tabloids/)
- [UFO Magazine Archive: APCIC contemporary clipping digests](https://www.ufomagazines.com/)
- [Isaac Koi Archive: National Enquirer panel citations](https://isaackoi.com/ufog/best-ufo-cases/10-consensus-lists-national-enquirer-panel/)

## Images and people’s reports

The page now has two evidence views:

- An image gallery embeds the White House Staff Photographers image cataloged by the National Archives as Frank Moore receiving 9,000 letters about UFO incidents in connection with an Enquirer article. The gallery includes image credit, rights status, alt text, and the distinction between a documented mail response and the uninspected contents of individual letters.
- An Enquirer page 41 clipping from 4 November 1973 is indexed as an image lead only. NHI Archives says reuse permissions are not established, so the prototype links to its catalog record instead of reproducing the scan.
- The report view includes attributed civilian and pilot accounts from the Enquirer’s 1977 poll coverage, plus the 1973 helicopter crew account with its Army and later testimony sources. The 9,000-letter figure is an aggregate public-response record, not 9,000 verified sightings.
- Report summaries are paraphrases of their linked sources. A clipping-service digest is labeled as secondary; testimony and issue scans are not implied where they have not been inspected.

## Next research pass

1. Obtain or inspect the full 1961–1988 clipping inventory and record each item's issue date and page.
2. Locate issue scans for entries currently supported only by secondary indexes.
3. Expand the source ladder: article → original documents/interviews → independent contemporaneous reporting → later reassessments.
4. Add correction and contradiction edges without overwriting the original publication claim.
5. Reconcile the Roswell article's February 26/28, 1980 publication-date discrepancy from original issues.

## Primary repository

[Omoluabi](https://github.com/ukadike/omoluabi)
