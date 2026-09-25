const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../desvende_ia.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
  } else {
    console.log('⚡ Conectado ao banco de dados SQLite: desvende_ia.db');
  }
});

// Inicialização das Tabelas Relacionais
function initDatabase() {
  db.serialize(() => {
    // 1. Usuários
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'STUDENT',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Perfis dos Usuários
    db.run(`
      CREATE TABLE IF NOT EXISTS profiles (
        id TEXT PRIMARY KEY,
        user_id TEXT UNIQUE NOT NULL,
        experience_level TEXT DEFAULT 'NEVER',
        learning_goal TEXT DEFAULT '',
        onboarding_completed INTEGER DEFAULT 0,
        total_points INTEGER DEFAULT 0,
        streak_days INTEGER DEFAULT 1,
        last_visit DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // 3. Trilhas
    db.run(`
      CREATE TABLE IF NOT EXISTS tracks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT NOT NULL,
        order_index INTEGER DEFAULT 1,
        status TEXT NOT NULL DEFAULT 'PUBLISHED'
      )
    `);

    // 4. Módulos
    db.run(`
      CREATE TABLE IF NOT EXISTS modules (
        id TEXT PRIMARY KEY,
        track_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        order_index INTEGER DEFAULT 1,
        status TEXT NOT NULL DEFAULT 'PUBLISHED',
        FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE
      )
    `);

    // 5. Lições
    db.run(`
      CREATE TABLE IF NOT EXISTS lessons (
        id TEXT PRIMARY KEY,
        module_id TEXT NOT NULL,
        title TEXT NOT NULL,
        slug TEXT NOT NULL,
        estimated_minutes INTEGER DEFAULT 5,
        points INTEGER DEFAULT 10,
        hook_question TEXT NOT NULL,
        explanation TEXT NOT NULL,
        visual_type TEXT DEFAULT 'CUSTOM',
        visual_data TEXT NOT NULL,
        summary TEXT NOT NULL,
        next_step_hint TEXT NOT NULL,
        order_index INTEGER DEFAULT 1,
        status TEXT NOT NULL DEFAULT 'PUBLISHED',
        FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
      )
    `);

    // 6. Perguntas e Exercícios
    db.run(`
      CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        lesson_id TEXT UNIQUE NOT NULL,
        type TEXT NOT NULL,
        text TEXT NOT NULL,
        options_json TEXT NOT NULL,
        correct_answer_json TEXT NOT NULL,
        feedback_correct TEXT NOT NULL,
        feedback_incorrect TEXT NOT NULL,
        points INTEGER DEFAULT 10,
        FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
      )
    `);

    // 7. Progresso das Lições
    db.run(`
      CREATE TABLE IF NOT EXISTS lesson_progress (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        lesson_id TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'COMPLETED',
        score INTEGER DEFAULT 100,
        completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, lesson_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
      )
    `);

    // 8. Tentativas de Exercícios
    db.run(`
      CREATE TABLE IF NOT EXISTS quiz_attempts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        question_id TEXT NOT NULL,
        user_answer_json TEXT NOT NULL,
        is_correct INTEGER NOT NULL,
        attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
      )
    `);

    // 9. Logs do Administrador
    db.run(`
      CREATE TABLE IF NOT EXISTS admin_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        details TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
  });
}

initDatabase();

// Promisify métodos para facilitar rotas assíncronas
function queryRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function queryGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function queryAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = {
  db,
  queryRun,
  queryGet,
  queryAll
};

