import React, { useState } from 'react';
<<<<<<< HEAD
import { Play, Square, Radio, Zap } from 'lucide-react';
=======
import { Play, Square, Users, Settings, Eye, Radio, Zap, Shield } from 'lucide-react';
>>>>>>> da671980a215288c39a2bdeb861cc2a37fc94061

const BerserkerProducerPanel = () => {
  const [mainStream, setMainStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
<<<<<<< HEAD

  const teams = [
    {
      id: 1,
      name: '⚡ BERSERKER ALPHA',
      players: [
        { id: 101, name: 'IceStorm', channel: 'icestorm', kills: 12 },
        { id: 102, name: 'ThunderAxe', channel: 'thunderaxe', kills: 8 },
        { id: 103, name: 'FrostByte', channel: 'frostbyte', kills: 15 },
        { id: 104, name: 'StormShield', channel: 'stormshield', kills: 5 },
=======
  const [layout, setLayout] = useState('picture-in-picture');
  const [teamName] = useState('BERSERKER CLAN');
  const [round, setRound] = useState('CLASIFICATORIA FINAL');

  const berserkerTeams = [
    {
      id: 1,
      teamName: '⚡ BERSERKER ALPHA',
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500',
      players: [
        { id: 101, name: 'IceStorm', channel: 'icestorm', status: 'live', kills: 12, rank: 'Capitán' },
        { id: 102, name: 'ThunderAxe', channel: 'thunderaxe', status: 'live', kills: 8, rank: 'Slayer' },
        { id: 103, name: 'FrostByte', channel: 'frostbyte', status: 'live', kills: 15, rank: 'Slayer' },
        { id: 104, name: 'StormShield', channel: 'stormshield', status: 'down', kills: 5, rank: 'Support' },
>>>>>>> da671980a215288c39a2bdeb861cc2a37fc94061
      ]
    },
    {
      id: 2,
<<<<<<< HEAD
      name: '⚔️ BERSERKER BETA',
      players: [
        { id: 201, name: 'VoidSlayer', channel: 'voidslayer', kills: 10 },
        { id: 202, name: 'IceBreaker', channel: 'icebreaker', kills: 9 },
        { id: 203, name: 'LightningKing', channel: 'lightningking', kills: 4 },
        { id: 204, name: 'FrostGuard', channel: 'frostguard', kills: 7 },
=======
      teamName: '⚔️ BERSERKER BETA',
      color: 'from-blue-500 to-indigo-600',
      borderColor: 'border-blue-500',
      players: [
        { id: 201, name: 'VoidSlayer', channel: 'voidslayer', status: 'live', kills: 10, rank: 'Capitán' },
        { id: 202, name: 'IceBreaker', channel: 'icebreaker', status: 'live', kills: 9, rank: 'Slayer' },
        { id: 203, name: 'LightningKing', channel: 'lightningking', status: 'dead', kills: 4, rank: 'Sniper' },
        { id: 204, name: 'FrostGuard', channel: 'frostguard', status: 'live', kills: 7, rank: 'Support' },
>>>>>>> da671980a215288c39a2bdeb861cc2a37fc94061
      ]
    }
  ];

<<<<<<< HEAD
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-cyan-500/50 pb-4">
        <div>
          <h1 className="text-4xl font-bold text-cyan-400">⚡ BERSERKER CLAN</h1>
          <p className="text-gray-400">TORNEO EN VIVO</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition ${
              isRecording
                ? 'bg-red-600 hover:bg-red-700 animate-pulse'
=======
  const allPlayers = berserkerTeams.flatMap(t => t.players);
  const activeTeam = berserkerTeams[0]; // Equipo principal mostrado

  const getStatusColor = (status) => {
    switch(status) {
      case 'live': return 'bg-cyan-500 shadow-lg shadow-cyan-500/50';
      case 'down': return 'bg-yellow-500 shadow-lg shadow-yellow-500/50';
      case 'dead': return 'bg-red-600 shadow-lg shadow-red-600/50';
      default: return 'bg-gray-600';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'live': return '⚡ EN BATALLA';
      case 'down': return '⚠️ ABATIDO';
      case 'dead': return '💀 CAÍDO';
      default: return 'OFFLINE';
    }
  };

  const getRankColor = (rank) => {
    switch(rank) {
      case 'Capitán': return 'text-yellow-300 font-bold';
      case 'Slayer': return 'text-cyan-300';
      case 'Sniper': return 'text-purple-300';
      case 'Support': return 'text-blue-300';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white p-4 overflow-x-hidden">
      {/* BACKGROUND EFFECT */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* HEADER ÉPICO */}
      <div className="relative z-10 flex justify-between items-center mb-8 border-b-2 border-cyan-500/50 pb-6">
        <div className="flex items-center gap-4">
          {/* LOGO PLACEHOLDER */}
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-1 shadow-lg shadow-cyan-500/50">
            <div className="w-full h-full bg-gray-950 rounded flex items-center justify-center">
              <Shield size={32} className="text-cyan-400" />
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ⚡ BERSERKER CLAN
            </h1>
            <p className="text-gray-400 flex items-center gap-2">
              <Zap size={16} className="text-cyan-400" />
              {round}
            </p>
          </div>
        </div>

        {/* CONTROLES PRINCIPALES */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition transform hover:scale-105 ${
              isRecording
                ? 'bg-red-600 hover:bg-red-700 animate-pulse shadow-lg shadow-red-600/50'
>>>>>>> da671980a215288c39a2bdeb861cc2a37fc94061
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isRecording ? <Square size={20} /> : <Play size={20} />}
            {isRecording ? 'GRABANDO' : 'GRABAR'}
          </button>
<<<<<<< HEAD
          <button className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2">
=======
          <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/50 transition transform hover:scale-105">
>>>>>>> da671980a215288c39a2bdeb861cc2a37fc94061
            <Radio size={20} /> EN VIVO
          </button>
        </div>
      </div>

<<<<<<< HEAD
      {/* MAIN STREAM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* VIDEO PRINCIPAL */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg overflow-hidden border-2 border-cyan-500/30">
            <div className="aspect-video bg-black flex items-center justify-center relative">
              {mainStream ? (
                <>
                  <iframe
                    title={mainStream.name}
=======
      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 relative z-10">
        {/* MAIN VIDEO AREA */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-lg overflow-hidden shadow-2xl border-2 border-cyan-500/30 hover:border-cyan-500/60 transition">
            {/* Video Principal */}
            <div className="aspect-video bg-black flex items-center justify-center relative group">
              {mainStream ? (
                <>
                  <iframe
>>>>>>> da671980a215288c39a2bdeb861cc2a37fc94061
                    src={`https://player.twitch.tv/?channel=${mainStream.channel}&parent=${window.location.hostname}&muted=false`}
                    height="100%"
                    width="100%"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
<<<<<<< HEAD
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 z-10">
                    <h2 className="text-2xl font-bold text-cyan-300">{mainStream.name}</h2>
                    <p className="text-gray-300">⚔️ {mainStream.kills} Kills</p>
=======
                  {/* OVERLAY INFO BERSERKER */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-4 h-4 rounded-full ${getStatusColor(mainStream.status)} animate-pulse`}></div>
                          <h2 className="text-3xl font-black text-cyan-300">{mainStream.name}</h2>
                        </div>
                        <div className="flex gap-6 text-sm">
                          <p className="text-cyan-400 font-bold">{mainStream.kills} ⚔️ Kills</p>
                          <p className={`font-bold ${getRankColor(mainStream.rank)}`}>{mainStream.rank}</p>
                          <p className="text-gray-300">🔴 EN VIVO</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-cyan-600/80 to-blue-600/80 backdrop-blur px-6 py-3 rounded-lg border border-cyan-400/50">
                        <p className="text-sm font-black text-cyan-100 flex items-center gap-2">
                          <Eye size={16} /> PRINCIPAL
                        </p>
                      </div>
                    </div>
>>>>>>> da671980a215288c39a2bdeb861cc2a37fc94061
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <Zap size={48} className="text-cyan-500/50 mx-auto mb-4" />
<<<<<<< HEAD
                  <p className="text-gray-400">Selecciona un BERSERKER</p>
=======
                  <p className="text-gray-400 text-lg">Selecciona un BERSERKER para ver su batalla</p>
>>>>>>> da671980a215288c39a2bdeb861cc2a37fc94061
                </div>
              )}
            </div>
          </div>
<<<<<<< HEAD
        </div>

        {/* STATS */}
        <div className="bg-gray-900 border-2 border-cyan-500/30 p-6 rounded-lg h-fit">
          <h3 className="font-bold text-lg mb-4 text-cyan-300">📊 ESTADÍSTICAS</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Tiempo Total</p>
              <p className="text-2xl font-bold text-cyan-300">24:35</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Kills Totales</p>
              <p className="text-2xl font-bold text-red-500">47 ⚔️</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">En Batalla</p>
              <p className="text-2xl font-bold text-green-400">7/8</p>
            </div>
            <button className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded-lg font-bold text-sm mt-4">
              ⚙️ Ajustes
            </button>
=======

          {/* CONTROLS LAYOUT */}
          <div className="mt-4 flex gap-2 flex-wrap">
            <button
              onClick={() => setLayout('picture-in-picture')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition transform hover:scale-105 ${
                layout === 'picture-in-picture'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/50'
                  : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              Picture-in-Picture
            </button>
            <button
              onClick={() => setLayout('quad-split')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition transform hover:scale-105 ${
                layout === 'quad-split'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/50'
                  : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              Quad Split
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-bold bg-gray-800 hover:bg-gray-700 border border-gray-700 transition transform hover:scale-105">
              Escena Libre
            </button>
          </div>
        </div>

        {/* PANEL DERECHO - STATS Y CONTROLES */}
        <div className="space-y-4">
          {/* Equipo Stats */}
          <div className="bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur border-2 border-cyan-500/30 rounded-lg p-5">
            <h3 className="font-black text-lg mb-4 flex items-center gap-2 text-cyan-300">
              <Users size={20} /> ⚡ {activeTeam.teamName}
            </h3>
            <div className="space-y-3">
              {activeTeam.players.map(player => (
                <button
                  key={player.id}
                  onClick={() => setMainStream(player)}
                  className={`w-full p-3 rounded-lg cursor-pointer transition transform hover:scale-105 border-2 ${
                    mainStream?.id === player.id
                      ? `bg-gradient-to-r ${activeTeam.color} ring-2 ring-yellow-300 shadow-lg shadow-cyan-500/50`
                      : 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 hover:border-cyan-500/50'
                  }`}
                >
                  <div className="flex justify-between items-center text-left">
                    <div>
                      <p className="font-black text-sm text-white">{player.name}</p>
                      <p className={`text-xs mt-1 ${getRankColor(player.rank)}`}>{player.rank}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-300 font-bold text-sm">{player.kills}⚔️</p>
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(player.status)} inline-block`}></span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Configuración */}
          <div className="bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur border-2 border-cyan-500/30 rounded-lg p-5">
            <h3 className="font-black mb-3 flex items-center gap-2 text-cyan-300">
              <Settings size={18} /> AJUSTES
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <label className="text-gray-400 text-xs font-bold">CALIDAD:</label>
                <select className="w-full bg-gray-900/50 text-cyan-300 p-2 rounded mt-1 text-xs border border-cyan-500/30 focus:border-cyan-500 focus:outline-none font-bold">
                  <option>1080p60 ⚡</option>
                  <option>720p60</option>
                  <option>720p30</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs font-bold">BITRATE:</label>
                <select className="w-full bg-gray-900/50 text-cyan-300 p-2 rounded mt-1 text-xs border border-cyan-500/30 focus:border-cyan-500 focus:outline-none font-bold">
                  <option>8000 kbps</option>
                  <option>6000 kbps</option>
                  <option>12000 kbps</option>
                </select>
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 py-2 rounded text-xs font-black mt-3 shadow-lg shadow-cyan-500/50 transition transform hover:scale-105">
                💾 GUARDAR
              </button>
            </div>
>>>>>>> da671980a215288c39a2bdeb861cc2a37fc94061
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* JUGADORES */}
      <div className="bg-gray-900 border-2 border-cyan-500/30 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-6 text-cyan-300">⚡ GUERREROS EN BATALLA</h3>

        {teams.map(team => (
          <div key={team.id} className="mb-8">
            <h4 className="text-lg font-bold mb-4 text-cyan-400">{team.name}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
=======
      {/* SELECTOR DE JUGADORES - VISTA COMPLETA */}
      <div className="bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur border-2 border-cyan-500/30 rounded-lg p-6 relative z-10">
        <h3 className="text-2xl font-black mb-6 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          <Eye size={28} /> GUERREROS EN BATALLA
        </h3>

        {berserkerTeams.map(team => (
          <div key={team.id} className="mb-8 last:mb-0">
            <h4 className={`text-lg font-black mb-4 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r ${team.color}`}>
              {team.teamName}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
>>>>>>> da671980a215288c39a2bdeb861cc2a37fc94061
              {team.players.map(player => (
                <button
                  key={player.id}
                  onClick={() => setMainStream(player)}
<<<<<<< HEAD
                  className={`p-4 rounded-lg transition transform hover:scale-105 border-2 ${
                    mainStream?.id === player.id
                      ? 'border-yellow-300 bg-gradient-to-br from-cyan-600 to-blue-600 ring-2 ring-yellow-300'
                      : 'border-cyan-500/30 bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full mx-auto mb-2 bg-cyan-500 flex items-center justify-center font-bold">
                    ⚔️
                  </div>
                  <p className="font-bold text-sm text-center text-white truncate">{player.name}</p>
                  <p className="text-xs text-cyan-300 text-center mt-2 font-bold">{player.kills} ⚡</p>
=======
                  className={`p-4 rounded-lg transition transform hover:scale-110 border-2 backdrop-blur ${
                    mainStream?.id === player.id
                      ? `border-yellow-300 bg-gradient-to-br ${team.color} ring-2 ring-yellow-300 shadow-lg shadow-cyan-500/50`
                      : `border-cyan-500/30 bg-gray-900/40 hover:bg-gray-800/60 hover:border-cyan-500`
                  }`}
                >
                  {/* Status Indicator */}
                  <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center font-black text-lg ${getStatusColor(player.status)}`}>
                    ⚔️
                  </div>

                  {/* Nombre */}
                  <p className="font-black text-sm truncate text-center text-white">{player.name}</p>

                  {/* Rank */}
                  <p className={`text-xs text-center mt-1 font-bold ${getRankColor(player.rank)}`}>
                    {player.rank}
                  </p>

                  {/* Kills */}
                  <p className="text-xs text-cyan-300 text-center mt-2 font-black flex items-center justify-center gap-1">
                    {player.kills} ⚡
                  </p>

                  {/* Status */}
                  <p className="text-xs text-center mt-2 font-bold">
                    {getStatusLabel(player.status)}
                  </p>
>>>>>>> da671980a215288c39a2bdeb861cc2a37fc94061
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

<<<<<<< HEAD
      {/* FOOTER */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p className="font-bold">⚡ BERSERKER TOURNAMENT CONTROL</p>
        <p className="text-xs">Prepare for Battle</p>
=======
      {/* ESTADÍSTICAS GLOBALES */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-cyan-500/30 p-4 rounded-lg backdrop-blur">
          <p className="text-gray-400 text-xs font-bold">TIEMPO TOTAL</p>
          <p className="text-3xl font-black text-cyan-300 mt-2 flex items-center gap-1">
            <Zap size={24} /> 24:35
          </p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-cyan-500/30 p-4 rounded-lg backdrop-blur">
          <p className="text-gray-400 text-xs font-bold">KILLS TOTALES</p>
          <p className="text-3xl font-black text-red-500 mt-2">47 ⚔️</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-cyan-500/30 p-4 rounded-lg backdrop-blur">
          <p className="text-gray-400 text-xs font-bold">EN BATALLA</p>
          <p className="text-3xl font-black text-green-400 mt-2">7/8</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-cyan-500/30 p-4 rounded-lg backdrop-blur">
          <p className="text-gray-400 text-xs font-bold">ESPECTADORES</p>
          <p className="text-3xl font-black text-cyan-300 mt-2">24.3K 👥</p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-8 text-center text-gray-500 text-sm border-t border-cyan-500/20 pt-6 relative z-10">
        <p className="font-black">⚡ BERSERKER TOURNAMENT CONTROL v2.0</p>
        <p className="text-xs text-gray-600 mt-1">Valhalla Awaits • Prepare for Battle</p>
>>>>>>> da671980a215288c39a2bdeb861cc2a37fc94061
      </div>
    </div>
  );
};

export default BerserkerProducerPanel;
