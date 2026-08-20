import { Button } from "../../ui/Button";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.title}>Concreta tus ideas.</h1>
        <p className={styles.lead}>
          Obras nuevas y remodelaciones en el área privada y pública, con la
          modalidad de llave en mano. Un solo equipo a cargo de tu proyecto,
          de principio a fin.
        </p>
        <div className={styles.actions}>
          <Button href="#contacto" variant="dark" size="lg">
            Contáctanos
          </Button>
          <Button href="#proyectos" variant="ghost" size="lg">
            Ver proyectos
          </Button>
        </div>
      </div>
      <div className={styles.imageWrap}>
        <img
          src="https://hauss.cl/img/landing2.jpg"
          alt="Casa Parpalén"
          className={styles.image}
        />
      </div>
    </section>
  );
}
