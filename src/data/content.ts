export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Misión y valores", href: "#valores" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export const footerLinks: NavLink[] = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
  { label: "Instagram", href: "https://www.instagram.com/constructorahauss/" },
];

export interface Value {
  num: string;
  label: string;
}

export const values: Value[] = [
  { num: "01", label: "Honestidad" },
  { num: "02", label: "Compromiso con la calidad" },
  { num: "03", label: "Mejora continua" },
  { num: "04", label: "Trabajo en equipo y respeto mutuo" },
  { num: "05", label: "Inclusión" },
];

export interface Project {
  title: string;
  tag: string;
  /** First image is used as the card cover and as the gallery's first slide. */
  images: string[];
}

// Project entries live in src/content/projects/ and are managed from the
// Keystatic admin UI (/keystatic). See src/pages/index.astro for how they're
// read and mapped into this shape.

export interface ContactDetail {
  label: string;
  value: string;
}

export const contactDetails: ContactDetail[] = [
  { label: "Ubicación", value: "Puerto Montt, Chile" },
  { label: "Teléfono", value: "+56 9 74804446" },
  { label: "Correo", value: "contacto@hauss.cl" },
];
