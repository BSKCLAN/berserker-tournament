// backend/server.js - BERSERKER TOURNAMENT CONTROL
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// TWITCH CONFIG
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN;

const twitchHeaders = {
  'Client-ID': TWITCH_CLIENT_ID,
  'Authorization': `Bearer ${TWITCH_ACCESS_TOKEN}`
};

// ======================== BERSERKER SPECIFIC DATA ========================

const berserkerTournament = {
  name: 'BERSERKER CLAN',
  round: 'CLASIFICATORIA FINAL',
  startTime: new Date(),
  status: 'LIVE',
  teams: [
    {
      id: 1,
      name: '⚡ BERSERKER ALPHA',
      members: [
        { id: 101, name: 'IceStorm', channel: 'icestorm', rank: 'Capitán' },
        { id: 102, name: 'ThunderAxe', channel: 'thunderaxe', rank: 'Slayer' },
        { id: 103, name: 'FrostByte', channel: 'frostbyte', rank: 'Slayer' },
        { id: 104, name: 'StormShield', channel: 'stormshield', rank: 'Support' },
      ]
    },
    {
      id: 2,
      name: '⚔️ BERSERKER BETA',
      members: [
        { id: 201, name: 'VoidSlayer', channel: 'voidslayer', rank: 'Capitán' },
        { id: 202, name: 'IceBreaker', channel: 'icebreaker', rank: 'Slayer' },
        { id: 203, name: 'LightningKing', channel: 'lightningking', rank: 'Sniper' },
        { id: 204, name: 'FrostGuard', channel: 'frostguard', rank: 'Support' },
      ]
    }
  ],
  stats: {
    totalKills: 47,
    aliveCount: 7,
    recordingStatus: false,
    viewers: 24300
  }
};

// PLAYER STATS IN-MEMORY (en producción usar DB)
const playerStats = {};
berserkerTournament.teams.forEach(team => {
  team.members.forEach(player => {
    playerStats[player.id] = {
      ...player,
      kills: Math.floor(Math.random() * 15),
      deaths: Math.floor(Math.random() * 5),
      downs: Math.floor(Math.random() * 3),
      status: ['live', 'down', 'dead'][Math.floor(Math.random() * 3)]
    };
  });
});

// ======================== WEBSOCKET - REAL TIME UPDATES ========================

io.on('connection', (socket) => {
  console.log(`🔌 Nuevo cliente conectado: ${socket.id}`);

  // Enviar estado actual
  socket.emit('tournament:init', berserkerTournament);
  socket.emit('stats:update', berserkerTournament.stats);

  // Escuchar eventos del productor
  socket.on('recording:toggle', (isRecording) => {
    berserkerTournament.stats.recordingStatus = isRecording;
    io.emit('recording:status', isRecording);
    console.log(`🔴 Grabación: ${isRecording ? 'INICIADA' : 'DETENIDA'}`);
  });

  socket.on('stream:select', (playerId) => {
    io.emit('stream:changed', { playerId, timestamp: new Date() });
    console.log(`📺 Stream principal: Jugador ${playerId}`);
  });

  socket.on('event:kill', (data) => {
    const { killerId, victimId } = data;
    playerStats[killerId].kills += 1;
    berserkerTournament.stats.totalKills += 1;
    
    io.emit('kill:confirmed', { killerId, victimId, kills: playerStats[killerId].kills });
    console.log(`⚔️ Kill: ${playerStats[killerId].name} eliminó a ${playerStats[victimId].name}`);
  });

  socket.on('event:down', (playerId) => {
    playerStats[playerId].status = 'down';
    playerStats[playerId].downs += 1;
    io.emit('player:status', { playerId, status: 'down' });
  });

  socket.on('event:dead', (playerId) => {
    playerStats[playerId].status = 'dead';
    berserkerTournament.stats.aliveCount -= 1;
    io.emit('player:status', { playerId, status: 'dead' });
  });

  socket.on('disconnect', () => {
    console.log(`❌ Cliente desconectado: ${socket.id}`);
  });
});

// ======================== API ENDPOINTS ========================

// BERSERKER TOURNAMENT INFO
app.get('/api/tournament/current', (req, res) => {
  res.json({
    success: true,
    tournament: berserkerTournament,
    playerStats: playerStats
  });
});

// TEAM INFO
app.get('/api/tournament/teams', (req, res) => {
  res.json({
    success: true,
    teams: berserkerTournament.teams,
    stats: berserkerTournament.stats
  });
});

// PLAYER STATS
app.get('/api/player/:playerId/stats', (req, res) => {
  const { playerId } = req.params;
  const stats = playerStats[playerId];

  if (!stats) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }

  res.json({
    success: true,
    player: stats
  });
});

// UPDATE PLAYER STATUS
app.post('/api/player/:playerId/status', (req, res) => {
  const { playerId } = req.params;
  const { status } = req.body;

  if (!playerStats[playerId]) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }

  playerStats[playerId].status = status;
  io.emit('player:status', { playerId, status });

  res.json({
    success: true,
    message: `Estado del jugador actualizado a: ${status}`
  });
});

// ======================== TWITCH API ========================

// GET STREAMS INFO (BERSERKER PLAYERS)
app.post('/api/streams/info', async (req, res) => {
  try {
    const { playerIds } = req.body;

    // Obtener channels de los jugadores
    const channels = [];
    berserkerTournament.teams.forEach(team => {
      team.members.forEach(member => {
        if (!playerIds || playerIds.includes(member.id)) {
          channels.push(member.channel);
        }
      });
    });

    if (channels.length === 0) {
      return res.json({ data: [], error: 'Sin canales' });
    }

    const userLogins = channels.join('&user_login=');
    
    const response = await axios.get(
      `https://api.twitch.tv/helix/streams?user_login=${userLogins}`,
      { headers: twitchHeaders }
    );

    const streamsWithData = await Promise.all(
      response.data.data.map(async (stream) => {
        const userRes = await axios.get(
          `https://api.twitch.tv/helix/users?login=${stream.user_login}`,
          { headers: twitchHeaders }
        );

        return {
          id: stream.id,
          name: stream.user_name,
          channel: stream.user_login,
          title: stream.title,
          game: stream.game_name,
          viewers: stream.viewer_count.toLocaleString(),
          thumbnail: stream.thumbnail_url,
          profileImage: userRes.data.data[0]?.profile_image_url,
          status: 'live'
        };
      })
    );

    res.json({
      success: true,
      streams: streamsWithData
    });
  } catch (error) {
    console.error('Error en streams:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET SINGLE STREAM
app.get('/api/stream/:channel', async (req, res) => {
  try {
    const { channel } = req.params;

    const response = await axios.get(
      `https://api.twitch.tv/helix/streams?user_login=${channel}`,
      { headers: twitchHeaders }
    );

    if (response.data.data.length === 0) {
      return res.status(404).json({ error: 'Stream no encontrado' });
    }

    res.json({
      success: true,
      stream: response.data.data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ======================== RECORDING & EVENTS ========================

// RECORD EVENT
app.post('/api/events/record', (req, res) => {
  try {
    const { eventType, playerId, timestamp, description } = req.body;

    const event = {
      id: Date.now(),
      type: eventType,
      playerId,
      timestamp: timestamp || new Date(),
      description
    };

    // En producción guardar en DB
    console.log(`📝 Evento grabado: ${eventType} - ${description}`);

    // Broadcast a todos los clientes
    io.emit('event:recorded', event);

    res.json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET TOURNAMENT STATS
app.get('/api/tournament/stats', (req, res) => {
  const timeElapsed = Math.floor((Date.now() - berserkerTournament.startTime) / 1000);
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  res.json({
    success: true,
    stats: {
      ...berserkerTournament.stats,
      timeElapsed: `${minutes}:${seconds.toString().padStart(2, '0')}`,
      activePlayers: Object.values(playerStats).filter(p => p.status === 'live').length,
      downPlayers: Object.values(playerStats).filter(p => p.status === 'down').length,
      deadPlayers: Object.values(playerStats).filter(p => p.status === 'dead').length
    }
  });
});

// ======================== HEALTH CHECK ========================

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    tournament: berserkerTournament.name,
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

// ======================== ERROR HANDLER ========================

app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

// ======================== START SERVER ========================

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║  ⚡ BERSERKER TOURNAMENT CONTROL ⚡   ║
║  Backend Server v2.0                 ║
╚═══════════════════════════════════════╝

🚀 Server activo en: http://localhost:${PORT}
📡 WebSocket escuchando en: ws://localhost:${PORT}
🎮 Torneo: ${berserkerTournament.name}
🔴 Estado: ${berserkerTournament.status}

Endpoints disponibles:
  GET  /health
  GET  /api/tournament/current
  GET  /api/tournament/teams
  GET  /api/tournament/stats
  GET  /api/player/:playerId/stats
  POST /api/player/:playerId/status
  POST /api/streams/info
  GET  /api/stream/:channel
  POST /api/events/record

WebSocket events:
  tournament:init
  recording:toggle
  stream:select
  event:kill
  event:down
  event:dead
  player:status

Ready for battle! ⚔️
  `);
});

module.exports = server;
