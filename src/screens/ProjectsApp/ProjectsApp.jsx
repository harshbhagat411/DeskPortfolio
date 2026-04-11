import React from 'react';
import styles from './ProjectsApp.module.css';
import { projects } from '../../data/projects';
import { ExternalLink, ShoppingCart, Activity, CheckSquare, Image as ImageIcon } from 'lucide-react';

const iconsMap = {
  'cart': ShoppingCart,
  'activity': Activity,
  'check-square': CheckSquare,
  'image': ImageIcon
};

const ProjectsApp = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Projects</h1>
        <p className={styles.subtitle}>A selection of applications and design experiments.</p>
      </header>
      
      <div className={styles.grid}>
        {projects.map(project => {
          const Icon = iconsMap[project.image] || ExternalLink;
          return (
            <div key={project.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <Icon size={20} />
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
              </div>
              
              <p className={styles.cardDesc}>{project.description}</p>
              
              <div className={styles.techStack}>
                {project.techStack.map(tech => (
                  <span key={tech} className={styles.techBadge}>{tech}</span>
                ))}
              </div>
              
              <a href={project.link} className={styles.link} target="_blank" rel="noreferrer">
                View Project →
              </a>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ProjectsApp;
