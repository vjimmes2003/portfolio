import React, { useEffect, useState } from 'react'
import { getLogs, sendCommand } from '../api'

const Console = ({ server }) => {
  const [logs, setLogs] = useState([])
  const [input, setInput] = useState("")

  const fetchLogs = async () => {
    const data = await getLogs(server)
    setLogs(data || [])
  }

  const handleSend = async () => {
    if (!input.trim()) return
    await sendCommand(server, input)
    setInput("")
    fetchLogs()
  }

  useEffect(() => {
    fetchLogs()
    const interval = setInterval(fetchLogs, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ backgroundColor: "#111", padding: 10, marginTop: 20, borderRadius: 10 }}>
      <h3 style={{ color: "#00ffaa" }}>Consola de {server}</h3>
      <pre style={{ maxHeight: "100vh", maxWidth: "100%", overflowY: 'auto', backgroundColor: '#000', color: '#0f0', padding: '10px', borderRadius: 5 }}>
        {logs.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </pre>
      <div style={{ marginTop: 10 }}>
        <input
          style={{ width: '80%', padding: '8px' }}
          placeholder="Escribe un comando..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button style={{ padding: '8px', marginLeft: 8 }} onClick={handleSend}>Enviar</button>
      </div>
    </div>
  )
}

export default Console
