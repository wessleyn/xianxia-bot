-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "auth"."aal_level" AS ENUM ('aal1', 'aal2', 'aal3');

-- CreateEnum
CREATE TYPE "auth"."code_challenge_method" AS ENUM ('s256', 'plain');

-- CreateEnum
CREATE TYPE "auth"."factor_status" AS ENUM ('unverified', 'verified');

-- CreateEnum
CREATE TYPE "auth"."factor_type" AS ENUM ('totp', 'webauthn', 'phone');

-- CreateEnum
CREATE TYPE "auth"."one_time_token_type" AS ENUM ('confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token');

create table auth.users (
  instance_id uuid null,
  id uuid NOT null,
  aud character varying(255) null,
  role character varying(255) null,
  email character varying(255) null,
  encrypted_password character varying(255) null,
  email_confirmed_at timestamp with time zone null,
  invited_at timestamp with time zone null,
  confirmation_token character varying(255) null,
  confirmation_sent_at timestamp with time zone null,
  recovery_token character varying(255) null,
  recovery_sent_at timestamp with time zone null,
  email_change_token_new character varying(255) null,
  email_change character varying(255) null,
  email_change_sent_at timestamp with time zone null,
  last_sign_in_at timestamp with time zone null,
  raw_app_meta_data jsonb null,
  raw_user_meta_data jsonb null,
  is_super_admin boolean null,
  created_at timestamp with time zone null,
  updated_at timestamp with time zone null,
  phone text null default null::character varying,
  phone_confirmed_at timestamp with time zone null,
  phone_change text null default ''::character varying,
  phone_change_token character varying(255) null default ''::character varying,
  phone_change_sent_at timestamp with time zone null,
  confirmed_at timestamp with time zone GENERATED ALWAYS as (LEAST(email_confirmed_at, phone_confirmed_at)) STORED null,
  email_change_token_current character varying(255) null default ''::character varying,
  email_change_confirm_status smallint null default 0,
  banned_until timestamp with time zone null,
  reauthentication_token character varying(255) null default ''::character varying,
  reauthentication_sent_at timestamp with time zone null,
  is_sso_user boolean NOT null default false,
  deleted_at timestamp with time zone null,
  is_anonymous boolean NOT null default false,
  constraint users_pkey primary key (id),
  constraint users_phone_key unique (phone),
  constraint users_email_change_confirm_status_check check (
    (
      (email_change_confirm_status >= 0)
      and (email_change_confirm_status <= 2)
    )
  )
) TABLESPACE pg_default;

create index IF NOT EXISTS users_instance_id_idx on auth.users using btree (instance_id) TABLESPACE pg_default;

create index IF NOT EXISTS users_instance_id_email_idx on auth.users using btree (instance_id, lower((email)::text)) TABLESPACE pg_default;

create unique INDEX IF NOT EXISTS confirmation_token_idx on auth.users using btree (confirmation_token) TABLESPACE pg_default
where
  ((confirmation_token)::text !~ '^[0-9 ]*$'::text);

create unique INDEX IF NOT EXISTS recovery_token_idx on auth.users using btree (recovery_token) TABLESPACE pg_default
where
  ((recovery_token)::text !~ '^[0-9 ]*$'::text);

create unique INDEX IF NOT EXISTS email_change_token_current_idx on auth.users using btree (email_change_token_current) TABLESPACE pg_default
where
  (
    (email_change_token_current)::text !~ '^[0-9 ]*$'::text
  );

create unique INDEX IF NOT EXISTS email_change_token_new_idx on auth.users using btree (email_change_token_new) TABLESPACE pg_default
where
  (
    (email_change_token_new)::text !~ '^[0-9 ]*$'::text
  );

create unique INDEX IF NOT EXISTS reauthentication_token_idx on auth.users using btree (reauthentication_token) TABLESPACE pg_default
where
  (
    (reauthentication_token)::text !~ '^[0-9 ]*$'::text
  );

create unique INDEX IF NOT EXISTS users_email_partial_key on auth.users using btree (email) TABLESPACE pg_default
where
  (is_sso_user = false);

create index IF NOT EXISTS users_is_anonymous_idx on auth.users using btree (is_anonymous) TABLESPACE pg_default;

create table auth.sso_providers (
  id uuid NOT null,
  resource_id text null,
  created_at timestamp with time zone null,
  updated_at timestamp with time zone null,
  constraint sso_providers_pkey primary key (id),
  constraint resource_id_not_empty check (
    (
      (resource_id = null::text)
      or (char_length(resource_id) > 0)
    )
  )
) TABLESPACE pg_default;

create unique INDEX IF NOT EXISTS sso_providers_resource_id_idx on auth.sso_providers using btree (lower(resource_id)) TABLESPACE pg_default;

create table auth.sso_domains (
  id uuid NOT null,
  sso_provider_id uuid NOT null,
  domain text NOT null,
  created_at timestamp with time zone null,
  updated_at timestamp with time zone null,
  constraint sso_domains_pkey primary key (id),
  constraint sso_domains_sso_provider_id_fkey foreign KEY (sso_provider_id) references auth.sso_providers (id) on delete CASCADE,
  constraint domain_not_empty check ((char_length(domain) > 0))
) TABLESPACE pg_default;

create index IF NOT EXISTS sso_domains_sso_provider_id_idx on auth.sso_domains using btree (sso_provider_id) TABLESPACE pg_default;

create unique INDEX IF NOT EXISTS sso_domains_domain_idx on auth.sso_domains using btree (lower(domain)) TABLESPACE pg_default;

create table auth.sessions (
  id uuid NOT null,
  user_id uuid NOT null,
  created_at timestamp with time zone null,
  updated_at timestamp with time zone null,
  factor_id uuid null,
  aal auth.aal_level null,
  not_after timestamp with time zone null,
  refreshed_at timestamp without time zone null,
  user_agent text null,
  ip inet null,
  tag text null,
  constraint sessions_pkey primary key (id),
  constraint sessions_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF NOT EXISTS user_id_created_at_idx on auth.sessions using btree (user_id, created_at) TABLESPACE pg_default;

create index IF NOT EXISTS sessions_user_id_idx on auth.sessions using btree (user_id) TABLESPACE pg_default;

create index IF NOT EXISTS sessions_not_after_idx on auth.sessions using btree (not_after desc) TABLESPACE pg_default;

create table auth.schema_migrations (
  version character varying(255) NOT null,
  constraint schema_migrations_pkey primary key (version)
) TABLESPACE pg_default;


create table auth.flow_state (
  id uuid NOT null,
  user_id uuid null,
  auth_code text NOT null,
  code_challenge_method auth.code_challenge_method NOT null,
  code_challenge text NOT null,
  provider_type text NOT null,
  provider_access_token text null,
  provider_refresh_token text null,
  created_at timestamp with time zone null,
  updated_at timestamp with time zone null,
  authentication_method text NOT null,
  auth_code_issued_at timestamp with time zone null,
  constraint flow_state_pkey primary key (id)
) TABLESPACE pg_default;

create index IF NOT EXISTS idx_auth_code on auth.flow_state using btree (auth_code) TABLESPACE pg_default;

create index IF NOT EXISTS idx_user_id_auth_method on auth.flow_state using btree (user_id, authentication_method) TABLESPACE pg_default;

create index IF NOT EXISTS flow_state_created_at_idx on auth.flow_state using btree (created_at desc) TABLESPACE pg_default;

create table auth.audit_log_entries (
  instance_id uuid null,
  id uuid NOT null,
  payload json null,
  created_at timestamp with time zone null,
  ip_address character varying(64) NOT null default ''::character varying,
  constraint audit_log_entries_pkey primary key (id)
) TABLESPACE pg_default;

create index IF NOT EXISTS audit_logs_instance_id_idx on auth.audit_log_entries using btree (instance_id) TABLESPACE pg_default;

create table auth.saml_relay_states (
  id uuid NOT null,
  sso_provider_id uuid NOT null,
  request_id text NOT null,
  for_email text null,
  redirect_to text null,
  created_at timestamp with time zone null,
  updated_at timestamp with time zone null,
  flow_state_id uuid null,
  constraint saml_relay_states_pkey primary key (id),
  constraint saml_relay_states_flow_state_id_fkey foreign KEY (flow_state_id) references auth.flow_state (id) on delete CASCADE,
  constraint saml_relay_states_sso_provider_id_fkey foreign KEY (sso_provider_id) references auth.sso_providers (id) on delete CASCADE,
  constraint request_id_not_empty check ((char_length(request_id) > 0))
) TABLESPACE pg_default;

create index IF NOT EXISTS saml_relay_states_sso_provider_id_idx on auth.saml_relay_states using btree (sso_provider_id) TABLESPACE pg_default;

create index IF NOT EXISTS saml_relay_states_for_email_idx on auth.saml_relay_states using btree (for_email) TABLESPACE pg_default;

create index IF NOT EXISTS saml_relay_states_created_at_idx on auth.saml_relay_states using btree (created_at desc) TABLESPACE pg_default;

create table auth.saml_providers (
  id uuid NOT null,
  sso_provider_id uuid NOT null,
  entity_id text NOT null,
  metadata_xml text NOT null,
  metadata_url text null,
  attribute_mapping jsonb null,
  created_at timestamp with time zone null,
  updated_at timestamp with time zone null,
  name_id_format text null,
  constraint saml_providers_pkey primary key (id),
  constraint saml_providers_entity_id_key unique (entity_id),
  constraint saml_providers_sso_provider_id_fkey foreign KEY (sso_provider_id) references auth.sso_providers (id) on delete CASCADE,
  constraint entity_id_not_empty check ((char_length(entity_id) > 0)),
  constraint metadata_url_not_empty check (
    (
      (metadata_url = null::text)
      or (char_length(metadata_url) > 0)
    )
  ),
  constraint metadata_xml_not_empty check ((char_length(metadata_xml) > 0))
) TABLESPACE pg_default;

create index IF NOT EXISTS saml_providers_sso_provider_id_idx on auth.saml_providers using btree (sso_provider_id) TABLESPACE pg_default;

create table auth.refresh_tokens (
  instance_id uuid null,
  id bigserial NOT null,
  token character varying(255) null,
  user_id character varying(255) null,
  revoked boolean null,
  created_at timestamp with time zone null,
  updated_at timestamp with time zone null,
  parent character varying(255) null,
  session_id uuid null,
  constraint refresh_tokens_pkey primary key (id),
  constraint refresh_tokens_token_unique unique (token),
  constraint refresh_tokens_session_id_fkey foreign KEY (session_id) references auth.sessions (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF NOT EXISTS refresh_tokens_instance_id_idx on auth.refresh_tokens using btree (instance_id) TABLESPACE pg_default;

create index IF NOT EXISTS refresh_tokens_instance_id_user_id_idx on auth.refresh_tokens using btree (instance_id, user_id) TABLESPACE pg_default;

create index IF NOT EXISTS refresh_tokens_parent_idx on auth.refresh_tokens using btree (parent) TABLESPACE pg_default;

create index IF NOT EXISTS refresh_tokens_session_id_revoked_idx on auth.refresh_tokens using btree (session_id, revoked) TABLESPACE pg_default;

create index IF NOT EXISTS refresh_tokens_updated_at_idx on auth.refresh_tokens using btree (updated_at desc) TABLESPACE pg_default;

create table auth.one_time_tokens (
  id uuid NOT null,
  user_id uuid NOT null,
  token_type auth.one_time_token_type NOT null,
  token_hash text NOT null,
  relates_to text NOT null,
  created_at timestamp without time zone NOT null default now(),
  updated_at timestamp without time zone NOT null default now(),
  constraint one_time_tokens_pkey primary key (id),
  constraint one_time_tokens_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE,
  constraint one_time_tokens_token_hash_check check ((char_length(token_hash) > 0))
) TABLESPACE pg_default;

create index IF NOT EXISTS one_time_tokens_token_hash_hash_idx on auth.one_time_tokens using hash (token_hash) TABLESPACE pg_default;

create index IF NOT EXISTS one_time_tokens_relates_to_hash_idx on auth.one_time_tokens using hash (relates_to) TABLESPACE pg_default;

create unique INDEX IF NOT EXISTS one_time_tokens_user_id_token_type_key on auth.one_time_tokens using btree (user_id, token_type) TABLESPACE pg_default;

create table auth.mfa_factors (
  id uuid NOT null,
  user_id uuid NOT null,
  friendly_name text null,
  factor_type auth.factor_type NOT null,
  status auth.factor_status NOT null,
  created_at timestamp with time zone NOT null,
  updated_at timestamp with time zone NOT null,
  secret text null,
  phone text null,
  last_challenged_at timestamp with time zone null,
  web_authn_credential jsonb null,
  web_authn_aaguid uuid null,
  constraint mfa_factors_pkey primary key (id),
  constraint mfa_factors_last_challenged_at_key unique (last_challenged_at),
  constraint mfa_factors_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF NOT EXISTS mfa_factors_user_id_idx on auth.mfa_factors using btree (user_id) TABLESPACE pg_default;

create unique INDEX IF NOT EXISTS mfa_factors_user_friendly_name_unique on auth.mfa_factors using btree (friendly_name, user_id) TABLESPACE pg_default
where
  (
    TRIM(
      both
      from
        friendly_name
    ) <> ''::text
  );

create index IF NOT EXISTS factor_id_created_at_idx on auth.mfa_factors using btree (user_id, created_at) TABLESPACE pg_default;

create unique INDEX IF NOT EXISTS unique_phone_factor_per_user on auth.mfa_factors using btree (user_id, phone) TABLESPACE pg_default;

create table auth.mfa_challenges (
  id uuid NOT null,
  factor_id uuid NOT null,
  created_at timestamp with time zone NOT null,
  verified_at timestamp with time zone null,
  ip_address inet NOT null,
  otp_code text null,
  web_authn_session_data jsonb null,
  constraint mfa_challenges_pkey primary key (id),
  constraint mfa_challenges_auth_factor_id_fkey foreign KEY (factor_id) references auth.mfa_factors (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF NOT EXISTS mfa_challenge_created_at_idx on auth.mfa_challenges using btree (created_at desc) TABLESPACE pg_default;

create table auth.mfa_amr_claims (
  session_id uuid NOT null,
  created_at timestamp with time zone NOT null,
  updated_at timestamp with time zone NOT null,
  authentication_method text NOT null,
  id uuid NOT null,
  constraint amr_id_pk primary key (id),
  constraint mfa_amr_claims_session_id_authentication_method_pkey unique (session_id, authentication_method),
  constraint mfa_amr_claims_session_id_fkey foreign KEY (session_id) references auth.sessions (id) on delete CASCADE
) TABLESPACE pg_default;

create table auth.instances (
  id uuid NOT null,
  uuid uuid null,
  raw_base_config text null,
  created_at timestamp with time zone null,
  updated_at timestamp with time zone null,
  constraint instances_pkey primary key (id)
) TABLESPACE pg_default;

create table auth.identities (
  provider_id text NOT null,
  user_id uuid NOT null,
  identity_data jsonb NOT null,
  provider text NOT null,
  last_sign_in_at timestamp with time zone null,
  created_at timestamp with time zone null,
  updated_at timestamp with time zone null,
  email text GENERATED ALWAYS as (lower((identity_data ->> 'email'::text))) STORED null,
  id uuid NOT null default gen_random_uuid (),
  constraint identities_pkey primary key (id),
  constraint identities_provider_id_provider_unique unique (provider_id, provider),
  constraint identities_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF NOT EXISTS identities_user_id_idx on auth.identities using btree (user_id) TABLESPACE pg_default;

create index IF NOT EXISTS identities_email_idx on auth.identities using btree (email text_pattern_ops) TABLESPACE pg_default;
