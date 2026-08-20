import type { NavLink } from "../../../data/content";
import styles from "./Footer.module.css";

interface FooterProps {
  links: NavLink[];
}

export function Footer({ links }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.wordmark}>HAUSS</div>
          <div className={styles.links}>
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.bottom}>
          <div>© 2026 Constructora Hauss</div>
          <div>Puerto Montt, Chile · contacto@hauss.cl</div>
        </div>
      </div>
    </footer>
  );
}
