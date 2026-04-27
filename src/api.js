import axios from 'axios'
import { toast } from 'react-toastify'

const API_BASE = 'https://vjimmes2003.uk/api'

// Las cookies de sesión se envían automáticamente
const authHeaders = () => ({
  withCredentials: true
})

const handleError = (error, fallbackMessage = "Ocurrió un error") => {
  const msg = error.response?.data?.error || fallbackMessage
  toast.error(msg)
  throw error
}

export const getServers = async () => {
  try {
    const res = await axios.get(`${API_BASE}/servers`, authHeaders())
    return res.data
  } catch (err) {
    handleError(err, "Error al obtener los servidores")
  }
}

export const startServer = async (name) => {
  try {
    await axios.post(`${API_BASE}/start/${name}`, {}, authHeaders())
    toast.success(`Servidor "${name}" iniciado`)
  } catch (err) {
    handleError(err, "Error al iniciar el servidor")
  }
}

export const stopServer = async (name) => {
  try {
    await axios.post(`${API_BASE}/stop/${name}`, {}, authHeaders())
    toast.success(`Servidor "${name}" detenido y backup creado`)
  } catch (err) {
    handleError(err, "Error al detener el servidor")
  }
}

export const backupServer = async (name) => {
  try {
    await axios.post(`${API_BASE}/backup/${name}`, {}, authHeaders())
    toast.success(`Backup de "${name}" creado`)
  } catch (err) {
    handleError(err, "Error al hacer backup")
  }
}

export const getLogs = async (server) => {
  try {
    const res = await axios.get(`${API_BASE}/logs/${server}`, authHeaders())
    return res.data.logs
  } catch (err) {
    handleError(err, "Error al obtener logs")
  }
}

export const sendCommand = async (name, command) => {
  try {
    await axios.post(`${API_BASE}/command/${name}`, { command }, authHeaders())
    toast.success(`Comando enviado a "${name}"`)
  } catch (err) {
    handleError(err, "Error al enviar comando")
  }
}
