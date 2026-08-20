import type { APIRoute } from "astro";
import { Resend } from "resend";

// Rendered on-demand as a Cloudflare Pages Function; the rest of the site
// stays static. See astro.config.mjs.
export const prerender = false;

interface ContactPayload {
  name?: string;
  phone?: string;
  email?: string;
  details?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Cloudflare Pages injects env vars/secrets via the `cloudflare:workers`
// module at request time. That module only exists inside the Workers
// runtime — the adapter isn't registered for `astro dev` (see
// astro.config.mjs), so it's dynamic-imported and swallowed on failure
// instead of statically imported, letting local dev fall back to
// `import.meta.env` without crashing module resolution.
let cloudflareEnvPromise: Promise<Record<string, string | undefined>> | undefined;
function getCloudflareEnv() {
  if (!cloudflareEnvPromise) {
    cloudflareEnvPromise = import("cloudflare:workers")
      .then((mod) => mod.env as Record<string, string | undefined>)
      .catch(() => ({}));
  }
  return cloudflareEnvPromise;
}

async function getEnv(key: keyof ImportMetaEnv) {
  const cloudflareEnv = await getCloudflareEnv();
  return cloudflareEnv[key] ?? import.meta.env[key];
}

export const POST: APIRoute = async ({ request }) => {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Solicitud inválida." }, 400);
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const details = payload.details?.trim();
  const phone = payload.phone?.trim();

  if (!name || !email || !details) {
    return jsonResponse(
      { error: "Nombre, correo y detalles son obligatorios." },
      400,
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return jsonResponse({ error: "El correo electrónico no es válido." }, 400);
  }

  const apiKey = await getEnv("RESEND_API_KEY");
  const toEmail = await getEnv("CONTACT_TO_EMAIL");
  const fromEmail = await getEnv("CONTACT_FROM_EMAIL");

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "Faltan RESEND_API_KEY, CONTACT_TO_EMAIL o CONTACT_FROM_EMAIL.",
    );
    return jsonResponse(
      { error: "No se pudo enviar el mensaje. Intenta más tarde." },
      500,
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `Nuevo contacto de ${name}`,
    text: [
      `Nombre: ${name}`,
      `Correo: ${email}`,
      `Teléfono: ${phone || "No indicado"}`,
      "",
      "Detalles:",
      details,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return jsonResponse(
      { error: "No se pudo enviar el mensaje. Intenta más tarde." },
      502,
    );
  }

  return jsonResponse({ ok: true }, 200);
};
