import React from "react";
import styles from "./AboutApp.module.css";
import { Sparkles, Users, Palette, Handshake, Download } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import GlassButton from "../../components/ui/GlassButton";
import { useTheme } from "next-themes";
import logoLight from "../../assets/branding/personal-logo-light.png";
import logoDark from "../../assets/branding/personal-logo-dark.png";

const skills = [
  "User Research",
  "Wireframing",
  "Prototyping",
  "Design Systems",
  "JavaScript",
  "React.js",
  "Node.js",
  "Typescript",
  "HTML5 & CSS3",
  "Tailwind CSS",
  "Python",
  "C++",
  "SQL",
  "Git & GitHub",
];

const tools = [
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Canva",
  "Visual Studio Code",
  "Android Studio",
  "GitHub ",
  "Antigravity",
];

const AboutApp = () => {
  const { resolvedTheme } = useTheme();
  const [logoError, setLogoError] = React.useState(false);

  React.useEffect(() => {
    setLogoError(false);
  }, [resolvedTheme]);

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          {!logoError ? (
            <img
              src={resolvedTheme === "dark" ? logoDark : logoLight}
              alt="Harsh Bhagat"
              className={styles.avatarImg}
              draggable="false"
              onError={() => setLogoError(true)}
            />
          ) : (
            "JS"
          )}
        </div>
        <div>
          <h1 className={styles.title}>Harsh Bhagat</h1>
          <h2 className={styles.subtitle}>
            UI/UX Designer & Front-End Developer
          </h2>
          <h3 className={styles.tagline}>
            Visual storyteller turning ideas into digital journeys and visuals
            <br /> that just feel right.
          </h3>
          <a
            href="/resume/Harsh_Bhagat_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadLink}
          >
            <GlassButton className={styles.downloadBtn}>
              <Download size={16} /> Download Resume
            </GlassButton>
          </a>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>About Me</h3>
        <p className={styles.bio}>
          Hi, I'm Harsh Bhagat, a UI/UX Designer and Front-End Developer with a
          passion for creating digital products that are intuitive, functional,
          and visually engaging.
        </p>
        <br />
        <p className={styles.bio}>
          My journey began with development, where I learned how products are
          built. Over time, I became fascinated by the decisions behind great
          user experiences why some interfaces feel effortless while others
          create friction. That curiosity led me into UI/UX design.
        </p>
        <br />
        <p className={styles.bio}>
          Today, I enjoy working across the entire product design process from
          understanding user problems and creating wireframes to designing
          polished interfaces and collaborating on implementation. My technical
          background helps me create designs that are not only user-friendly but
          also practical to build.
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>My Design Philosophy</h3>
        <p className={styles.sectionIntro}>
          The principles that guide every product, interface, and interaction I design.
        </p>
        <div className={styles.philosophyGrid}>
          <GlassCard hoverType="subtle" aspectSquare={false} className={styles.philosophyCard}>
            <Sparkles size={24} className={styles.cardIcon} />
            <h4 className={styles.cardTitle}>Simplicity First</h4>
            <p className={styles.cardDesc}>
              I believe the best interfaces remove unnecessary complexity and help users accomplish their goals with confidence.
            </p>
          </GlassCard>
          
          <GlassCard hoverType="subtle" aspectSquare={false} className={styles.philosophyCard}>
            <Users size={24} className={styles.cardIcon} />
            <h4 className={styles.cardTitle}>Users Before Features</h4>
            <p className={styles.cardDesc}>
              Every design decision should solve a real user problem rather than simply adding more functionality.
            </p>
          </GlassCard>

          <GlassCard hoverType="subtle" aspectSquare={false} className={styles.philosophyCard}>
            <Palette size={24} className={styles.cardIcon} />
            <h4 className={styles.cardTitle}>Design With Purpose</h4>
            <p className={styles.cardDesc}>
              Good visuals attract attention, but thoughtful interactions build trust and create lasting experiences.
            </p>
          </GlassCard>

          <GlassCard hoverType="subtle" aspectSquare={false} className={styles.philosophyCard}>
            <Handshake size={24} className={styles.cardIcon} />
            <h4 className={styles.cardTitle}>Collaboration Matters</h4>
            <p className={styles.cardDesc}>
              The best products come from designers, developers, and stakeholders working together toward a shared goal.
            </p>
          </GlassCard>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Technical Skills</h3>
        <div className={styles.skillsGrid}>
          {skills.map((skill) => (
            <div key={skill} className={styles.skillBadge}>
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Tools</h3>
        <div className={styles.skillsGrid}>
          {tools.map((tool) => (
            <div key={tool} className={styles.skillBadge}>
              {tool}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutApp;
