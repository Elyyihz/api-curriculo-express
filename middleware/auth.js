import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // ✅ OBRIGATÓRIO para o "userId"
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token inválido ou expirado.' });
    }
}