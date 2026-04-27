import React, { useState, useEffect } from "react";
import { enviarPeticionBot } from "../utils/enviarPeticionBot";

const ContactoModal = ({ servicio, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarAyuda, setMostrarAyuda] = useState(false);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("datosUsuario");
    if (datosGuardados) {
      const { nombre, contacto } = JSON.parse(datosGuardados);
      setNombre(nombre);
      setContacto(contacto);
    }
  }, []);

  const validarContacto = (valor) => {
    return /^@\w+:\s?.+$/i.test(valor.trim());
  };

  const handleEnviar = async () => {
    if (!nombre || !contacto || !mensaje) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    if (!validarContacto(contacto)) {
      alert("El contacto debe tener el formato correcto. Ej: @discord: usuario#1234");
      return;
    }

    localStorage.setItem("datosUsuario", JSON.stringify({ nombre, contacto }));

    await enviarPeticionBot({
      nombre,
      contacto,
      servicio,
      mensaje,
    });

    onClose();
  };

  return (
    <div className="modal-fondo">
      <div className="modal-contenido">
        <h2>📩 Solicitar: <span>{servicio}</span></h2>

        <input
          type="text"
          placeholder="Tu nombre o apodo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="@discord: kael#1234"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setMostrarAyuda(!mostrarAyuda)}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              fontSize: "0.9rem",
              background: "transparent",
              color: "#ccc",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0
            }}
          >
            {mostrarAyuda ? "Ocultar ejemplos" : "Ver ejemplos"}
          </button>
        </div>

        {mostrarAyuda && (
          <div style={{
            background: "#2e2a40",
            padding: "0.5rem",
            borderRadius: "6px",
            fontSize: "0.85rem",
            marginBottom: "1rem",
            color: "#ccc"
          }}>
            <p>💡 Formatos válidos de contacto:</p>
            <ul style={{ marginLeft: "1rem" }}>
              <li><code>@discord: usuario</code></li>
              <li><code>@discord: usuario#1234</code></li>
              <li><code>@email: correo@ejemplo.com</code></li>
              <li><code>@instagram: @nombre_usuario</code></li>
              <li><code>@telegram: @usuario</code></li>
              <li><code>@twitter: @usuario</code></li>
              <li><code>@tiktok: @nombre_usuario</code></li>
              <li><code>@web: https://miweb.com</code></li>
              <li><code>@telefono: +34 612345678</code></li>
              <li><code>@steam: steamID</code></li>
              <li><code>@psn: usuarioPSN</code></li>
              <li><code>@xbox: gamertag</code></li>
              <li><code>@epic: usuarioEpicGames</code></li>
            </ul>
          </div>
        )}

        <textarea
          placeholder="Mensaje o detalles del servicio..."
          rows="4"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />

        <div className="modal-botones">
          <button onClick={handleEnviar}>✅ Confirmar</button>
          <button onClick={onClose}>❌ Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ContactoModal;
