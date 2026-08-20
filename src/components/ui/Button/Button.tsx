import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "dark" | "ghost" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  if (props.href) {
    return (
      <a {...props} className={classes}>
        {children}
        {icon && <span aria-hidden="true">{icon}</span>}
      </a>
    );
  }

  return (
    <button {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {children}
      {icon && <span aria-hidden="true">{icon}</span>}
    </button>
  );
}
