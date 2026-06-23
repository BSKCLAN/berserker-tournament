import React, { useState } from 'react';
import { Play, Square, Radio, Zap } from 'lucide-react';

const BerserkerProducerPanel = () => {
  const [mainStream, setMainStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const teams = [
    {
      id: 1,
      name: '⚡ BERSERKER ALPHA',
      players: [
        { id: 101, name: 'IceStorm', channel: 'icestorm', kills: 12 },
        { id: 102, name: 'ThunderAxe', channel: 'thunderaxe', kills: 8 },
        { id: 103, name: 'FrostByte', channel: 'frostbyte', kills: 15 },
        { id: 104, name: 'StormShield', channel: 'stormshield', kills: 5 },
      ]
    },
    {
      id: 2,
      name: '⚔️ BERSERKER BETA',
      players: [
        { id: 201, name: 'VoidSlayer', channel: 'voidslayer', kills: 10 },
        { id: 202, name: 'IceBreaker', channel: 'icebreaker', kills: 9 },
        { id: 203, name: 'LightningKing', channel: 'lightningking', kills: 4 },
        { id: 204, name: 'FrostGuard', channel: 'frostguard', kills: 7 },
      ]
    }
  ];

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
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isRecording ? <Square size={20} /> : <Play size={20} />}
            {isRecording ? 'GRABANDO' : 'GRABAR'}
          </button>
          <button className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2">
            <Radio size={20} /> EN VIVO
          </button>
        </div>
      </div>

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
                    src={`https://player.twitch.tv/?channel=${mainStream.channel}&parent=${window.location.hostname}&muted=false`}
                    height="100%"
                    width="100%"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 z-10">
                    <h2 className="text-2xl font-bold text-cyan-300">{mainStream.name}</h2>
                    <p className="text-gray-300">⚔️ {mainStream.kills} Kills</p>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <Zap size={48} className="text-cyan-500/50 mx-auto mb-4" />
                  <p className="text-gray-400">Selecciona un BERSERKER</p>
                </div>
              )}
            </div>
          </div>
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
          </div>
        </div>
      </div>

      {/* JUGADORES */}
      <div className="bg-gray-900 border-2 border-cyan-500/30 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-6 text-cyan-300">⚡ GUERREROS EN BATALLA</h3>

        {teams.map(team => (
          <div key={team.id} className="mb-8">
            <h4 className="text-lg font-bold mb-4 text-cyan-400">{team.name}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {team.players.map(player => (
                <button
                  key={player.id}
                  onClick={() => setMainStream(player)}
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
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p className="font-bold">⚡ BERSERKER TOURNAMENT CONTROL</p>
        <p className="text-xs">Prepare for Battle</p>
      </div>
    </div>
  );
};

export default BerserkerProducerPanel;
