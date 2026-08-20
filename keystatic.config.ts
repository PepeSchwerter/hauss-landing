import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
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
