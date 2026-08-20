import { config, fields, collection } from "@keystatic/core";

// Local storage (writes straight to the filesystem) only works where a real
// disk exists — `astro dev` on a dev machine. The deployed site runs on
// Cloudflare Workers, which has no filesystem, so production uses GitHub
// storage instead: edits go through the GitHub API as real commits,
// authenticated via a GitHub App (see DEPLOY.md).
const isDev = process.argv.includes("dev");

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
