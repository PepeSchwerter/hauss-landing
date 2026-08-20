import { config, fields, collection } from "@keystatic/core";

// Local storage (writes straight to the filesystem) only works where a real
// disk exists — `astro dev` on a dev machine. The deployed site runs on
// Cloudflare Workers, which has no filesystem, so production uses GitHub
// storage instead: edits go through the GitHub API as real commits,
// authenticated via a GitHub App (see DEPLOY.md).
//
// Unlike astro.config.mjs, this file is also bundled into the browser (the
// Keystatic admin UI needs the collection schema client-side), so the dev
// check has to be something Vite can resolve in both environments —
// `process.argv` doesn't exist in a browser bundle and throws at runtime.
const isDev = import.meta.env.DEV;

export default config({
  storage: isDev
    ? { kind: "local" }
    : { kind: "github", repo: { owner: "PepeSchwerter", name: "hauss-landing" } },
  collections: {
    projects: collection({
      label: "Proyectos",
      slugField: "title",
      path: "src/content/projects/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({
          name: {
            label: "Nombre del proyecto",
            validation: { isRequired: true },
          },
        }),
        tag: fields.text({
          label: "Tag",
          defaultValue: "Residencial",
          validation: { isRequired: true },
        }),
        photos: fields.array(
          fields.image({
            label: "Foto",
            directory: "public/projects",
            publicPath: "/projects/",
            validation: { isRequired: true },
          }),
          {
            label: "Fotos",
            itemLabel: (props) => props.value?.filename ?? "Foto",
            validation: { length: { min: 1 } },
          },
        ),
      },
    }),
  },
});
