import db from '../models/index.js';

export const getProfile = async (userId) => {
    const { Profile } = db;
    return Profile.findOne({ where: { userId } });
};

export const createProfile = async (userId, data) => {
    const { Profile } = db;

    // Verifica se o usuário já possui perfil
    const existing = await Profile.findOne({ where: { userId } });
    if (existing) {
        throw new Error('Este usuário já possui um perfil. Use PUT para atualizar.');
    }

    // Garante que o campo obrigatório esteja presente
    if (!data.name) {
        throw new Error('O campo "name" é obrigatório.');
    }

    // Cria o perfil com o userId associado
    return Profile.create({
        ...data,
        userId
    });
};

export const updateProfile = async (userId, data) => {
    const { Profile } = db;

    const [updated] = await Profile.update(data, { where: { userId } });
    if (updated) {
        return Profile.findOne({ where: { userId } });
    }
    throw new Error('Perfil não encontrado para atualização.');
};

export const deleteProfile = async (userId) => {
    const { Profile } = db;

    const deleted = await Profile.destroy({ where: { userId } });
    if (!deleted) {
        throw new Error('Perfil não encontrado para exclusão.');
    }
};
