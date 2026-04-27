// /frontend/src/utils/sendToDiscord.js
import { toast } from "react-toastify";

export async function enviarMensajeDiscord(form) {
  if (!form.nombre || !form.contacto || !form.servicio || !form.mensaje) {
    toast.warn("Rellena todos los campos necesarios.");
    return false;
  }

  try {
    const res = await fetch("http://localhost:5140/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!res.ok) throw new Error("Fallo en el envío");

    toast.success("✅ Formulario enviado correctamente");
    return true;
  } catch (err) {
    console.error("❌ Error al enviar mensaje al bot:", err);
    toast.error("No se pudo contactar con el bot.");
    return false;
  }
}
