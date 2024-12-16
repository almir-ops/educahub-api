const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sua_chave_secreta'; // Configure no .env

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token not provided' });

  const token = authHeader.split(' ')[1]; // Pega o token da string "Bearer <token>"
  if (!token) return res.status(401).json({ error: 'Token not provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Decodifica o token
    req.user = { id: decoded.id, type: decoded.type }; // Adiciona `id` e `type` ao `req.user`
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
