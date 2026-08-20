import { Button } from "../../ui/Button";
import styles from "./Quote.module.css";

export function Quote() {
  return (
    <section className={styles.quote}>
      <div className={styles.square1} />
      <div className={styles.square2} />
      <div className={styles.square3} />
      <div className={styles.inner}>
        <p className={styles.text}>
          En HAUSS buscamos hacer las cosas bien, poner toda nuestra pasión y
          esfuerzo para desarrollar el mejor proyecto.
        </p>
        <Button href="#contacto" variant="dark" size="lg">
          Contáctanos
        </Button>
      </div>
    </section>
  );
}
