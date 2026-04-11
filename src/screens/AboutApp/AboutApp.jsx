import React from 'react';
import styles from './AboutApp.module.css';

const skills = [
  'JavaScript (ES6+)', 'React.js', 'Node.js', 'Typescript', 'HTML5 & CSS3', 
  'Tailwind CSS', 'Next.js', 'Python', 'SQL', 'Git & GitHub'
];

const AboutApp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>JS</div>
        <div>
          <h1 className={styles.title}>John Smith</h1>
          <h2 className={styles.subtitle}>Full Stack Developer & UI Designer</h2>
        </div>
      </div>
      
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>About Me</h3>
        <p className={styles.bio}>
          I'm a passionate software engineer specializing in building exceptional digital experiences. 
          Currently, I'm focused on building accessible, human-centered products that mimic native 
          desktop functionalities right in the browser. I believe in clean code, beautiful design, 
          and continuous learning.
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Technical Skills</h3>
        <div className={styles.skillsGrid}>
          {skills.map(skill => (
            <div key={skill} className={styles.skillBadge}>{skill}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutApp;
