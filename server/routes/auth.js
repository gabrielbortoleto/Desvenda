const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { queryGet, queryRun } = require('../db/database');
const { verifyToken, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    const existing = await queryGet('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existing) {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado. Tente fazer login.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const role = email.toLowerCase().includes('admin') ? 'ADMIN' : 'STUDENT';

    await queryRun(
      `INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
      [userId, name.trim(), email.toLowerCase().trim(), passwordHash, role]
    );

    const profileId = `prof-${Date.now()}`;
    await queryRun(
      `INSERT INTO profiles (id, user_id, experience_level, learning_goal, onboarding_completed, total_points) VALUES (?, ?, ?, ?, ?, ?)`,
      [profileId, userId, 'NEVER', '', 0, 0]
    );

    const token = jwt.sign({ id: userId, email: email.toLowerCase().trim(), role }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      message: 'Conta criada com sucesso!',
      token,
      user: {
        id: userId,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role,
        onboardingCompleted: false,
        totalPoints: 0
      }
    });
  } catch (err) {
    console.error('Erro no registro:', err);
    return res.status(500).json({ error: 'Erro interno ao criar conta.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Informe e-mail e senha.' });
    }

    const user = await queryGet('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    }

    const profile = await queryGet('SELECT * FROM profiles WHERE user_id = ?', [user.id]);

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboardingCompleted: profile ? Boolean(profile.onboarding_completed) : false,
        experienceLevel: profile ? profile.experience_level : 'NEVER',
        learningGoal: profile ? profile.learning_goal : '',
        totalPoints: profile ? profile.total_points : 0
      }
    });
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ error: 'Erro interno ao autenticar.' });
  }
});

// GET /api/auth/me
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await queryGet('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [req.user.id]);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const profile = await queryGet('SELECT * FROM profiles WHERE user_id = ?', [user.id]);

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboardingCompleted: profile ? Boolean(profile.onboarding_completed) : false,
        experienceLevel: profile ? profile.experience_level : 'NEVER',
        learningGoal: profile ? profile.learning_goal : '',
        totalPoints: profile ? profile.total_points : 0
      }
    });
  } catch (err) {
    console.error('Erro me:', err);
    return res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
  }
});

module.exports = router;

