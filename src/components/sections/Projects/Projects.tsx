import { Tag } from "../../ui/Tag";
import { ProjectGallery } from "./ProjectGallery";
import type { Project } from "../../../data/content";
import styles from "./Projects.module.css";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="proyectos" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Proyectos</h2>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div key={project.title} className={styles.card}>
              <ProjectGallery
                id={`gallery-${index}`}
                title={project.title}
                images={project.images}
              />

              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <Tag tone="yellow">{project.tag}</Tag>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
