
Este documento resume las decisiones tecnológicas, la arquitectura de infraestructura y los conceptos de escalabilidad discutidos para el desarrollo de una landing page comercial, enfocada en alto rendimiento, autogestión de contenido y costos operativos nulos.

## 1. Arquitectura Frontend y Gestión de Contenido

Para construir una página web rápida y permitir que usuarios no técnicos (el cliente) editen contenido sin tocar código, la mejor combinación es un sitio estático con un CMS integrado.

*   **Framework Principal:** **Astro JS**. Ideal para sitios centrados en contenido, genera HTML estático ultrarrápido y permite usar componentes de React, Tailwind CSS y Framer Motion.
*   **Gestión de Contenido (CMS):** **Keystatic**.
    *   Se integra nativamente con las *Content Collections* de Astro.
    *   Provee una interfaz visual (similar a Notion) que vive en la ruta `/keystatic` del mismo sitio.
    *   El cliente edita contenido visualmente y Keystatic genera automáticamente *commits* en el repositorio de GitHub con archivos Markdown (`.md`).
    *   **Alternativas consideradas:** Storyblok (visual), Sanity (estructurado), Decap CMS.

## 2. Infraestructura y Hosting

Para el despliegue del proyecto con un *Free Tier* generoso y apto para uso comercial:

*   **Proveedor Elegido:** **Cloudflare Pages**.
    *   Permite uso comercial explícito en su plan gratuito.
    *   Ofrece latencia ultrabaja gracias a sus servidores Edge locales (con nodos físicos en Chile: Santiago, Valparaíso, Arica, Concepción).
    *   Incluye **Edge Functions** (Cloudflare Workers) gratuitas con un límite de 100.000 peticiones diarias.
    *   **Alternativas consideradas:** Vercel (excelente DX, pero uso comercial restringido en Free Tier), Netlify.

## 3. Manejo de Formularios sin Servidor Dedicado

Dado que el sitio es estático, el envío de correos desde el formulario de contacto se maneja mediante arquitectura *Serverless*.

*   **Solución implementada:** **Astro API Endpoints + Resend**.
    *   Se agregó el *Cloudflare Adapter* (`@astrojs/cloudflare`) en `astro.config.mjs`, con `export const prerender = false` en `src/pages/api/contacto.ts` para que solo ese endpoint se compile como Edge Function — el resto del sitio se sigue prerenderizando a HTML estático (comportamiento por defecto de Astro cuando hay adapter pero no `output: 'server'`).
    *   Esa función usa el SDK de **Resend** para despachar el email, leyendo `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL` vía `import { env } from "cloudflare:workers"` (con fallback a `import.meta.env` para `astro dev` local sin runtime de Cloudflare). Ver `.env.example` para las variables necesarias — en producción se configuran como env vars/secrets del proyecto de Cloudflare Pages, no vía `.env`.
    *   El formulario en `Contact.tsx` hace `fetch` al endpoint con `useState` para los estados `idle/loading/success/error` (sin TanStack Query — no valía la pena la dependencia extra para un solo formulario).
    *   **Detalle de infraestructura:** el adapter de Cloudflare, por defecto, prerenderiza las rutas estáticas dentro de un runtime `workerd` emulado (para detectar incompatibilidades de Node antes del deploy). Eso rompía el build porque `src/pages/index.astro` usa `createReader` de Keystatic, que necesita `node:fs` real. Se fijó `prerenderEnvironment: 'node'` en la config del adapter para que el prerender siga corriendo en Node normal — Workers no tiene filesystem real ni con `nodejs_compat`.
    *   **Alternativas consideradas:** Web3Forms (sin código backend, rápido de implementar), EmailJS.

## 4. Gestión de Contenido: Proyectos vía Keystatic

Se integró **Keystatic** (`@keystatic/core` + `@keystatic/astro`) para que el cliente pueda administrar la sección "Proyectos" (nombre, tag y fotos de cada obra) sin tocar código. Por ahora el alcance es solo esta colección.

*   **Configuración:** `keystatic.config.ts` (raíz del proyecto). Define la colección `projects`. El `storage` es condicional según el comando (`isDev = process.argv.includes('dev')`, mismo patrón que `astro.config.mjs`):
    *   `npm run dev` → `{ kind: 'local' }`: escribe directo al filesystem local. Pensado para edición del equipo de desarrollo (local + commit manual, ver más abajo).
    *   `astro build` (producción) → `{ kind: 'github', repo: { owner: 'PepeSchwerter', name: 'hauss-landing' } }`: Keystatic deja de tocar el filesystem y escribe contenido vía la API de GitHub — cada edición en producción genera un commit real. Requiere una GitHub App (login "Sign in with GitHub") y tres env vars/secrets en el proyecto de Cloudflare Pages: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`. Detalle completo del setup en [DEPLOY.md](./DEPLOY.md).
*   **Dónde vive el contenido:**
    *   Datos de cada proyecto: `src/content/projects/<slug>.yaml` (título, tag, array de fotos).
    *   Fotos subidas: `public/projects/<slug>/...` (Keystatic las sube ahí y las referencia como `/projects/<slug>/archivo.jpg`).
*   **Cómo se lee en la página:** `src/pages/index.astro` usa `createReader` de `@keystatic/core/reader` en el frontmatter para leer `src/content/projects/*` en tiempo de build y arma el array `projects` que consume el componente `Projects` (`src/components/sections/Projects/Projects.tsx`). El tipo `Project` vive en `src/data/content.ts`.
*   **Detalle importante de infraestructura:** la ruta admin `/keystatic` se registra como página *on-demand* (SSR) — igual que `/api/contacto` (sección 3), se sirve como Cloudflare Pages Function usando el mismo adapter, ya que con `storage: 'github'` Keystatic no necesita filesystem en producción (solo llama a la API de GitHub vía `fetch`). La integración `keystatic()` en `astro.config.mjs` ya no está condicionada a `astro dev`: se registra siempre, para que `astro build` también incluya `/keystatic`. Lo que sigue siendo condicional es el *adapter* (`isDev ? undefined : cloudflare(...)`) — en `astro dev` no se registra, así que ahí `/keystatic` sigue corriendo sobre el servidor de desarrollo plano de Astro (Node real), consistente con que en dev el storage es `local` y necesita filesystem real (ver `LEARNINGS.md` para el porqué de este condicional).

### Cómo correr Keystatic en local

```bash
npm run dev
```

Abrir [http://localhost:4321/keystatic](http://localhost:4321/keystatic) en el navegador. Ahí se puede crear/editar proyectos (nombre, tag, subir fotos) — los cambios se escriben directamente en `src/content/projects/` y `public/projects/` del working directory. Después de editar, hay que revisar `git status` y commitear esos cambios como cualquier otro cambio de código (no hay push automático porque el storage es `local`, no `github`).

No usar Playwright ni nada similar para revisar una versión en vivo.