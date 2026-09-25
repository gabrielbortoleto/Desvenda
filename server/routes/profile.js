const express = require('express');
const { queryGet, queryRun } = require('../db/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// PUT /api/profile - Atualizar perfil do aluno
router.put('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, experienceLevel, learningGoal, onboardingCompleted } = req.body;

    if (name) {
      await queryRun('UPDATE users SET name = ? WHERE id = ?', [name.trim(), userId]);
    }

    const existingProfile = await queryGet('SELECT * FROM profiles WHERE user_id = ?', [userId]);

    if (existingProfile) {
      await queryRun(
        `UPDATE profiles SET 
          experience_level = ?, 
          learning_goal = ?, 
          onboarding_completed = COALESCE(?, onboarding_completed)
        WHERE user_id = ?`,
        [
          experienceLevel || existingProfile.experience_level,
          learningGoal || existingProfile.learning_goal,
          onboardingCompleted !== undefined ? (onboardingCompleted ? 1 : 0) : null,
          userId
        ]
      );
    } else {
      await queryRun(
        `INSERT INTO profiles (id, user_id, experience_level, learning_goal, onboarding_completed, total_points) VALUES (?, ?, ?, ?, ?, ?)`,
        [`prof-${Date.now()}`, userId, experienceLevel || 'NEVER', learningGoal || '', onboardingCompleted ? 1 : 0, 0]
      );
    }

    const updatedUser = await queryGet('SELECT id, name, email, role FROM users WHERE id = ?', [userId]);
    const updatedProfile = await queryGet('SELECT * FROM profiles WHERE user_id = ?', [userId]);

    return res.json({
      message: 'Perfil atualizado com sucesso!',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        onboardingCompleted: Boolean(updatedProfile.onboarding_completed),
        experienceLevel: updatedProfile.experience_level,
        learningGoal: updatedProfile.learning_goal,
        totalPoints: updatedProfile.total_points
      }
    });
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    return res.status(500).json({ error: 'Erro ao atualizar dados do perfil.' });
  }
});

module.exports = router;

