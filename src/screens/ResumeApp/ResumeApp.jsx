import React from 'react';
import styles from './ResumeApp.module.css';
import { Download } from 'lucide-react';

const ResumeApp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>John Smith</h1>
          <p className={styles.subtitle}>Software Engineer & UI Developer</p>
        </div>
        <button 
          className={styles.downloadBtn} 
          onClick={() => alert("Simulated PDF Download")}
        >
          <Download size={18} /> Download PDF
        </button>
      </div>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        
        <div className={styles.item}>
          <div className={styles.itemHeader}>
            <h3 className={styles.itemTitle}>Senior Frontend Developer</h3>
            <span className={styles.itemDate}>2021 - Present</span>
          </div>
          <div className={styles.itemSubtitle}>Tech Innovations Inc.</div>
          <p className={styles.itemDesc}>
            Lead the development of the core product dashboard using React, Tailwind and Redux. 
            Improved load speeds by 40% through code splitting and asset optimization. Mentored 
            junior engineers and established frontend testing standards.
          </p>
        </div>

        <div className={styles.item}>
          <div className={styles.itemHeader}>
            <h3 className={styles.itemTitle}>Full Stack Developer</h3>
            <span className={styles.itemDate}>2018 - 2021</span>
          </div>
          <div className={styles.itemSubtitle}>Creative Digital Agency</div>
          <p className={styles.itemDesc}>
            Built custom e-commerce solutions for enterprise clients. Handled full lifecycle 
            from requirements gathering to deployment. Integrated Stripe payment gateways and 
            RESTful APIs.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Education</h2>
        
        <div className={styles.item}>
          <div className={styles.itemHeader}>
            <h3 className={styles.itemTitle}>BSc in Computer Science</h3>
            <span className={styles.itemDate}>2014 - 2018</span>
          </div>
          <div className={styles.itemSubtitle}>University of Technology</div>
          <p className={styles.itemDesc}>
            Specialized in Software Engineering and Human-Computer Interaction. 
            Graduated with First-Class Honors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeApp;
