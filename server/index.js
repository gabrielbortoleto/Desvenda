const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Inicializar banco de dados
require('./db/database');

const authRoutes = require('./routes/auth');
const lessonsRoutes = require('./routes/lessons');
const progressRoutes = require('./routes/progress');
const adminRoutes = require('./routes/admin');
const profileRoutes = require('./routes/profile');
const { sanitizeMiddleware } = require('./middleware/sanitize');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(sanitizeMiddleware);

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../public')));

// Rotas da API REST
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonsRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);

// Fallback para SPA (Servir index.html para qualquer rota cliente)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Manipulador de erros global
app.use((err, req, res, next) => {
  console.error('⚠️ Erro não tratado no servidor:', err.stack);
  res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Servidor Desvende IA rodando com sucesso!`);
  console.log(`🌐 Acesse no seu navegador: http://localhost:${PORT}`);
  console.log(`====================================================`);
});

