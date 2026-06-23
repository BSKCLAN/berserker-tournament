const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ========== RUTAS ==========

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '⚡ BERSERKER BACKEND ONLINE',
    service: 'BERSERKER Tournament Control',
    version: '1.0'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'BERSERKER BACKEND HEALTHY'
  });
});

// Torneo actual
app.get('/api/tournament/current', (req, res) => {
  res.json({
    tournament: 'BERSERKER CLAN',
    status: 'LIVE',
    round: 'CLASIFICATORIA FINAL',
    timestamp: new Date()
  });
});

// Teams
app.get('/api/tournament/teams', (req, res) => {
  res.json({
    teams: [
      {
        id: 1,
        name: '⚡ BERSERKER ALPHA',
        players: 4,
        status: 'ACTIVE'
      },
      {
        id: 2,
        name: '⚔️ BERSERKER BETA',
        players: 4,
        status: 'ACTIVE'
      }
    ]
  });
});

// Stats
app.get('/api/tournament/stats', (req, res) => {
  res.json({
    totalKills: 47,
    aliveCount: 7,
    totalPlayers: 8,
    timeElapsed: '24:35',
    viewers: 24300
  });
});

// Stream info
app.get('/api/streams/info', (req, res) => {
  res.json({
    streams: [
      {
        id: 101,
        name: 'IceStorm',
        channel: 'icestorm',
        status: 'live',
        viewers: 500
      }
    ]
  });
});

// ========== ERROR HANDLER ==========

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    path: req.path 
  });
});

// ========== START SERVER ==========

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║  ⚡ BERSERKER TOURNAMENT CONTROL ⚡   ║
║  Backend Server v1.0                 ║
╚═══════════════════════════════════════╝

🚀 Server activo en: http://localhost:${PORT}
📡 Estado: LIVE
🎮 Torneo: BERSERKER CLAN
✅ Ready for battle!
  `);
});
