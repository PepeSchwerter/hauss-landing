import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import type { ContactDetail } from "../../../data/content";
import { useContactForm } from "./useContactForm";
import styles from "./Contact.module.css";

interface ContactProps {
  details: ContactDetail[];
}

export function Contact({ details }: ContactProps) {
  const { status, errorMessage, handleSubmit } = useContactForm();

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Cuéntanos sobre tu proyecto</h2>
          <p className={styles.lead}>
            Escríbenos y te asesoramos desde la primera idea hasta la entrega
            de la obra.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <Input
              name="name"
              label="Nombre"
              placeholder="Tu nombre"
              required
              disabled={status === "loading"}
            />
            <Input
              name="phone"
              label="Teléfono"
              placeholder="+56 9 1234 5678"
              type="tel"
              disabled={status === "loading"}
            />
          </div>
          <Input
            name="email"
            label="Correo electrónico"
            placeholder="tu@email.com"
            type="email"
            required
            disabled={status === "loading"}
          />
          <Textarea
            name="details"
            label="Tipo de proyecto y detalles"
            placeholder="Obra nueva, remodelación, ubicación, plazos…"
            required
            disabled={status === "loading"}
          />
          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando..." : "Enviar"}
            </Button>
          </div>
          {status === "success" && (
            <p className={styles.formSuccess}>
              ¡Gracias! Recibimos tu mensaje y te contactaremos pronto.
            </p>
          )}
          {status === "error" && (
            <p className={styles.formError}>{errorMessage}</p>
          )}
        </form>

        <div className={styles.info}>
          {details.map((detail) => (
            <div key={detail.label}>
              <div className={styles.infoLabel}>{detail.label}</div>
              <div className={styles.infoValue}>{detail.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
