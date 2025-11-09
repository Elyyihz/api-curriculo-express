import * as authService from '../services/authService.js';

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await authService.register(username, password);
        res.status(201).json({ message: 'Usuário criado!', userId: newUser.id });
    } catch (err) {
        const status = err.message === 'Usuário já existe.' ? 400 : 500;
        res.status(status).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.json({ token });
    } catch (err) {
        const status = err.message === 'Credenciais inválidas.' ? 401 : 500;
        res.status(status).json({ error: err.message });
    }
};