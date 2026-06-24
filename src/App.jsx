import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, ArrowUpRight, ChevronDown, Terminal, Layers, Cpu, Globe, Database, BrainCircuit, Award, Code2, Menu, X, Bot, ExternalLink } from 'lucide-react';
import { Link001, Link004 } from '@/components/ui/skiper-ui/skiper40';

/* ─── COLORS ─── */
const C = {
  void: '#050505',
  surface: '#0a0a0a',
  card: '#111113',
  cardHover: '#19191b',
  border: 'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.15)',
  text: '#f0f0f0',
  textSec: '#9a9aa0',
  textMuted: '#555560',
  textDark: '#0f0f0f',
  accent: '#c5b0f4',
  lime: '#dceeb1',
  lilac: '#c5b0f4',
  cream: '#f4ecd6',
  mint: '#c8e6cd',
  coral: '#f3c9b6',
  pink: '#efd4d4',
};

/* ─── ANIMATION PRESETS ─── */
const reveal = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i = 0) => ({
    y: '0%', opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.13 },
  }),
};
const fade = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

/* ─── SHARED STYLES ─── */
const S = {
  display: { fontFamily: "'Playfair Display', Georgia, serif" },
  mono: { fontFamily: "'JetBrains Mono', monospace" },
  section: { maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: C.textMuted,
    marginBottom: 20,
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '14px 28px',
    borderRadius: 999,
    fontSize: 15,
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    letterSpacing: '-0.01em',
  },
};

/* ═══════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════ */

import { cn } from '@/lib/utils';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      style={{
        position: 'fixed', top: 20, left: 20, right: 20, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px', borderRadius: 16,
        background: scrolled ? 'rgba(5,5,5,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        border: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
        transition: 'all 0.5s ease',
      }}
    >
      <a href="#" style={{ ...S.display, fontSize: 22, fontWeight: 700, color: C.text, textDecoration: 'none' }}>
        AVS<span style={{ color: C.accent }}>.</span>
      </a>

      {/* Dynamic Island Container */}
      <motion.div layout style={{ position: 'absolute', left: '50%', x: '-50%' }} className="hidden md:flex flex-col items-center">
        
        {/* Radiating Attention Glow */}
        <AnimatePresence>
          {!toggle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                exit: { duration: 0.2 }
              }}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(135deg, #c5b0f4, #dceeb1)',
                filter: 'blur(14px)',
                borderRadius: 40,
                zIndex: -1,
                pointerEvents: 'none'
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          layout
          onClick={() => setToggle(!toggle)}
          className="relative flex items-center justify-center overflow-hidden cursor-pointer shadow-2xl"
          style={{
            background: '#000000',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.8), inset 0 -2px 10px rgba(255,255,255,0.05)',
            borderRadius: 40,
          }}
          initial={{ width: 120, height: 36 }}
          animate={{
            width: toggle ? 420 : 120,
            height: toggle ? 52 : 36,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30, // Apple-like spring physics
          }}
        >
          <AnimatePresence mode="wait">
            {toggle ? (
              <motion.div
                key="links"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                transition={{ duration: 0.2 }}
                className="flex h-full w-full items-center justify-center gap-7 px-8"
              >
                {links.map((l) => (
                  <div key={l} onClick={(e) => e.stopPropagation()}>
                    <Link004 href={`#${l.toLowerCase()}`} className="text-[13px] font-semibold tracking-wide text-[#f0f0f0] hover:text-white transition-colors duration-200 whitespace-nowrap">
                      {l}
                    </Link004>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="island-idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-end px-3"
              >
                {/* iPhone Camera/Sensor Dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] shadow-[inset_0px_2px_4px_rgba(0,0,0,1)] border border-[#2a2a2a]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.a href="mailto:atlurivenkat1@gmail.com" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        style={{
          ...S.pill, padding: '10px 20px', fontSize: 13, fontWeight: 600,
          background: C.text, color: C.void, textDecoration: 'none',
        }}
      >
        Let's Talk <ArrowUpRight size={13} />
      </motion.a>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════
   HERO
   ═══════════════════════════════════════ */

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      {/* Ambient Orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700,
            borderRadius: '50%', filter: 'blur(160px)',
            background: 'radial-gradient(circle, rgba(197,176,244,0.09) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '-10%', left: '-10%', width: 500, height: 500,
            borderRadius: '50%', filter: 'blur(140px)',
            background: 'radial-gradient(circle, rgba(220,238,177,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      <motion.div style={{ ...S.section, y, opacity, position: 'relative', zIndex: 10, paddingBottom: '14vh', width: '100%' }}>
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          {/* Status */}
          <motion.div variants={fade} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <span style={{ position: 'relative', display: 'flex', width: 10, height: 10 }}>
              <span className="ping" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: C.lime, opacity: 0.75 }} />
              <span style={{ position: 'relative', width: 10, height: 10, borderRadius: '50%', background: C.lime }} />
            </span>
            <span style={{ ...S.mono, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.textMuted }}>
              Open to Opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <div style={{ marginBottom: 48 }}>
            {['I build systems', 'that think,', 'scale & ship.'].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.h1
                  variants={reveal} custom={i}
                  style={{
                    ...S.display,
                    fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                    fontWeight: 700,
                    lineHeight: 1.03,
                    letterSpacing: '-0.04em',
                    color: C.text,
                  }}
                >
                  {i === 1 ? (<>that <em className="text-gradient" style={{ fontStyle: 'italic' }}>think</em>,</>) : line}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Subline */}
          <motion.p variants={fade} custom={3} style={{
            maxWidth: 520, fontSize: 'clamp(16px, 1.2vw, 20px)', color: C.textSec,
            lineHeight: 1.75, fontWeight: 300, marginBottom: 56,
          }}>
            Full-stack developer & CS undergrad at KMIT. I craft ML pipelines,
            production web apps, and cloud-native systems — from zero to deploy.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fade} custom={4} style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <motion.a href="#projects" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ ...S.pill, background: C.text, color: C.void, textDecoration: 'none' }}>
              View Work <ArrowUpRight size={16} />
            </motion.a>
            <motion.a href="https://github.com/santu-1506" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ ...S.pill, background: 'transparent', color: C.text, border: `1px solid ${C.border}`, textDecoration: 'none' }}>
              GitHub <FaGithub size={16} />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/venkatasantosh/" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ ...S.pill, background: 'transparent', color: C.text, border: `1px solid ${C.border}`, textDecoration: 'none' }}>
              LinkedIn <FaLinkedin size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
      >
        <span style={{ ...S.mono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.textMuted }}>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={14} color={C.textMuted} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════
   STATS BAR
   ═══════════════════════════════════════ */

function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const stats = [
    { value: '380+', label: 'DSA Problems' },
    { value: '3+', label: 'Shipped Projects' },
    { value: '90%', label: 'Fewer Deploy Failures' },
    { value: '8.01', label: 'CGPA at KMIT' },
  ];

  return (
    <div ref={ref} style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.surface }}>
      <div style={{ ...S.section, paddingTop: 80, paddingBottom: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: 'center',
              borderRight: i < 3 ? `1px solid ${C.border}` : 'none',
              padding: '0 20px',
            }}
          >
            <p style={{ ...S.display, fontSize: 'clamp(2rem, 3vw, 3.5rem)', fontWeight: 700, color: C.text, marginBottom: 8 }}>
              {s.value}
            </p>
            <p style={{ fontSize: 13, color: C.textMuted, letterSpacing: '0.04em' }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
      <style>{`@media(max-width:640px){.stats-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
    </div>
  );
}

/* ═══════════════════════════════════════
   MARQUEE
   ═══════════════════════════════════════ */

function Marquee() {
  const items = ['Java', 'Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'Spring Boot',
    'PyTorch', 'Docker', 'GCP', 'PostgreSQL', 'MongoDB', 'TensorFlow', 'Node.js', 'AWS'];
  return (
    <div style={{ overflow: 'hidden', borderBottom: `1px solid ${C.border}`, padding: '20px 0', background: C.surface }}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ ...S.mono, margin: '0 32px', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.textMuted, whiteSpace: 'nowrap' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   EXPERIENCE
   ═══════════════════════════════════════ */

function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  const items = [
    { metric: '90%', title: 'Fewer deployment failures', body: 'Architected GitHub Actions CI/CD pipelines with Docker containerization on Google Cloud Platform.' },
    { metric: 'RBAC', title: 'Secure authentication', body: 'Implemented JWT-based auth with role-based access control, securing patient data across all platforms.' },
    { metric: 'Zero', title: 'Manual intake errors', body: 'Digitized hospital workflows end-to-end, eliminating paper-based processes and cutting processing time.' },
  ];

  return (
    <section id="experience" style={{ paddingTop: 160, paddingBottom: 160 }}>
      <div style={S.section}>
        <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
          <motion.p variants={fade} style={S.eyebrow}>Experience</motion.p>

          <div style={{ overflow: 'hidden', marginBottom: 24 }}>
            <motion.h2 variants={reveal} style={{ ...S.display, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              MediTrack<span style={{ color: C.accent }}>.</span>
            </motion.h2>
          </div>

          <motion.div variants={fade} custom={1} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 80 }}>
            {['Full Stack Developer', 'Freelance', 'May – Sep 2024'].map((t, i) => (
              <span key={i} style={{
                padding: '10px 20px', borderRadius: 999, fontSize: 12,
                ...S.mono, letterSpacing: '0.08em',
                border: `1px solid ${i === 2 ? 'rgba(197,176,244,0.3)' : C.border}`,
                color: i === 2 ? C.accent : C.textSec,
              }}>{t}</span>
            ))}
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {items.map((item, i) => (
              <motion.div key={i} variants={fade} custom={i + 2} whileHover={{ y: -6, borderColor: 'rgba(197,176,244,0.25)' }}
                style={{
                  padding: 'clamp(32px, 3vw, 48px)',
                  borderRadius: 24, background: C.card, border: `1px solid ${C.border}`,
                  cursor: 'pointer', transition: 'all 0.4s ease',
                }}>
                <p style={{ ...S.display, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: C.accent, marginBottom: 20 }}>
                  {item.metric}
                </p>
                <p style={{ fontSize: 17, fontWeight: 600, color: C.text, marginBottom: 12, lineHeight: 1.4 }}>
                  {item.title}
                </p>
                <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.75 }}>
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════ */

const projects = [
    {
    title: 'Deepfake Detection',
    img: '/images/projects/deepfake.png',
    tagline: 'Full Stack AI Video Analysis Platform',
    description: [
      'Advanced deep learning platform for detecting synthetic media and manipulated video.',
      'Built with React, FastAPI, and Python to ensure real-time analysis and low latency.',
      'Features frame-by-frame deepfake probability scoring and artifact highlighting.'
    ],
    tags: ['React', 'FastAPI', 'Python', 'PyTorch'],
    color: '#8A2BE2', icon: Bot,
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    title: 'CRISPR AI',
    img: '/images/projects/crisprai.png',
    tagline: 'CRISPR-Cas9 data visualization platform',
    description: [
      'Full-stack Next.js and FastAPI platform for advanced genetic analysis.',
      'Containerized with Docker and deployed on cloud for platform-agnostic workflows.',
      'Enables reproducible scientific analysis pipelines for researchers.'
    ],
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker'],
    color: C.coral, icon: Bot,
    liveUrl: 'https://crisprai.vercel.app/',
    sourceUrl: 'https://github.com/santu-1506/FinalModel',
  },
  {
    title: 'Model Confusion',
    img: '/images/projects/model_confusion.png',
    tagline: 'Meta-model that learns when to trust classifiers',
    description: [
      'A meta-model that learns when to trust — and when to second-guess — a classifier.',
      'Uses a "second opinion" model on top of an image classifier.',
      'Flags uncertain predictions for human review to ensure high accuracy.'
    ],
    tags: ['PyTorch', 'Python', 'scikit-learn', 'CNN'],
    color: C.lime, icon: Bot,
    liveUrl: 'https://github.com/santu-1506/Predicting-Model-Confusion',
    sourceUrl: 'https://github.com/santu-1506/Predicting-Model-Confusion',
  },
];

function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const [expandedProject, setExpandedProject] = useState(null);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="projects" style={{ paddingTop: 160, paddingBottom: 160 }}>
      <div style={S.section}>
        <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
          <motion.p variants={fade} style={S.eyebrow}>Selected Work</motion.p>
          <div style={{ overflow: 'hidden', marginBottom: 80 }}>
            <motion.h2 variants={reveal} style={{ ...S.display, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Featured Projects<span style={{ color: C.accent }}>.</span>
            </motion.h2>
          </div>

          <div style={{ minHeight: '80vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {expandedProject === null ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 40, flexWrap: 'wrap' }}>
                {/* Draggable Image Preview */}
                <motion.img
                  drag
                  dragConstraints={ref}
                  layoutId="active-img"
                  src={projects[activeProject].img}
                  alt={projects[activeProject].title}
                  style={{
                    width: 'clamp(300px, 45vw, 600px)',
                    aspectRatio: '4/3',
                    borderRadius: 24,
                    objectFit: 'cover',
                    cursor: 'grab',
                    zIndex: 10,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    border: `1px solid ${C.border}`
                  }}
                  whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
                />
                
                {/* Projects List */}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 16, zIndex: 10, flex: 1, minWidth: 300, alignItems: 'flex-end' }}>
                  <li style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end', gap: 12, fontSize: 13, textTransform: 'uppercase', opacity: 0.5, letterSpacing: '0.1em' }}>
                    <span style={{ background: C.text, height: 1, flex: 1, opacity: 0.2 }} />
                    my Projects
                  </li>
                  {projects.map((project, index) => (
                    <motion.li
                      key={project.title}
                      layoutId={`text-header-${index}`}
                      style={{ 
                        opacity: activeProject === index ? 1 : 0.4,
                        position: 'relative',
                        display: 'flex',
                        width: 'fit-content',
                        cursor: 'pointer',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        textAlign: 'right',
                        fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                        letterSpacing: '-0.02em',
                        fontWeight: 600,
                        transition: 'opacity 0.2s',
                        color: C.text
                      }}
                      onMouseEnter={() => setActiveProject(index)}
                      onClick={() => setExpandedProject(index)}
                    >
                      {activeProject === index && (
                        <motion.div
                          initial={{ x: -10, width: 15, height: 0 }}
                          animate={{ x: -15, width: 6, height: 6 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            background: project.color,
                            position: 'absolute',
                            right: '100%',
                            borderRadius: '50%'
                          }}
                        />
                      )}
                      {project.title}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ) : (
              /* Expanded Details View */
              <div onClick={() => setExpandedProject(null)} style={{ width: '100%', cursor: 'pointer', zIndex: 20 }}>
                <div style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
                  <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 48 }}>
                    
                    <div style={{ position: 'relative', height: 96, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600 }}>
                      <motion.h1 style={{ position: 'absolute', margin: 0, color: C.text, letterSpacing: '-0.02em' }} layoutId={`text-header-${expandedProject}`}>
                        {projects[expandedProject].title}
                      </motion.h1>
                    </div>

                    <motion.img
                      layoutId="active-img"
                      src={projects[expandedProject].img}
                      alt={projects[expandedProject].title}
                      style={{ 
                        width: '100%', 
                        aspectRatio: '16/9',
                        borderRadius: 24,
                        objectFit: 'cover',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        border: `1px solid ${C.border}`
                      }}
                    />
                  </div>
                  
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1, delayChildren: 0.25 }
                      }
                    }}
                    style={{ width: '100%', maxWidth: 900 }}
                  >
                    <motion.div
                      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                      transition={{ type: "spring", stiffness: 50, damping: 10 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
                    >
                      {/* Project Header */}
                      <section style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: C.text, margin: 0 }}>
                            {projects[expandedProject].tagline}
                          </h1>
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.35, duration: 0.5 }}
                            style={{ background: projects[expandedProject].color, height: 2, flex: 1, transformOrigin: 'left', borderRadius: 999, opacity: 0.5 }}
                          />
                        </div>
                      </section>

                      {/* Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {projects[expandedProject].tags.map((tag) => (
                          <span key={tag} style={{
                            padding: '7px 14px', borderRadius: 999, fontSize: 11,
                            ...S.mono, letterSpacing: '0.06em',
                            background: C.cardHover, color: C.textSec, border: `1px solid ${C.border}`,
                          }}>{tag}</span>
                        ))}
                      </div>

                      {/* Project Description */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {(projects[expandedProject].description || []).map((para, i) => (
                          <p key={i} style={{ fontSize: 16, color: C.textSec, lineHeight: 1.8, margin: 0 }}>
                            {para}
                          </p>
                        ))}
                      </div>

                      {/* Project Footer */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
                        <a
                          href={projects[expandedProject].liveUrl || "#"}
                          target="_blank" rel="noopener noreferrer"
                          style={{
                            background: C.text, color: C.void, display: 'flex', height: 40, alignItems: 'center', gap: 8,
                            padding: '0 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: 'none'
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Live Preview <ArrowUpRight size={16} />
                        </a>
                        <a
                          href={projects[expandedProject].sourceUrl || "#"}
                          target="_blank" rel="noopener noreferrer"
                          style={{
                            background: 'transparent', color: C.text, display: 'flex', height: 40, alignItems: 'center', gap: 8,
                            padding: '0 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: 'none',
                            border: `1px solid ${C.border}`
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          See Source Code <FaGithub size={16} />
                        </a>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SKILLS — LILAC COLOR BLOCK
   ═══════════════════════════════════════ */

const skillCats = [
  { title: 'Languages', icon: Code2, items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'C'] },
  { title: 'Backend', icon: Terminal, items: ['Node.js', 'FastAPI', 'Spring Boot', 'REST APIs', 'JWT / RBAC'] },
  { title: 'Frontend', icon: Globe, items: ['React', 'Next.js', 'Tailwind CSS', 'HTML / CSS'] },
  { title: 'Cloud & DevOps', icon: Layers, items: ['GCP', 'AWS', 'Docker', 'GitHub Actions', 'Firebase'] },
  { title: 'Databases', icon: Database, items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firestore'] },
  { title: 'AI & ML', icon: BrainCircuit, items: ['PyTorch', 'TensorFlow', 'NLP', 'Computer Vision', 'OpenAI'] },
];


const HoverExpand_001 = ({ images, className }) => {
  const [activeImage, setActiveImage] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.2 }}
      style={{ position: 'relative', width: '100%', maxWidth: 1200, padding: '0 20px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}
    >
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden', borderRadius: 24 }}
            initial={{ width: "4rem", height: "32rem" }}
            animate={{
              width: activeImage === index ? "36rem" : "6rem",
              height: "32rem",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={() => setActiveImage(index)}
            onHoverStart={() => setActiveImage(index)}
          >
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ position: 'absolute', display: 'flex', inset: 0, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', padding: 24 }}
                >
                  <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', ...S.mono }}>
                    {image.code}
                  </p>
                  <h3 style={{ margin: '8px 0 0 0', fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                    {image.title}
                  </h3>
                </motion.div>
              )}
            </AnimatePresence>
            <img
              src={image.src}
              alt={image.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="skills" style={{ padding: 'clamp(20px, 3vw, 40px)' }}>
      <div style={{ padding: 'clamp(40px, 5vw, 80px) 0' }}>
        <HoverExpand_001 
          images={[
            { src: '/images/tools/python.png', title: 'Python', code: 'BACKEND / AI' },
            { src: '/images/tools/react.png', title: 'React', code: 'FRONTEND' },
            { src: '/images/tools/nodejs.png', title: 'Node.js', code: 'BACKEND' },
            { src: '/images/tools/pytorch.png', title: 'PyTorch', code: 'MACHINE LEARNING' },
            { src: '/images/tools/docker.png', title: 'Docker', code: 'DEVOPS / CLOUD' },
            { src: '/images/tools/fastapi.png', title: 'FastAPI', code: 'API / BACKEND' }
          ]} 
        />
      </div>

      <motion.div
        ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}
        style={{
          maxWidth: 1400, margin: '0 auto', borderRadius: 40,
          background: C.lilac, padding: 'clamp(48px, 6vw, 112px)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Decorative */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -140, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(0,0,0,0.04)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
          <motion.p variants={fade} style={{ ...S.eyebrow, color: 'rgba(15,15,15,0.45)' }}>Technical Arsenal</motion.p>

          <div style={{ overflow: 'hidden', marginBottom: 72 }}>
            <motion.h2 variants={reveal} style={{ ...S.display, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: C.textDark }}>
              Tools I work with<span style={{ color: C.surface }}>.</span>
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {skillCats.map((cat, i) => (
              <motion.div key={cat.title} variants={fade} custom={i} whileHover={{ y: -5 }}
                style={{
                  background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)',
                  borderRadius: 20, padding: 'clamp(24px, 2.5vw, 36px)',
                  border: '1px solid rgba(255,255,255,0.35)', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.75)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.55)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(15,15,15,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <cat.icon size={17} color={C.textDark} />
                  </div>
                  <span style={{ ...S.mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(15,15,15,0.45)' }}>
                    {cat.title}
                  </span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {cat.items.map((item) => (
                    <li key={item} style={{ fontSize: 15, fontWeight: 500, color: C.textDark, lineHeight: 2 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════
   ACHIEVEMENTS — LIME BLOCK
   ═══════════════════════════════════════ */

function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  const items = [
    { icon: Award, title: 'Oracle Cloud AI Foundations Associate', body: 'Certified in AI & cloud fundamentals on Oracle Cloud Infrastructure.' },
    { icon: Code2, title: '380+ DSA Problems Solved', body: 'Consistent problem-solving across LeetCode and GeeksforGeeks.' },
    { icon: BrainCircuit, title: 'Google DevFest Speaker', body: 'Agentic AI Workshop — presented and showcased project work.' },
  ];

  return (
    <section style={{ padding: 'clamp(20px, 3vw, 40px)' }}>
      <motion.div
        ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}
        style={{
          maxWidth: 1400, margin: '0 auto', borderRadius: 40,
          background: C.lime, padding: 'clamp(48px, 6vw, 112px)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -200, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
          <motion.p variants={fade} style={{ ...S.eyebrow, color: 'rgba(15,15,15,0.45)' }}>Recognition</motion.p>

          <div style={{ overflow: 'hidden', marginBottom: 72 }}>
            <motion.h2 variants={reveal} style={{ ...S.display, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: C.textDark }}>
              Achievements<span style={{ color: C.surface }}>.</span>
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {items.map((item, i) => (
              <motion.div key={i} variants={fade} custom={i} whileHover={{ y: -5 }}
                style={{
                  background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(16px)',
                  borderRadius: 20, padding: 'clamp(32px, 3vw, 48px)',
                  border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.65)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
              >
                <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(15,15,15,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
                  <item.icon size={20} color={C.textDark} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: C.textDark, marginBottom: 12, lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(15,15,15,0.6)', lineHeight: 1.75 }}>
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════ */

const CrowdCanvas = ({ src, rows = 15, cols = 7 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      src,
      rows,
      cols,
    };

    const randomRange = (min, max) => min + Math.random() * (max - min);
    const randomIndex = (array) => randomRange(0, array.length) | 0;
    const removeFromArray = (array, i) => array.splice(i, 1)[0];
    const removeItemFromArray = (array, item) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array) => array[randomIndex(array) | 0];

    const resetPeep = ({ stage, peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      let startX;
      let endX;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return {
        startX,
        startY,
        endX,
      };
    };

    const normalWalk = ({ peep, props }) => {
      const { startX, startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0,
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 10,
        },
        0,
      );

      return tl;
    };

    const walks = [normalWalk];

    const createPeep = ({ image, rect }) => {
      const peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (rect) => {
          peep.rect = rect;
          peep.width = rect[2];
          peep.height = rect[3];
          peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
        },
        render: (ctx) => {
          ctx.save();
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, 1);
          ctx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height,
          );
          ctx.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    const img = document.createElement("img");
    const stage = {
      width: 0,
      height: 0,
    };

    const allPeeps = [];
    const availablePeeps = [];
    const crowd = [];

    const createPeeps = () => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          }),
        );
      }
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;

      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.parentElement.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;

      crowd.forEach((peep) => {
        if(peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const init = () => {
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = config.src;

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, []);
  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', bottom: -60, left: 0, width: '100%', height: '450px', pointerEvents: 'none', zIndex: 0, opacity: 0.8 }} />
  );
};

function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="contact" style={{ paddingTop: 160, paddingBottom: 160, position: 'relative', overflow: 'hidden' }}>
      <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
      <div style={S.section}>
        <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} style={{ textAlign: 'center' }}>
          <motion.p variants={fade} style={{ ...S.eyebrow, marginBottom: 32 }}>What's Next?</motion.p>

          <div style={{ overflow: 'hidden', marginBottom: 8 }}>
            <motion.h2 variants={reveal} style={{ ...S.display, fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Let's build something
            </motion.h2>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 56 }}>
            <motion.h2 variants={reveal} custom={1} className="text-gradient-warm" style={{ ...S.display, fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              extraordinary.
            </motion.h2>
          </div>

          <motion.div variants={fade} custom={2} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginBottom: 80 }}>
            <motion.a href="mailto:atlurivenkat1@gmail.com" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ ...S.pill, background: C.text, color: C.void, textDecoration: 'none' }}>
              atlurivenkat1@gmail.com <Mail size={16} />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/venkatasantosh/" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ ...S.pill, background: 'transparent', color: C.text, border: `1px solid ${C.border}`, textDecoration: 'none' }}>
              LinkedIn <FaLinkedin size={16} />
            </motion.a>
            <motion.a href="https://github.com/santu-1506" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ ...S.pill, background: 'transparent', color: C.text, border: `1px solid ${C.border}`, textDecoration: 'none' }}>
              GitHub <FaGithub size={16} />
            </motion.a>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════ */

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: '40px 0' }}>
      <div style={{ ...S.section, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <p style={{ ...S.mono, fontSize: 11, color: C.textMuted }}>©  Atluri Venkata Santosh</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {[
            { icon: FaGithub, href: 'https://github.com/santu-1506', label: 'GitHub' },
            { icon: FaLinkedin, href: 'https://www.linkedin.com/in/venkatasantosh/', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:atlurivenkat1@gmail.com', label: 'Contact' },
          ].map(({ icon: Icon, href, label }, i) => (
            <Link001 key={i} href={href} className="text-[#9a9aa0] hover:text-[#f0f0f0] transition-colors duration-200 text-[13px] flex items-center gap-2">
              <Icon size={16} /> {label}
            </Link001>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   APP
   ═══════════════════════════════════════ */

export default function App() {
  return (
    <div className="noise">
      <Navbar />
      <main>
        <div style={{ position: 'relative' }}>
          <LinePath />
          <Hero />
          <StatsBar />
          <Marquee />
          <Experience />
          <Projects />
        </div>
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}


/* ═══════════════════════════════════════
   SCROLL LINE PATH (Skiper19)
   ═══════════════════════════════════════ */
const LinePath = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden', opacity: 0.15, display: 'flex', justifyContent: 'center' }}>
      <svg
        width="1278"
        height="2319"
        viewBox="0 0 1278 2319"
        preserveAspectRatio="none"
        fill="none"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: 1200, height: '100%' }}
      >
        <motion.path
          d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
          stroke={C.lime}
          strokeWidth="10"
          strokeLinecap="round"
          style={{
            pathLength,
          }}
        />
      </svg>
    </div>
  );
};
