import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowRight, Bot, BrainCircuit, Code2, Cpu, ExternalLink, Gamepad2, Github, Layers3, Server, ShieldCheck, Sparkles, Terminal, Wrench } from "lucide-react";
import Header from "./components/Header";
import { enviarPeticionBot } from "./utils/enviarPeticionBot";
import "./public-landing.css";

function Landing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", contacto: "", servicio: "Consulta desde portfolio", mensaje: "" });
  const [sending, setSending] = useState(false);

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (!form.nombre.trim() || !form.contacto.trim() || !form.mensaje.trim()) {
      toast.warn("Rellena nombre, contacto y mensaje antes de enviarlo.");
      return;
    }

    setSending(true);
    await enviarPeticionBot(form);
    setSending(false);
    setForm({ nombre: "", contacto: "", servicio: "Consulta desde portfolio", mensaje: "" });
  };

  const skills = [
    [<Server />, "Infraestructura", "VPS Linux, Nginx, Docker, dominios, DNS y despliegues reales."],
    [<Code2 />, "Fullstack", "React, Vite, Flask, APIs, sesiones, bases de datos y paneles privados."],
    [<BrainCircuit />, "Inteligencia artificial local", "Modelos locales, Whisper, automatización y privacidad como base del flujo."],
    [<Gamepad2 />, "Game Dev / VR", "Unity, C#, Meta Quest, físicas, interfaces y prototipos interactivos."]
  ];

  const projects = [
    {
      tag: "Infraestructura / Fullstack",
      title: "Minecraft Manager",
      status: "Panel privado en producción",
      icon: <Server />,
      description: "Panel web para gestionar servidores de Minecraft desde una interfaz propia. El foco está en controlar máquinas reales, estado de servidores, rutas API y despliegue en VPS.",
      done: ["Frontend en React con Vite.", "Backend conectado mediante rutas API.", "Gestión privada de servidores.", "Docker para aislar entornos.", "Nginx, dominio y despliegue real."],
      pending: ["Pulir permisos por usuario.", "Mejorar consola/logs en tiempo real.", "Documentar arquitectura y capturas."],
      tech: ["React", "Flask", "Docker", "Linux", "Nginx", "MariaDB"],
      links: [{ label: "Demo privada", href: "/login", internal: true }]
    },
    {
      tag: "Discord / Automatización",
      title: "KokoroBot / WARDEN",
      status: "Base avanzada construida",
      icon: <Bot />,
      description: "Bot de Discord orientado a comunidades: moderación, registros, comandos, avisos y automatización. La idea es convertir tareas repetitivas en sistemas controlados.",
      done: ["Comandos personalizados en Discord.js.", "Sistema de advertencias.", "Logs de moderación.", "Estructura modular.", "Pruebas con análisis de mensajes."],
      pending: ["Panel de configuración web.", "Despliegue 24/7 más sólido.", "Documentación para reutilizarlo."],
      tech: ["Discord.js", "Node.js", "Python", "Flask", "JSON"],
      links: [{ label: "Repo privado", href: "https://github.com/vjimmes2003/discord-warden-bot" }]
    },
    {
      tag: "Game Design / Web",
      title: "Kaelum",
      status: "Web y universo en desarrollo",
      icon: <Sparkles />,
      description: "Proyecto de videojuego y documentación creativa con identidad propia. Une lore, sistemas jugables, dirección visual y presentación web tipo portfolio.",
      done: ["Concepto jugable definido.", "Documento de diseño base.", "Lore y pilares principales.", "Web en Astro.", "Devlogs y estructura narrativa."],
      pending: ["Completar más secciones del GDD.", "Añadir vídeos o prototipos.", "Mejorar presentación visual final."],
      tech: ["Astro", "Game Design", "Narrativa", "CSS"],
      links: [{ label: "Repo", href: "https://github.com/vjimmes2003/kaelum" }]
    },
    {
      tag: "Privacidad / Herramientas",
      title: "LocalHub",
      status: "Suite local experimental",
      icon: <Cpu />,
      description: "Suite para usar herramientas de inteligencia artificial en local, con foco en privacidad, control de datos y flujos útiles sin depender siempre de terceros.",
      done: ["Repositorio público estructurado.", "Pruebas con herramientas locales.", "Exploración de asistentes y transcripción.", "Enfoque de privacidad desde el diseño."],
      pending: ["Unificar interfaz estable.", "Documentar requisitos de hardware.", "Crear demos guiadas."],
      tech: ["Python", "Whisper", "Modelos locales", "Automatización"],
      links: [{ label: "Repo", href: "https://github.com/vjimmes2003/LocalHub" }]
    },
    {
      tag: "Unity / Realidad virtual",
      title: "Prototipos VR en Unity",
      status: "Sistemas funcionales de práctica",
      icon: <Gamepad2 />,
      description: "Escenas y mecánicas para Meta Quest centradas en interacción, disparo, físicas, puntuación y sensación de uso en realidad virtual.",
      done: ["Sistema de disparo con OVRInput.", "Colisiones de proyectiles.", "Gestión de puntuación.", "Físicas e interacción.", "Scripts separados por responsabilidad."],
      pending: ["Más niveles y feedback visual.", "Pulir audio y efectos.", "Preparar build demostrable."],
      tech: ["Unity", "C#", "Meta Quest", "OVRInput", "VR"],
      links: [{ label: "Repo FPS", href: "https://github.com/vjimmes2003/MiPrimerFPS" }]
    },
    {
      tag: "Web / Datos",
      title: "Accounts Valorant",
      status: "Herramienta específica",
      icon: <Code2 />,
      description: "Proyecto orientado a organizar información de cuentas de Valorant y explorar una forma más cómoda de consultar datos relacionados con perfiles o cuentas.",
      done: ["Repositorio público creado.", "Base de herramienta enfocada a un caso real.", "Primer enfoque de organización de datos."],
      pending: ["Mejorar interfaz.", "Añadir documentación.", "Separar datos sensibles de cualquier demo pública."],
      tech: ["JavaScript", "React", "Datos", "Frontend"],
      links: [{ label: "Repo", href: "https://github.com/vjimmes2003/accounts-valorant" }]
    }
  ];

  return (
    <div className="portfolio-landing">
      <Header />
      <main>
        <section className="portfolio-hero" id="inicio">
          <div className="hero-kicker"><Terminal size={18} /><span>portfolio técnico / sistemas / automatización</span></div>
          <h1>VJIMMES <span>2003_</span></h1>
          <p className="hero-subtitle">Soy Víctor. Diseño y construyo soluciones completas: interfaces, APIs, servidores, bots, automatizaciones, videojuegos y herramientas con inteligencia artificial local.</p>
          <div className="hero-actions">
            <a href="#proyectos" className="primary-action">Ver proyectos <ArrowRight size={18} /></a>
            <a href="https://github.com/vjimmes2003" target="_blank" rel="noopener noreferrer" className="secondary-action">GitHub <Github size={18} /></a>
          </div>
          <div className="hero-stats">
            <div><strong>Fullstack</strong><span>Frontend, backend y despliegue</span></div>
            <div><strong>Sistemas</strong><span>Linux, Docker, Nginx y VPS</span></div>
            <div><strong>Producto</strong><span>Bots, VR y automatización útil</span></div>
          </div>
        </section>

        <section className="portfolio-section about-section" id="sobre-mi">
          <div className="section-heading"><span>01 / SOBRE MÍ</span><h2>Me gusta construir cosas que no se queden solo en una maqueta bonita.</h2></div>
          <p>Mi perfil está entre desarrollo, administración de sistemas y creatividad técnica. Me interesa el recorrido completo: pensar la idea, montar la interfaz, conectar la API, desplegarlo en servidor y dejarlo preparado para que alguien pueda usarlo sin pelearse con la tecnología.</p>
        </section>

        <section className="portfolio-section skills-section" id="stack">
          <div className="section-heading compact-heading"><span>02 / STACK</span><h2>Un stack práctico para pasar de idea a sistema funcional.</h2></div>
          <div className="skills-grid">
            {skills.map(([icon, title, text]) => <article className="skill-card" key={title}><div className="skill-icon">{icon}</div><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="portfolio-section projects-section" id="proyectos">
          <div className="section-heading"><span>03 / PROYECTOS</span><h2>Proyectos explicados con contexto: qué hice, qué falta y dónde ver más.</h2></div>
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
                  <div><h4><Wrench size={16} /> Siguiente mejora</h4><ul>{project.pending.map((item) => <li key={item}>{item}</li>)}</ul></div>
                </div>
                <div className="project-footer">
                  <div className="tech-pills">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                  <div className="project-actions">
                    {project.links.map((link) => link.internal ? (
                      <button key={link.label} onClick={() => navigate(link.href)} className="project-link">{link.label} <ExternalLink size={15} /></button>
                    ) : (
                      <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="project-link">{link.label} <ExternalLink size={15} /></a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-section final-cta" id="contacto">
          <div className="cta-copy"><span>04 / CONTACTO</span><h2>Cuéntame qué quieres montar.</h2><p>Déjame una consulta rápida con tu forma de contacto. Me llegará como aviso y podré responderte por Discord, email u otro medio que indiques.</p><button onClick={() => navigate("/login")} className="secondary-action panel-access">Acceso al panel <Layers3 size={18} /></button></div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label>Nombre o nick<input name="nombre" value={form.nombre} onChange={handleFormChange} placeholder="Víctor / vjimmes / tu nick" /></label>
            <label>Forma de contacto<input name="contacto" value={form.contacto} onChange={handleFormChange} placeholder="@discord: usuario, email, Instagram..." /></label>
            <label>Tipo de consulta<select name="servicio" value={form.servicio} onChange={handleFormChange}><option>Consulta desde portfolio</option><option>Proyecto web</option><option>Servidor / VPS / Docker</option><option>Bot de Discord</option><option>Inteligencia artificial local</option><option>Videojuego / Unity / VR</option><option>Otro</option></select></label>
            <label>Mensaje<textarea name="mensaje" value={form.mensaje} onChange={handleFormChange} rows="5" placeholder="Explícame la idea, el problema o qué necesitas montar..." /></label>
            <button className="primary-action form-submit" type="submit" disabled={sending}>{sending ? "Enviando..." : "Enviar consulta"} <ArrowRight size={18} /></button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Landing;
