import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <label className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        className={[styles.input, className].filter(Boolean).join(" ")}
        {...props}
      />
    </label>
  );
}
