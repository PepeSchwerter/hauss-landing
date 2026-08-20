import type { ReactNode } from "react";
import styles from "./Tag.module.css";

type TagTone = "ink" | "yellow" | "red" | "pink" | "outline";

interface TagProps {
  tone?: TagTone;
  children: ReactNode;
}

export function Tag({ tone = "ink", children }: TagProps) {
  return <span className={`${styles.tag} ${styles[tone]}`}>{children}</span>;
}
