import React, { useState } from "react";
import "./App.css";
import { toast } from "react-toastify";
import Header from "./components/Header";

function Contacto() {
    const [form, setForm] = useState({
        nombre: "",
        contacto: "",
        servicio: "",
        mensaje: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const enviarFormulario = async () => {
        if (!form.nombre || !form.contacto || !form.servicio || !form.mensaje) {
            toast.warn("Por favor, rellena todos los campos");
            return;
        }

        try {
            const res = await fetch("http://localhost:5140/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error("Error en la API");

            toast.success("✅ Formulario enviado correctamente por Discord");
            setForm({
                nombre: "",
                contacto: "",
                servicio: "",
                mensaje: ""
            });
        } catch (err) {
            console.error("Error al enviar:", err);
            toast.error("❌ No se pudo enviar el formulario");
        }
    };

    return (
        <div className="minecraft-page">
            <Header />
            <h1>📨 Contacto</h1>
            <div className="mc-card" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <label>Nombre o nick:</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />

                <label>Tu Discord o email:</label>
                <input type="text" name="contacto" value={form.contacto} onChange={handleChange} />

                <label>Servicio que te interesa:</label>
                <input type="text" name="servicio" value={form.servicio} onChange={handleChange} />

                <label>Mensaje o detalles:</label>
                <textarea name="mensaje" rows="4" value={form.mensaje} onChange={handleChange}></textarea>

                <button onClick={enviarFormulario}>Enviar por Discord</button>
            </div>
        </div>
    );
}

export default Contacto;
