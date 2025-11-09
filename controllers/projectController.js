import db from '../models/index.js';
import createCrudService from '../services/crudService.js';

const { Project } = db;
// Ordena projetos pela data de criação (mais novos primeiro)
const service = createCrudService(Project, { order: [['createdAt', 'DESC']] });

export const getAll = async (req, res) => {
    try { res.json(await service.findAll()); }
    catch (err) { res.status(500).json({ error: err.message }); }
};
export const getById = async (req, res) => {
    try {
        const item = await service.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item não encontrado.' });
        res.json(item);
    } catch (err) { res.status(500).json({ error: err.message }); }
};
export const create = async (req, res) => {
    try { res.status(201).json(await service.create(req.body)); }
    catch (err) { res.status(500).json({ error: err.message }); }
};
export const update = async (req, res) => {
    try {
        const item = await service.update(req.params.id, req.body);
        if (!item) return res.status(404).json({ message: 'Item não encontrado.' });
        res.json(item);
    } catch (err) { res.status(500).json({ error: err.message }); }
};
export const remove = async (req, res) => {
    try {
        const deleted = await service.remove(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Item não encontrado.' });
        res.status(204).send();
    } catch (err) { res.status(500).json({ error: err.message }); }
};