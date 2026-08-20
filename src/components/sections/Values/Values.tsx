import type { Value } from "../../../data/content";
import styles from "./Values.module.css";

interface ValuesProps {
  values: Value[];
}

export function Values({ values }: ValuesProps) {
  return (
    <section id="valores" className={styles.values}>
      <div className={styles.header}>
        <h2 className={styles.title}>Cómo trabajamos</h2>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.index}>01</div>
          <h3 className={styles.cardTitle}>Misión</h3>
          <p className={styles.cardBody}>
            Ofrecer una atención personalizada, de acuerdo a los
            requerimientos de nuestros clientes, asesorándolos en todas las
            etapas de su proyecto.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.index}>02</div>
          <h3 className={styles.cardTitle}>Visión</h3>
          <p className={styles.cardBody}>
            Construir obras de calidad para nuestros clientes, ya sean
            grandes o pequeños proyectos. Buscar una mejora continua en
            nuestros procesos de construcción. Propiciar un clima laboral
            agradable para trabajar, con el fin de que nuestro personal
            entregue lo mejor de sí.
          </p>
        </div>

        <div className={styles.cardAccent}>
          <div className={styles.indexAccent}>03</div>
          <h3 className={styles.cardTitle}>Valores</h3>
          <div className={styles.valuesList}>
            {values.map((value) => (
              <div key={value.num} className={styles.valueItem}>
                <span className={styles.valueNum}>{value.num}</span>
                <span className={styles.valueLabel}>{value.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
