/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY?: string;
  readonly CONTACT_TO_EMAIL?: string;
  readonly CONTACT_FROM_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Cloudflare Workers runtime module — vars/secrets injected by Cloudflare
// Pages at request time. See src/pages/api/contacto.ts.
declare module "cloudflare:workers" {
  export const env: Record<string, string | undefined>;
}
