# Omoluabi Editorial Workspace

This is the mobile-friendly, static front end for the persistent web-engine backend. It is served from the existing GitHub Pages site at:

`https://ukadike.github.io/omoluabi/web-engine/backend-ui/`

The page connects directly to the Supabase project with the public anon key. Supabase Auth handles email sign-in; PostgreSQL row-level security and the database publication gate protect records. The service-role key is never used in the browser. Temporary intake stays separate and expires after 72 hours.

## First-time setup

1. Create or select the owner-controlled Supabase project for Omoluabi.
2. Apply `../backend/supabase/migrations/202610230001_initial_backend.sql` in its SQL editor.
3. In Supabase Auth, disable open sign-ups and invite the first publisher. Add their auth UUID to `public.workspace_members` with the `publisher` role as described in [`../backend/README.md`](../backend/README.md).
4. Add the exact Pages URL above to Supabase Auth's allowed redirect URLs. Email sign-in links return to this static page.
5. Open the Pages URL, choose **Settings**, and enter the Supabase project URL and **public anon key**. The values are saved in that browser's local storage. Each team member configures their own browser once.
6. Sign in with the invited email. Add editors and reviewers to `workspace_members` after inviting them in Supabase Auth.

The URL and anon key are public client settings, but the database must have the supplied row-level security policies enabled. Never paste a `service_role` key. An invited account with no membership receives no access to investigation records.

## Included workflow

- Email magic-link sign-in and membership checks
- Investigation list and creation
- Source registry with consent state
- Checkable claims, review states, and claim-to-source evidence links
- Consent, risk, accessibility, and publisher-only publication controls
- Temporary intake, a 72-hour expiry label, and human promotion into an investigation
- Recent audit events for investigation changes

The database remains the authority for access and publication rules. A page control is not treated as a security boundary. This first release does not upload files, generate articles, or publish content automatically.

## Hosting boundary

GitHub Pages serves this interface at the existing Omoluabi `.github.io` site. Supabase supplies the hosted backend (database and identity); it must be configured and migrated before sign-in can work. The Next.js app in `../backend/` remains an alternate server-rendered implementation and is not required to serve this Pages interface.
