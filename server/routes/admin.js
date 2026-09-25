const express = require('express');
const { queryAll, queryGet, queryRun } = require('../db/database');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Garantir que todas as rotas deste arquivo sejam protegidas para ADMIN no servidor
router.use(verifyAdmin);

// GET /api/admin/stats - Estatísticas reais do banco de dados
router.get('/stats', async (req, res) => {
  try {
    const totalStudents = await queryGet("SELECT COUNT(*) as count FROM users WHERE role = 'STUDENT'");
    const totalPublishedLessons = await queryGet("SELECT COUNT(*) as count FROM lessons WHERE status = 'PUBLISHED'");
    const totalModules = await queryGet("SELECT COUNT(*) as count FROM modules");
    const totalTracks = await queryGet("SELECT COUNT(*) as count FROM tracks");

    const recentActivity = await queryAll(`
      SELECT 
        lp.completed_at as time,
        u.name as userName,
        l.title as lessonTitle
      FROM lesson_progress lp
      JOIN users u ON lp.user_id = u.id
      JOIN lessons l ON lp.lesson_id = l.id
      ORDER BY lp.completed_at DESC
      LIMIT 5
    `);

    return res.json({
      stats: {
        students: totalStudents ? totalStudents.count : 0,
        publishedLessons: totalPublishedLessons ? totalPublishedLessons.count : 0,
        modules: totalModules ? totalModules.count : 0,
        tracks: totalTracks ? totalTracks.count : 0
      },
      recentActivity: recentActivity.map(a => ({
        text: `${a.userName} concluiu "${a.lessonTitle}"`,
        time: a.time
      }))
    });
  } catch (err) {
    console.error('Erro nas stats admin:', err);
    return res.status(500).json({ error: 'Erro ao carregar estatísticas do admin.' });
  }
});

// GET /api/admin/lessons - Lista de todas as lições para o editor admin
router.get('/lessons', async (req, res) => {
  try {
    const lessons = await queryAll(`
      SELECT l.id, l.title, l.module_id, l.status, l.order_index, m.title as moduleTitle
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      ORDER BY m.order_index ASC, l.order_index ASC
    `);
    return res.json({ lessons });
  } catch (err) {
    console.error('Erro ao listar lições admin:', err);
    return res.status(500).json({ error: 'Erro ao listar lições.' });
  }
});

// GET /api/admin/lessons/:id - Carregar lição completa para edição
router.get('/lessons/:id', async (req, res) => {
  try {
    const lesson = await queryGet('SELECT * FROM lessons WHERE id = ?', [req.params.id]);
    if (!lesson) {
      return res.status(404).json({ error: 'Lição não encontrada.' });
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

    return res.json({
      lesson: {
        ...lesson,
        question: parsedQuestion
      }
    });
  } catch (err) {
    console.error('Erro ao carregar lição no admin:', err);
    return res.status(500).json({ error: 'Erro ao carregar dados da lição.' });
  }
});

// PUT /api/admin/lessons/:id - Salvar alterações de lição no SQLite
router.put('/lessons/:id', async (req, res) => {
  try {
    const lessonId = req.params.id;
    const {
      title,
      estimatedMinutes,
      points,
      hookQuestion,
      explanation,
      visualType,
      visualData,
      summary,
      nextStepHint,
      status,
      question
    } = req.body;

    const existing = await queryGet('SELECT * FROM lessons WHERE id = ?', [lessonId]);
    if (!existing) {
      return res.status(404).json({ error: 'Lição não encontrada.' });
    }

    await queryRun(
      `UPDATE lessons SET 
        title = ?, 
        estimated_minutes = ?, 
        points = ?, 
        hook_question = ?, 
        explanation = ?, 
        visual_type = ?, 
        visual_data = ?, 
        summary = ?, 
        next_step_hint = ?, 
        status = ?
      WHERE id = ?`,
      [
        title || existing.title,
        estimatedMinutes || existing.estimated_minutes,
        points || existing.points,
        hookQuestion || existing.hook_question,
        explanation || existing.explanation,
        visualType || existing.visual_type,
        typeof visualData === 'string' ? visualData : JSON.stringify(visualData || {}),
        summary || existing.summary,
        nextStepHint || existing.next_step_hint,
        status || existing.status,
        lessonId
      ]
    );

    // Se houver questão para atualizar
    if (question) {
      const qExisting = await queryGet('SELECT * FROM questions WHERE lesson_id = ?', [lessonId]);
      if (qExisting) {
        await queryRun(
          `UPDATE questions SET 
            type = ?,
            text = ?,
            options_json = ?,
            correct_answer_json = ?,
            feedback_correct = ?,
            feedback_incorrect = ?,
            points = ?
          WHERE lesson_id = ?`,
          [
            question.type || qExisting.type,
            question.text || qExisting.text,
            JSON.stringify(question.options || []),
            JSON.stringify(question.correctAnswer !== undefined ? question.correctAnswer : 0),
            question.feedbackCorrect || qExisting.feedback_correct,
            question.feedbackIncorrect || qExisting.feedback_incorrect,
            points || qExisting.points,
            lessonId
          ]
        );
      }
    }

    // Registrar log admin
    await queryRun(
      `INSERT INTO admin_logs (id, user_id, action, details) VALUES (?, ?, ?, ?)`,
      [`log-${Date.now()}`, req.user.id, 'EDIT_LESSON', `Lição "${title || existing.title}" atualizada.`]
    );

    return res.json({ message: 'Lição atualizada e salva com sucesso no banco de dados!' });
  } catch (err) {
    console.error('Erro ao atualizar lição:', err);
    return res.status(500).json({ error: 'Erro ao salvar alterações no banco de dados.' });
  }
});

// POST /api/admin/publish - Alternar status Rascunho / Publicado
router.post('/publish', async (req, res) => {
  try {
    const { lessonId, status } = req.body;
    if (!lessonId || !['DRAFT', 'PUBLISHED'].includes(status)) {
      return res.status(400).json({ error: 'ID da lição e status (DRAFT ou PUBLISHED) são obrigatórios.' });
    }

    await queryRun('UPDATE lessons SET status = ? WHERE id = ?', [status, lessonId]);

    return res.json({ message: `Status da lição alterado para ${status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}.` });
  } catch (err) {
    console.error('Erro ao alternar publicação:', err);
    return res.status(500).json({ error: 'Erro ao alterar status da lição.' });
  }
});

// GET /api/admin/tracks - Lista de trilhas para a tela de Trilhas Admin
router.get('/tracks', async (req, res) => {
  try {
    const tracks = await queryAll(`
      SELECT t.*, 
        (SELECT COUNT(*) FROM modules WHERE track_id = t.id) as modules_count,
        (SELECT COUNT(*) FROM lessons l JOIN modules m ON l.module_id = m.id WHERE m.track_id = t.id) as lessons_count
      FROM tracks t
    `);
    return res.json({ tracks });
  } catch (err) {
    console.error('Erro ao buscar trilhas:', err);
    return res.status(500).json({ error: 'Erro ao listar trilhas no admin.' });
  }
});

module.exports = router;

