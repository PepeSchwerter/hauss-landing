# Deploy en Cloudflare Pages: edición de contenido con Keystatic en producción

Este documento describe qué implicaría habilitar la edición de contenido (Keystatic) directamente en el sitio desplegado en Cloudflare Pages, en vez de solo en local. Ver [CLAUDE.md](./CLAUDE.md) sección 4 para el estado actual (Keystatic solo corre en `npm run dev`, con `storage: local`).

## Cómo funcionaría

Hoy `keystatic.config.ts` usa `storage: { kind: 'local' }`, que escribe directamente al filesystem — por eso solo funciona en local y `/keystatic` está excluido del build de producción (Cloudflare Workers no tiene filesystem persistente).

Para editar en producción hay que cambiar `storage.kind` a `github`. En ese modo, Keystatic deja de tocar el filesystem: lee y escribe contenido directamente contra la API de GitHub, y cada edición genera un commit real en el repo. Eso es justo lo que resuelve el problema del filesystem en Cloudflare Workers.

**Login/protección de la ruta:** no hay usuario/contraseña propio de Keystatic. Se registra una **GitHub App**, y el flujo de acceso es "Sign in with GitHub" — el editor se autentica con su cuenta de GitHub, y Keystatic usa los permisos de esa cuenta sobre el repo para decidir si puede guardar. Si la cuenta no tiene acceso de escritura al repo, GitHub rechaza el commit. Es decir, la protección de `/keystatic` en producción es ni más ni menos que "¿esta persona es colaboradora del repo?" — no hay que construir ningún sistema de auth propio.

## Qué se necesita (setup, una sola vez)

1. **Inicializar git y crear el repo en GitHub** — hoy esta carpeta ni siquiera es un repo git, así que es el primer paso real.
2. Crear una GitHub App:
   - Permisos: Repository contents (read/write), Metadata (read).
   - Callback URL apuntando a `/api/keystatic/github/oauth/callback` del sitio desplegado.
3. Instalar esa App sobre el repo específico.
4. Guardar como variables de entorno/secrets en el proyecto de Cloudflare Pages:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
5. Quitar el condicional `isDev` de `/keystatic` en `astro.config.mjs`. El **Cloudflare Adapter** (`@astrojs/cloudflare`) ya está agregado al proyecto — se instaló para el endpoint de contacto (`src/pages/api/contacto.ts`, ver sección 3 del `CLAUDE.md`) — así que no hace falta agregarlo de nuevo, solo dejar que `/keystatic` también se sirva on-demand en producción en vez de excluirse del build.
6. Conectar el repo de GitHub a Cloudflare Pages para que cada `push` dispare un redeploy automático (comportamiento por defecto de Cloudflare Pages, sin costo extra).

## Pros

- Sin sistema de login propio que mantener — reutiliza los permisos de GitHub.
- Cada edición queda como un commit auditable y reversible (historial de cambios "gratis").
- Compatible 100% con hosting serverless/estático — no depende de filesystem en runtime.

## Contras / consideraciones

- **No es instantáneo:** cada edición dispara un commit → Cloudflare Pages rebuildea el sitio → recién ahí se ve el cambio en vivo (típicamente decenas de segundos a un par de minutos). Hay que explicarle esto al cliente para que no piense que "no funcionó".
- **Percepción del cliente:** aunque Keystatic oculta casi todo, la pantalla de login dice "GitHub" — para un cliente no técnico puede generar confusión ("¿por qué necesito GitHub para subir fotos?"). Se mitiga creándole una cuenta dedicada y explicándoselo una vez.
- **Fotos pesadas en el repo:** las imágenes se commitean como binarios al repo de git — con las fotos actuales (varios MB c/u) el repo va a crecer rápido. Vale la pena comprimir/optimizar antes de escalar esto.
- **Build minutes:** el free tier de Cloudflare Pages tiene un límite de builds/mes — para un uso esporádico de fotos no debería ser problema, pero si el cliente edita muy seguido en ráfagas, es algo a vigilar.
- **Gestión de acceso:** dar/quitar acceso al cliente = agregarlo/sacarlo como colaborador del repo de GitHub (o de la instalación de la App).

## ¿Se puede con el free tier?

Sí. Pages Functions (100.000 requests/día), variables de entorno/secrets, y auto-deploy on push están todos incluidos en el plan gratuito de Cloudflare Pages. No hay costo adicional por habilitar esto.

## Prerrequisito pendiente

Antes de poder hacer cualquiera de estos pasos, falta definir e inicializar el repo de GitHub (hoy el proyecto no es un repo git) y decidir en qué cuenta va a vivir (la del desarrollador o la del cliente), ya que de eso depende quién administra la GitHub App y los colaboradores.
