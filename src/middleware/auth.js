'use strict';
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Token manquant' });
  }

  const token = header.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET || 'default_secret';
    req.user = jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Token invalide' });
  }
};

module.exports = { authenticate };