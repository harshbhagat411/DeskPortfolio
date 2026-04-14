import React from 'react';
import styles from './ProjectsApp.module.css';
import { Component as MorphingCardStack } from '../../components/ui/morphing-card-stack';
import { Layers, Palette, Clock, Sparkles } from 'lucide-react';

const projectsData = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-scale e-commerce platform with auth & payments",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "Social Media Dashboard",
    description: "Analytics dashboard with real-time data visualization",
    icon: <Palette className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "Task Management App",
    description: "Task tracking with reminders and productivity tools",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    id: "4",
    title: "AI Image Generator",
    description: "Generate images using AI models with prompt control",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

const ProjectsApp = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Projects</h1>
        <p className={styles.subtitle}>A selection of applications and design experiments.</p>
      </header>
      
      <div className="mt-6" style={{ width: '100%', height: '100%', paddingBottom: '2rem' }}>
        <MorphingCardStack cards={projectsData} defaultLayout="stack" />
      </div>
    </div>
  );
};

export default ProjectsApp;
