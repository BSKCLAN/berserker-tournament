const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'BERSERKER BACKEND ONLINE' });
});

app.get('/api/tournament/current', (req, res) => {
  res.json({ tournament: 'BERSERKER CLAN', status: 'LIVE' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend en puerto ${PORT}`);
});