const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'desvende_ia_secret_key_2026_super_secure';

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Formato de token inválido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
}

function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user && req.user.role === 'ADMIN') {
      next();
    } else {
      return res.status(403).json({ error: 'Acesso restrito. Apenas administradores podem realizar esta operação.' });
    }
  });
}

module.exports = {
  verifyToken,
  verifyAdmin,
  JWT_SECRET
};

