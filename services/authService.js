import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { User } = db;

export const register = async (username, password) => {
    const userExist = await User.findOne({ where: { username } });
    if (userExist) {
        throw new Error('Usuário já existe.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return User.create({ username, password: hashedPassword });
};

export const login = async (username, password) => {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('Credenciais inválidas.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Credenciais inválidas.');

    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );
};