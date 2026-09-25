const express = require('express');
const { queryAll, queryGet, queryRun } = require('../db/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/progress - Obter progresso completo do aluno autenticado
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const progressList = await queryAll('SELECT lesson_id, status, score, completed_at FROM lesson_progress WHERE user_id = ?', [userId]);

    const profile = await queryGet('SELECT total_points, streak_days FROM profiles WHERE user_id = ?', [userId]);

    const completedLessonIds = progressList.map(p => p.lesson_id);

    return res.json({
      completedLessons: completedLessonIds,
      totalPoints: profile ? profile.total_points : 0,
      streakDays: profile ? profile.streak_days : 1,
      details: progressList
    });
  } catch (err) {
    console.error('Erro ao buscar progresso:', err);
    return res.status(500).json({ error: 'Erro ao carregar seu progresso.' });
  }
});

// POST /api/progress/attempt - Gravar tentativa de exercício
router.post('/attempt', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { questionId, userAnswer, isCorrect } = req.body;

    if (!questionId) {
      return res.status(400).json({ error: 'ID da questão não informado.' });
    }

    const attemptId = `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    await queryRun(
      `INSERT INTO quiz_attempts (id, user_id, question_id, user_answer_json, is_correct) VALUES (?, ?, ?, ?, ?)`,
      [attemptId, userId, questionId, JSON.stringify(userAnswer), isCorrect ? 1 : 0]
    );

    return res.json({ message: 'Tentativa gravada com sucesso.' });
  } catch (err) {
    console.error('Erro ao gravar tentativa:', err);
    return res.status(500).json({ error: 'Erro ao registrar tentativa.' });
  }
});

// POST /api/progress/complete - Marcar lição como concluída e atribuir XP no banco de dados
router.post('/complete', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId, score = 100 } = req.body;

    if (!lessonId) {
      return res.status(400).json({ error: 'ID da lição obrigatório.' });
    }

    const lesson = await queryGet('SELECT points FROM lessons WHERE id = ?', [lessonId]);
    if (!lesson) {
      return res.status(404).json({ error: 'Lição não encontrada.' });
    }

    const existingProgress = await queryGet('SELECT * FROM lesson_progress WHERE user_id = ? AND lesson_id = ?', [userId, lessonId]);

    if (!existingProgress) {
      const progressId = `prog-${Date.now()}`;
      await queryRun(
        `INSERT INTO lesson_progress (id, user_id, lesson_id, status, score) VALUES (?, ?, ?, ?, ?)`,
        [progressId, userId, lessonId, 'COMPLETED', score]
      );

      // Incrementar XP no perfil
      await queryRun(
        `UPDATE profiles SET total_points = total_points + ?, last_visit = CURRENT_TIMESTAMP WHERE user_id = ?`,
        [lesson.points, userId]
      );
    }

    const profile = await queryGet('SELECT total_points FROM profiles WHERE user_id = ?', [userId]);

    return res.json({
      message: 'Lição concluída e progresso gravado com sucesso! 🎉',
      earnedPoints: lesson.points,
      totalPoints: profile ? profile.total_points : 0
    });
  } catch (err) {
    console.error('Erro ao concluir lição:', err);
    return res.status(500).json({ error: 'Erro ao registrar conclusão da lição.' });
  }
});

module.exports = router;

