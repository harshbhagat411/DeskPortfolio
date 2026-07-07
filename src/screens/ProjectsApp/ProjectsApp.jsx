import React from 'react';
import styles from './ProjectsApp.module.css';
import { Component as MorphingCardStack } from '../../components/ui/morphing-card-stack';
import { projects } from '../../data/projects';
import { Layers, Palette, ShieldAlert, Cpu, CalendarClock, Gamepad2 } from 'lucide-react';

const iconMap = {
  'portfolio-os': <Layers className="h-5 w-5" />,
  'tasker-ai': <Palette className="h-5 w-5" />,
  'heart-disease-ai': <ShieldAlert className="h-5 w-5" />,
  'ai-attendance': <Cpu className="h-5 w-5" />,
  'turf-booking': <CalendarClock className="h-5 w-5" />,
  'gamezone': <Gamepad2 className="h-5 w-5" />,
};

const ProjectsApp = () => {
  const cardsData = projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    icon: iconMap[p.id] || <Layers className="h-5 w-5" />,
  }));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Projects</h1>
        <p className={styles.subtitle}>A selection of applications and design experiments.</p>
      </header>
      
      <div className="mt-6" style={{ width: '100%', height: '100%', paddingBottom: '2rem' }}>
        <MorphingCardStack cards={cardsData} defaultLayout="stack" />
      </div>
    </div>
  );
};

export default ProjectsApp;
