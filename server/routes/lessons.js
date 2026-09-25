const express = require('express');
const { queryAll, queryGet } = require('../db/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/lessons/track - Visão completa da trilha "IA sem Mistério" com módulos e lições publicadas
router.get('/track', verifyToken, async (req, res) => {
  try {
    const track = await queryGet('SELECT * FROM tracks WHERE slug = ? AND status = ?', ['ia-sem-misterio', 'PUBLISHED']);
    if (!track) {
      return res.status(404).json({ error: 'Trilha não encontrada.' });
    }

    const modules = await queryAll('SELECT * FROM modules WHERE track_id = ? AND status = ? ORDER BY order_index ASC', [track.id, 'PUBLISHED']);

    for (const mod of modules) {
      const lessons = await queryAll(
        'SELECT id, title, slug, estimated_minutes, points, status, order_index FROM lessons WHERE module_id = ? AND status = ? ORDER BY order_index ASC',
        [mod.id, 'PUBLISHED']
      );
      mod.lessons = lessons;
    }

    return res.json({
      track,
      modules
    });
  } catch (err) {
    console.error('Erro ao buscar trilha:', err);
    return res.status(500).json({ error: 'Erro interno ao buscar a trilha.' });
  }
});

// GET /api/lessons/:id - Detalhes da lição com pergunta/exercício para o aluno
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const lessonId = req.params.id;
    const lesson = await queryGet('SELECT * FROM lessons WHERE id = ?', [lessonId]);

    if (!lesson) {
      return res.status(404).json({ error: 'Lição não encontrada.' });
    }

    // Alunos normais não podem acessar lição em DRAFT
    if (lesson.status !== 'PUBLISHED' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Esta lição está em rascunho e ainda não foi publicada.' });
    }

    const question = await queryGet('SELECT * FROM questions WHERE lesson_id = ?', [lesson.id]);

    let parsedQuestion = null;
    if (question) {
      parsedQuestion = {
        id: question.id,
        type: question.type,
        text: question.text,
        options: JSON.parse(question.options_json),
        correctAnswer: JSON.parse(question.correct_answer_json),
        feedbackCorrect: question.feedback_correct,
        feedbackIncorrect: question.feedback_incorrect,
        points: question.points
      };
    }

    let parsedVisualData = {};
    try {
      parsedVisualData = JSON.parse(lesson.visual_data);
    } catch (e) {
      parsedVisualData = {};
    }

    return res.json({
      lesson: {
        ...lesson,
        visualData: parsedVisualData,
        question: parsedQuestion
      }
    });
  } catch (err) {
    console.error('Erro ao buscar lição:', err);
    return res.status(500).json({ error: 'Erro ao carregar detalhes da lição.' });
  }
});

module.exports = router;

