import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Bot, BrainCircuit, Code2, Cpu, ExternalLink, Gamepad2, Github, Layers3, Server, ShieldCheck, Sparkles, Terminal, Wrench } from "lucide-react";
import Header from "./components/Header";
import "./public-landing.css";

function Landing() {
  const navigate = useNavigate();

  const skills = [
    [<Server />, "Infraestructura real", "Linux, VPS, Nginx, Docker, dominios, DNS, despliegues y paneles funcionando en producción."],
    [<Code2 />, "Fullstack práctico", "React, Vite, Flask, APIs, sesiones, bases de datos y herramientas hechas para resolver problemas reales."],
    [<BrainCircuit />, "Inteligencia artificial local", "Modelos locales, privacidad, automatización, asistentes, Whisper y flujos sin depender siempre de servicios externos."],
    [<Gamepad2 />, "Videojuegos y VR", "Unity, C#, Meta Quest, físicas, sistemas de disparo, interfaces y prototipos jugables."]
  ];

  const projects = [
    {
      tag: "Infraestructura / Fullstack",
      title: "Minecraft Manager",
      status: "En desarrollo funcional",
      icon: <Server />,
      description: "Panel web para gestionar servidores de Minecraft desde una interfaz propia, con administración remota, control de estado y despliegue en VPS.",
      done: ["Frontend en React desplegado con Vite.", "Backend conectado mediante rutas API.", "Gestión de servidores desde panel privado.", "Uso de Docker para aislar entornos.", "Integración con Nginx, dominio y despliegue real en VPS."],
      pending: ["Pulir permisos por usuario.", "Mejorar logs en tiempo real y experiencia visual.", "Añadir documentación pública del proyecto."],
      tech: ["React", "Flask", "Docker", "Linux", "Nginx", "MariaDB"]
    },
    {
      tag: "Discord / Automatización",
      title: "KokoroBot / WARDEN",
      status: "Base avanzada construida",
      icon: <Bot />,
      description: "Sistema de bot para Discord orientado a moderación, avisos, registros, comandos y automatización de comunidades.",
      done: ["Bot en Discord.js con comandos personalizados.", "Sistema de advertencias manuales y automáticas.", "Registro de acciones de moderación.", "Estructura modular para crecer sin desorden.", "Primeras pruebas con análisis de toxicidad mediante modelos externos/locales."],
      pending: ["Centralizar configuración desde panel web.", "Mejorar despliegue 24/7.", "Convertirlo en producto reutilizable para otros servidores."],
      tech: ["Discord.js", "Node.js", "Python", "Flask", "JSON", "Automatización"]
    },
    {
      tag: "Game Design / Web",
      title: "Kaelum",
      status: "Portfolio narrativo en expansión",
      icon: <Sparkles />,
      description: "Proyecto de videojuego y documentación creativa con identidad propia, narrativa, sistemas jugables y presentación web tipo portfolio.",
      done: ["Concepto principal del juego definido.", "Bases del documento de diseño del juego.", "Lore, tono visual y pilares jugables establecidos.", "Web en Astro para presentar el universo y los devlogs.", "Separación entre visión singleplayer y multijugador."],
      pending: ["Completar más secciones del documento de diseño.", "Añadir prototipos jugables o vídeos.", "Preparar una presentación más visual para portfolio."],
      tech: ["Astro", "Game Design", "Narrativa", "CSS", "Documentación"]
    },
    {
      tag: "Privacidad / Herramientas",
      title: "Suite de inteligencia artificial local",
      status: "Investigación aplicada",
      icon: <Cpu />,
      description: "Conjunto de pruebas y herramientas para usar modelos locales, transcripción, asistentes y automatizaciones manteniendo el control de los datos.",
      done: ["Pruebas con modelos locales y LM Studio.", "Exploración de Whisper para transcripción.", "Integración conceptual con bots y asistentes.", "Enfoque en privacidad y ejecución local."],
      pending: ["Unificar las herramientas en una interfaz estable.", "Documentar requisitos de hardware.", "Crear demos claras para enseñar el valor del sistema."],
      tech: ["Python", "Whisper", "Modelos locales", "Automatización", "Privacidad"]
    },
    {
      tag: "Unity / Realidad virtual",
      title: "Prototipos VR en Unity",
      status: "Prácticas y sistemas funcionales",
      icon: <Gamepad2 />,
      description: "Escenas y mecánicas para Meta Quest centradas en interacción, disparo, físicas, puntuación y experiencia inmersiva.",
      done: ["Sistema de disparo con OVRInput.", "Balas con detección de colisión.", "Gestión de puntuación e interfaz.", "Pruebas con físicas y objetivos interactivos.", "Estructura de scripts separada por responsabilidades."],
      pending: ["Añadir más niveles y feedback visual.", "Pulir efectos, audio y sensación de impacto.", "Preparar una build demostrable para portfolio."],
      tech: ["Unity", "C#", "Meta Quest", "OVRInput", "VR"]
    }
  ];

  return (
    <div className="portfolio-landing">
      <Header />
      <main>
        <section className="portfolio-hero" id="inicio">
          <div className="hero-kicker"><Terminal size={18} /><span>portfolio / sistemas / desarrollo / automatización</span></div>
          <h1>VJIMMES <span>2003_</span></h1>
          <p className="hero-subtitle">Soy Víctor. Construyo soluciones completas mezclando desarrollo web, administración de sistemas, servidores, bots, videojuegos e inteligencia artificial local.</p>
          <div className="hero-actions">
            <a href="#proyectos" className="primary-action">Ver proyectos <ArrowRight size={18} /></a>
            <a href="https://github.com/vjimmes2003" target="_blank" rel="noopener noreferrer" className="secondary-action">GitHub <Github size={18} /></a>
          </div>
          <div className="hero-stats">
            <div><strong>Fullstack</strong><span>frontend + backend + despliegue</span></div>
            <div><strong>SysAdmin</strong><span>Linux, VPS, Docker, Nginx</span></div>
            <div><strong>Creative Tech</strong><span>Unity, VR, bots y automatización</span></div>
          </div>
        </section>

        <section className="portfolio-section about-section" id="sobre-mi">
          <div className="section-heading"><span>01 / SOBRE MÍ</span><h2>No me limito a programar pantallas: intento montar sistemas que funcionen de verdad.</h2></div>
          <p>Mi perfil mezcla desarrollo, servidores y creatividad técnica. Me gusta entender el problema completo: la interfaz, la API, la base de datos, el despliegue, la seguridad básica, la automatización y la experiencia final de la persona que lo usa.</p>
        </section>

        <section className="portfolio-section skills-section" id="stack">
          <div className="section-heading"><span>02 / STACK</span><h2>Un perfil híbrido: desarrollo, sistemas, automatización y producto.</h2></div>
          <div className="skills-grid">
            {skills.map(([icon, title, text]) => <article className="skill-card" key={title}><div className="skill-icon">{icon}</div><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="portfolio-section projects-section" id="proyectos">
          <div className="section-heading"><span>03 / PROYECTOS</span><h2>Proyectos con contexto: qué hice, qué tecnologías usé y qué falta para llevarlos al siguiente nivel.</h2></div>
          <div className="projects-list">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-card-top">
                  <div className="project-number">0{index + 1}</div>
                  <div className="project-icon">{project.icon}</div>
                  <div><span className="project-tag">{project.tag}</span><h3>{project.title}</h3><p className="project-status">{project.status}</p></div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-columns">
                  <div><h4><ShieldCheck size={16} /> Hecho</h4><ul>{project.done.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  <div><h4><Wrench size={16} /> Para terminarlo mejor</h4><ul>{project.pending.map((item) => <li key={item}>{item}</li>)}</ul></div>
                </div>
                <div className="tech-pills">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-section final-cta" id="contacto">
          <div><span>04 / CONTACTO</span><h2>¿Tienes una idea rara, técnica o medio imposible?</h2><p>Ese tipo de proyectos son los que más me llaman: automatizar algo, montar un servidor, crear un bot, diseñar una herramienta o convertir una idea en un sistema usable.</p></div>
          <div className="cta-actions">
            <button onClick={() => navigate("/login")} className="primary-action">Acceso al panel <Layers3 size={18} /></button>
            <a href="https://github.com/vjimmes2003" target="_blank" rel="noopener noreferrer" className="secondary-action">Ver código <ExternalLink size={18} /></a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;
