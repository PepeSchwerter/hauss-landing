import { Button } from "../../ui/Button";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="nosotros" className={styles.about}>
      <div className={styles.imageWrap}>
        <div className={styles.accent} />
        <img
          src="https://hauss.cl/img/casa2.jpg"
          alt="Casa Aguirre"
          className={styles.image}
        />
      </div>
      <div>
        <h2 className={styles.title}>Nuestra empresa</h2>
        <p className={styles.body}>
          Empresa Constructora Hauss nació en el Sur de Chile en el año 2014,
          como resultado de un anhelo del matrimonio de una arquitecto y un
          constructor civil, que en conjunto volcaron sus años de experiencia
          en proyectos de construcción y arquitectura.
        </p>
        <p className={styles.body}>
          Desarrollamos proyectos tanto en el área privada como pública,
          obras nuevas o remodelaciones, con la modalidad de llave en mano.
        </p>
        <Button href="#valores" variant="ghost">
          Cómo trabajamos →
        </Button>
      </div>
    </section>
  );
}
