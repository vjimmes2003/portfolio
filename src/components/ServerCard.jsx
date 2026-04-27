// src/components/ServerCard.jsx
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  startServer,
  stopServer,
  backupServer,
  sendCommand
} from '../api'

export default function ServerCard({ server, user, onRefresh }) {
  const [logs, setLogs] = useState([])
  const [inputCommand, setInputCommand] = useState('')

  // --- Permisos según rol ---
  const role = user.role
  const canStart = ['opener', 'moderator', 'admin', 'master'].includes(role)
  const canStop = ['moderator', 'admin', 'master'].includes(role)
  const canBackup = ['admin', 'master'].includes(role)
  const canViewLog = ['admin', 'master'].includes(role)
  const canCommand = ['admin', 'master'].includes(role)
  const canViewStatus = ['viewer', 'opener', 'moderator', 'admin', 'master'].includes(role)

  // --- Acciones de start/stop/backup con toast ---
  const handleAction = async (action) => {
    try {
      if (action === 'start' && canStart) await startServer(server.name)
      if (action === 'stop' && canStop) await stopServer(server.name)
      if (action === 'backup' && canBackup) await backupServer(server.name)
      toast.success(`✅ Acción "${action}" completada`)
      onRefresh()
    } catch (err) {
      toast.error(`❌ Error al ${action} el servidor`)
    }
  }

  // --- Fetch periódico de logs (sólo si puede verlos) ---
  useEffect(() => {
    if (!server.running || !canViewLog) {
      setLogs([])
      return
    }
    let mounted = true
    const fetchLogs = async () => {
      try {
        const res = await fetch(
          `/api/logs/${encodeURIComponent(server.name)}`,
          { credentials: 'include' }
        )
        if (res.ok) {
          const data = await res.json()
          if (mounted && Array.isArray(data.logs)) setLogs(data.logs)
        } else if (res.status === 401 && mounted) {
          toast.warn('Sesión caducada al obtener logs')
          setLogs([])
        }
      } catch {
        if (mounted) setLogs([])
      }
    }
    fetchLogs()
    const interval = setInterval(fetchLogs, 3000)
    return () => { mounted = false; clearInterval(interval) }
  }, [server.running, server.name, canViewLog])

  // --- Envío de comando en consola (admin/master) ---
  const onCommandKey = async (e) => {
    if (e.key !== 'Enter' || !canCommand || !inputCommand.trim()) return
    try {
      await sendCommand(server.name, inputCommand)
      toast.success('✅ Comando enviado')
    } catch (err) {
      toast.error(`❌ ${err.response?.data?.error || err.message}`)
    }
    setInputCommand('')
  }

  const imgSrc = `./img/${encodeURIComponent(server.name)}.png`

  return (
    <div className={`server-card ${server.running ? 'running' : ''}`}>
      <h2>{server.name}</h2>
      <img
        src={imgSrc}
        alt=""
        onError={e => e.target.style.display = 'none'}
        style={{ width: 256, height: 256 }}
      />

      {/* Estado */}
      <p>
        <strong>Estado:</strong>{' '}
        {server.running ? '🟢 En marcha' : '🔴 Detenido'}
      </p>

      {/* Datos básicos */}
      {canViewStatus && (
        <>
          <p><strong>Puerto:</strong> {server.port}</p>
          <p><strong>IP pública:</strong> {server.ip}</p>
          <p><strong>Java:</strong> {server.java_version}</p>
          <p><strong>RAM:</strong> {server.xms} / {server.xmx}</p>
          <div className="tags">
            {server.tags.map(tag => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        </>
      )}

      {/* Botones de control según rol */}
      <div class="button-row" style={{ marginTop: 10 }}>
        {canStart && !server.running && (
          <button onClick={() => handleAction('start')}>Iniciar</button>
        )}
        {canStop && server.running && (
          <button onClick={() => handleAction('stop')}>
            Detener + Backup
          </button>
        )}
        {canBackup && (
          <button onClick={() => handleAction('backup')}>
            Solo Backup
          </button>
        )}
      </div>

      {/* Logs sólo para admin/master */}
      {canViewLog && server.running && (
        <div className="log-box" style={{ marginTop: 15 }}>
          <pre style={{
            maxHeight: "100vh", 
            maxWidth: "100%",
            overflowY: "auto",
            background: "#111",
            color: "lime",
            padding: 10,
            fontFamily: "monospace",
            borderRadius: 6
          }}>
            {logs.slice(-50).join("\n")}
          </pre>
        </div>
      )}

      {/* Consola de comandos sólo admin/master */}
      {canCommand && server.running && (
        <div style={{ marginTop: 10 , width:"100%"}}>
          <input
            type="text"
            value={inputCommand}
            onChange={e => setInputCommand(e.target.value)}
            onKeyDown={onCommandKey}
            placeholder="Escribe un comando..."
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: 4,
              fontFamily: "monospace"
            }}
          />
        </div>
      )}
    </div>
  )
}
