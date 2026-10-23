-- Omoluabi Web Engine backend v0.1
-- Governed records, human-controlled publishing, and temporary intake.
create extension if not exists pgcrypto;
create extension if not exists pg_cron;

create table public.workspace_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('editor','reviewer','publisher')),
  added_at timestamptz not null default now()
);

create or replace function public.is_workspace_member()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.workspace_members where user_id = auth.uid()) $$;

create or replace function public.has_workspace_role(required_role text)
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.workspace_members where user_id = auth.uid() and role = required_role) $$;

create table public.investigations (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) >= 4),
  summary text not null default '',
  publication_status text not null default 'private' check (publication_status in ('private','internal_review','public','embargoed','withdrawn')),
  consent_status text not null default 'unknown' check (consent_status in ('unknown','cleared','restricted','withheld')),
  risk_status text not null default 'unassessed' check (risk_status in ('unassessed','reviewed','high_risk')),
  accessibility_status text not null default 'unassessed' check (accessibility_status in ('unassessed','reviewed')),
  created_by uuid not null references auth.users(id),
  publication_decided_by uuid references auth.users(id),
  publication_decided_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(id)
);

create table public.sources (
  id uuid primary key default gen_random_uuid(),
  investigation_id uuid not null references public.investigations(id) on delete cascade,
  title text not null,
  url text not null check (url ~ '^https?://'),
  publisher text not null default '',
  source_type text not null default 'document' check (source_type in ('document','dataset','interview','archive','media','other')),
  consent_status text not null default 'unknown' check (consent_status in ('unknown','cleared','restricted','withheld')),
  notes text not null default '',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  unique(id, investigation_id)
);

create table public.claims (
  id uuid primary key default gen_random_uuid(),
  investigation_id uuid not null references public.investigations(id) on delete cascade,
  claim_text text not null check (length(trim(claim_text)) >= 8),
  status text not null default 'unreviewed' check (status in ('unreviewed','supported','disputed','not_substantiated')),
  created_by uuid not null references auth.users(id),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  unique(id, investigation_id)
);

create table public.claim_evidence (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid not null,
  source_id uuid not null,
  investigation_id uuid not null,
  relationship text not null default 'context' check (relationship in ('supports','challenges','context')),
  excerpt text not null default '',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  unique(claim_id, source_id),
  foreign key (claim_id, investigation_id) references public.claims(id, investigation_id) on delete cascade,
  foreign key (source_id, investigation_id) references public.sources(id, investigation_id) on delete cascade
);

create table public.intake_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  payload text not null,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '72 hours'),
  promoted_at timestamptz,
  promoted_by uuid references auth.users(id),
  promoted_investigation_id uuid references public.investigations(id) on delete set null
);

create table public.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  table_name text not null,
  record_id uuid not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index investigations_updated_idx on public.investigations(updated_at desc);
create index sources_investigation_idx on public.sources(investigation_id, created_at);
create index claims_investigation_idx on public.claims(investigation_id, created_at);
create index intake_expiration_idx on public.intake_items(expires_at) where promoted_at is null;
create index audit_record_idx on public.audit_events(record_id, created_at desc);

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end $$;
create trigger investigations_touch before update on public.investigations for each row execute function public.touch_updated_at();

create or replace function public.guard_publication()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if new.publication_status is distinct from old.publication_status then
    if not public.has_workspace_role('publisher') then
      raise exception 'AUTH.R01: only a designated human publisher may change publication status';
    end if;
    new.publication_decided_by := auth.uid();
    new.publication_decided_at := now();
  end if;
  if new.publication_status = 'public' then
    if new.consent_status <> 'cleared' then raise exception 'CONSENT.R01: consent must be cleared before publication'; end if;
    if new.risk_status <> 'reviewed' then raise exception 'RISK.R01: risk review must be complete before publication'; end if;
    if new.accessibility_status <> 'reviewed' then raise exception 'ACCESS.R01: accessibility review must be complete before publication'; end if;
    if not exists(select 1 from public.sources where investigation_id = new.id) then raise exception 'SOURCE.R01: add at least one source before publication'; end if;
    if exists(select 1 from public.sources where investigation_id = new.id and consent_status <> 'cleared') then raise exception 'SOURCE.R02: every source must have cleared consent before publication'; end if;
    if not exists(select 1 from public.claims where investigation_id = new.id) then raise exception 'CLAIM.R01: add and review at least one claim before publication'; end if;
    if exists(select 1 from public.claims c where c.investigation_id = new.id and (c.status = 'unreviewed' or c.reviewed_by is null or not exists(select 1 from public.claim_evidence e where e.claim_id = c.id))) then raise exception 'CLAIM.R02: review each claim and link its evidence before publication'; end if;
    if exists(select 1 from public.claims where investigation_id = new.id and status = 'disputed') then raise exception 'STORY.R01: resolve or transparently withdraw disputed claims before publication'; end if;
  end if;
  return new;
end $$;
create trigger investigations_publication_guard before update on public.investigations for each row execute function public.guard_publication();

create or replace function public.guard_published_record_edits()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and new.created_by is distinct from old.created_by then
    raise exception 'PROVENANCE.R01: original creator cannot be changed';
  end if;
  if tg_table_name in ('sources','claims','claim_evidence') and exists(
    select 1 from public.investigations where id = new.investigation_id and publication_status = 'public'
  ) then
    raise exception 'PUBLICATION.R02: withdraw an investigation before changing its sources, claims, or evidence';
  end if;
  return new;
end $$;
create trigger sources_guard before insert or update on public.sources for each row execute function public.guard_published_record_edits();
create trigger claims_guard before insert or update on public.claims for each row execute function public.guard_published_record_edits();
create trigger evidence_guard before insert or update on public.claim_evidence for each row execute function public.guard_published_record_edits();

create or replace function public.protect_investigation_provenance()
returns trigger language plpgsql set search_path = public
as $$
begin
  if new.created_by is distinct from old.created_by then raise exception 'PROVENANCE.R01: original creator cannot be changed'; end if;
  if new.publication_status is not distinct from old.publication_status and
     (new.publication_decided_by is distinct from old.publication_decided_by or new.publication_decided_at is distinct from old.publication_decided_at) then
    raise exception 'PROVENANCE.R02: publication decision metadata is database-managed';
  end if;
  return new;
end $$;
create trigger investigations_provenance_guard before update on public.investigations for each row execute function public.protect_investigation_provenance();

create or replace function public.record_audit_event()
returns trigger language plpgsql security definer set search_path = public
as $$
declare rid uuid; act text; changed text[];
begin
  if tg_op = 'INSERT' then rid := new.id; act := lower(tg_table_name) || '.created'; changed := array(select jsonb_object_keys(to_jsonb(new)));
  else rid := new.id; changed := array(select key from jsonb_each(to_jsonb(new)) n(key,value) where (to_jsonb(old)->key) is distinct from value);
    if tg_table_name = 'investigations' and new.publication_status is distinct from old.publication_status then act := 'publication.status_changed';
    elsif tg_table_name = 'claims' and new.status is distinct from old.status then act := 'claim.reviewed';
    else act := lower(tg_table_name) || '.updated'; end if;
  end if;
  insert into public.audit_events(actor_id,action,table_name,record_id,details) values(auth.uid(),act,tg_table_name,rid,jsonb_build_object('changed_fields',changed));
  return new;
end $$;
create trigger investigations_audit after insert or update on public.investigations for each row execute function public.record_audit_event();
create trigger sources_audit after insert or update on public.sources for each row execute function public.record_audit_event();
create trigger claims_audit after insert or update on public.claims for each row execute function public.record_audit_event();
create trigger evidence_audit after insert or update on public.claim_evidence for each row execute function public.record_audit_event();
create trigger intake_audit after insert or update on public.intake_items for each row execute function public.record_audit_event();

alter table public.workspace_members enable row level security;
alter table public.investigations enable row level security;
alter table public.sources enable row level security;
alter table public.claims enable row level security;
alter table public.claim_evidence enable row level security;
alter table public.intake_items enable row level security;
alter table public.audit_events enable row level security;

create policy "members can view their own membership" on public.workspace_members for select to authenticated using (user_id = auth.uid());
create policy "members can read investigations" on public.investigations for select to authenticated using (public.is_workspace_member());
create policy "members can create investigations" on public.investigations for insert to authenticated with check (public.is_workspace_member() and created_by = auth.uid());
create policy "members can update investigations" on public.investigations for update to authenticated using (public.is_workspace_member()) with check (public.is_workspace_member());
create policy "members can read sources" on public.sources for select to authenticated using (public.is_workspace_member());
create policy "members can add sources" on public.sources for insert to authenticated with check (public.is_workspace_member() and created_by = auth.uid());
create policy "members can update sources" on public.sources for update to authenticated using (public.is_workspace_member()) with check (public.is_workspace_member());
create policy "members can read claims" on public.claims for select to authenticated using (public.is_workspace_member());
create policy "members can add claims" on public.claims for insert to authenticated with check (public.is_workspace_member() and created_by = auth.uid());
create policy "members can review claims" on public.claims for update to authenticated using (public.is_workspace_member()) with check (public.is_workspace_member() and (status = 'unreviewed' or reviewed_by = auth.uid()));
create policy "members can read claim evidence" on public.claim_evidence for select to authenticated using (public.is_workspace_member());
create policy "members can link claim evidence" on public.claim_evidence for insert to authenticated with check (public.is_workspace_member() and created_by = auth.uid());
create policy "members can read active intake" on public.intake_items for select to authenticated using (public.is_workspace_member() and expires_at > now());
create policy "members can create intake" on public.intake_items for insert to authenticated with check (public.is_workspace_member() and created_by = auth.uid());
create policy "members can promote intake" on public.intake_items for update to authenticated using (public.is_workspace_member() and promoted_at is null and expires_at > now()) with check (public.is_workspace_member() and promoted_by = auth.uid());
create policy "members can read audit history" on public.audit_events for select to authenticated using (public.is_workspace_member());

-- Audit rows are generated by database triggers. Authenticated users have no
-- direct insert, update, or delete policy for this append-only table.
revoke all on public.audit_events from anon, authenticated;
grant select on public.audit_events to authenticated;

-- Intake is hidden as soon as its 72-hour TTL passes, then physically removed hourly.
select cron.schedule('omoluabi-expire-temporary-intake', '13 * * * *', $$delete from public.intake_items where expires_at <= now()$$);
