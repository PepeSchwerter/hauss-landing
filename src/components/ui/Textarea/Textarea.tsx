import type { TextareaHTMLAttributes } from "react";
import styles from "../Input/Input.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className, rows = 4, ...props }: TextareaProps) {
  return (
    <label className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      <textarea
        rows={rows}
        className={[styles.input, styles.textarea, className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </label>
  );
}
