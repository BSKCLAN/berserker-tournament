import React, { useState } from 'react';
import './App.css';

function App() {
  const [mainStream, setMainStream] = useState(null);

  const players = [
    { id: 1, name: 'IceStorm', kills: 12 },
    { id: 2, name: 'ThunderAxe', kills: 8 },
    { id: 3, name: 'FrostByte', kills: 15 },
    { id: 4, name: 'StormShield', kills: 5 },
    { id: 5, name: 'VoidSlayer', kills: 10 },
    { id: 6, name: 'IceBreaker', kills: 9 },
    { id: 7, name: 'LightningKing', kills: 4 },
    { id: 8, name: 'FrostGuard', kills: 7 },
  ];

  return (
    <div style={{ backgroundColor: '#1a3a52', color: 'white', padding: '20px', minHeight: '100vh', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#00D9FF', fontSize: '32px' }}>⚡ BERSERKER CLAN</h1>
      <p style={{ color: '#888' }}>TORNEO EN VIVO</p>

      <div style={{ marginBottom: '20px' }}>
        <button style={{ 
          padding: '10px 20px', 
          marginRight: '10px',
          backgroundColor: '#00D9FF',
          color: 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          GRABAR
        </button>
        <button style={{ 
          padding: '10px 20px',
          backgroundColor: '#00D9FF',
          color: 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          EN VIVO
        </button>
      </div>

      <div style={{ marginBottom: '20px', backgroundColor: '#0f1e2e', padding: '20px', borderRadius: '5px' }}>
        <h2 style={{ color: '#00D9FF' }}>📊 ESTADÍSTICAS</h2>
        <p>⏰ Tiempo: 24:35</p>
        <p>⚔️ Kills: 47</p>
        <p>🔴 En Batalla: 7/8</p>
      </div>

      <div style={{ backgroundColor: '#0f1e2e', padding: '20px', borderRadius: '5px' }}>
        <h2 style={{ color: '#00D9FF' }}>⚡ JUGADORES EN BATALLA</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px' }}>
          {players.map(player => (
            <button
              key={player.id}
              onClick={() => setMainStream(player)}
              style={{
                padding: '15px',
                backgroundColor: mainStream?.id === player.id ? '#00D9FF' : '#1a3a52',
                color: mainStream?.id === player.id ? 'black' : 'white',
                border: '2px solid #00D9FF',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '12px'
              }}
            >
              <div style={{ fontSize: '24px' }}>⚔️</div>
              <div>{player.name}</div>
              <div>{player.kills}⚡</div>
            </button>
          ))}
        </div>
      </div>

      {mainStream && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#0f1e2e', borderRadius: '5px', borderLeft: '4px solid #00D9FF' }}>
          <h3 style={{ color: '#00D9FF' }}>🎮 Stream Principal: {mainStream.name}</h3>
          <p>💀 Kills: {mainStream.kills}</p>
        </div>
      )}

      <div style={{ marginTop: '40px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
        <p>⚡ BERSERKER TOURNAMENT CONTROL v1.0</p>
        <p>Prepare for Battle</p>
      </div>
    </div>
  );
}

export default App;