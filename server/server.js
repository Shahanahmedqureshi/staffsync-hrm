require('dotenv').config();
process.env.JWT_SECRET ||= 'dev-only-secret-change-me';

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/leaves', require('./routes/leaves'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/training', require('./routes/training'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

const port = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(port, () => console.log(`StaffSync API running on port ${port}`)))
  .catch((e) => { console.error('Database connection failed:', e.message); process.exit(1); });
