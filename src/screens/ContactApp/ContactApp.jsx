import React, { useState } from 'react';
import styles from './ContactApp.module.css';

const ContactApp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate network request
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 500);
  };

  return (
    <div className={styles.container}>
      {submitted && (
        <div className={styles.successMsg}>
          Message sent successfully! (Simulated)
        </div>
      )}
      
      <h1 className={styles.title}>Let's Connect</h1>
      <p className={styles.subtitle}>Send me a message and I'll get back to you as soon as possible.</p>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input 
            type="text" 
            className={styles.input} 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            placeholder="John Doe"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address</label>
          <input 
            type="email" 
            className={styles.input} 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            placeholder="john@example.com"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Message</label>
          <textarea 
            className={styles.textarea} 
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
            placeholder="Hello there..."
          />
        </div>
        
        <button type="submit" className={styles.submitBtn}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactApp;
