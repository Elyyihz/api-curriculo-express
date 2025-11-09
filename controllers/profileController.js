import * as profileService from '../services/profileService.js';

// GET /api/profile (Obtém o MEU perfil)
export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await profileService.getProfile(userId);

        if (!profile) {
            return res.status(404).json({ message: 'Perfil não encontrado.' });
        }

        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /api/profile (Cria o MEU perfil)
export const createProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = req.body;

        const newProfile = await profileService.createProfile(userId, data);
        res.status(201).json(newProfile);
    } catch (err) {
        if (err.message.includes('já possui um perfil')) {
            return res.status(400).json({ message: err.message });
        }
        res.status(400).json({ error: err.message });
    }
};

// PUT /api/profile (Atualiza o MEU perfil)
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = req.body;

        const updatedProfile = await profileService.updateProfile(userId, data);
        res.json(updatedProfile);
    } catch (err) {
        if (err.message.includes('não encontrado')) {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ error: err.message });
    }
};

// DELETE /api/profile (Apaga o MEU perfil)
export const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        await profileService.deleteProfile(userId);
        res.status(204).send();
    } catch (err) {
        if (err.message.includes('não encontrado')) {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ error: err.message });
    }
};
