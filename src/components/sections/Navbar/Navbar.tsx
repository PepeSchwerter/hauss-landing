import { Button } from "../../ui/Button";
import type { NavLink } from "../../../data/content";
import styles from "./Navbar.module.css";

interface NavbarProps {
  links: NavLink[];
}

// Mobile menu open/close is a pure CSS checkbox toggle — no client JS ships
// for this component. Tradeoff: the panel doesn't auto-close after a link
// is clicked, since that would require script.
export function Navbar({ links }: NavbarProps) {
  return (
    <div className={styles.outer}>
      <input type="checkbox" id="nav-toggle" className={styles.toggle} />

      <div className={styles.bar}>
        <div className={styles.wordmark}>HAUSS</div>

        <div className={styles.links}>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.right}>
          <Button href="#contacto" size="sm" className={styles.cta}>
            Contáctanos
          </Button>
          <label
            htmlFor="nav-toggle"
            className={styles.burger}
            aria-label="Abrir menú"
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </label>
        </div>
      </div>

      <div className={styles.mobileMenu}>
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
