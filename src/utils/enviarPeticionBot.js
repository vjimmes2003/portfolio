// utils/enviarPeticionBot.js
import { toast } from "react-toastify";

export async function enviarPeticionBot({ nombre = "Invitado", contacto = "No indicado", servicio, mensaje }) {
    try {
        const res = await fetch("https://vjimmes2003.uk/api/mensaje-directo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, contacto, servicio, mensaje }),
        });

        if (!res.ok) throw new Error("❌ Respuesta no válida");
        toast.success("✅ Petición enviada. Me pondré en contacto contigo.");
    } catch (err) {
        console.error("❌ Error al enviar mensaje al bot:", err);
        toast.error("No se pudo enviar el mensaje. Intenta más tarde.");
    }
}
