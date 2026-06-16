create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'post_type') then
    create type public.post_type as enum ('news', 'event');
  end if;

  if not exists (select 1 from pg_type where typname = 'post_status') then
    create type public.post_status as enum ('draft', 'published');
  end if;
end $$;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null,
  type public.post_type not null default 'news',
  event_date timestamptz,
  image_url text not null,
  facebook_post_id text,
  status public.post_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint posts_event_date_required check (
    type <> 'event' or event_date is not null
  )
);

create index if not exists posts_status_created_at_idx
  on public.posts (status, created_at desc);

create index if not exists posts_type_event_date_idx
  on public.posts (type, event_date);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
before update on public.posts
for each row
execute function public.set_updated_at();

alter table public.posts enable row level security;

drop policy if exists "Published posts are publicly readable" on public.posts;
create policy "Published posts are publicly readable"
on public.posts
for select
using (status = 'published');

