export default (model, options = {}) => {
    const defaultOrder = options.order || [['id', 'ASC']];

    const findAll = () => model.findAll({ order: defaultOrder });
    const findById = (id) => model.findByPk(id);
    const create = (data) => model.create(data);

    const update = async (id, data) => {
        const [updated] = await model.update(data, { where: { id } });
        if (updated) return model.findByPk(id);
        return null;
    };

    const remove = (id) => model.destroy({ where: { id } });

    return { findAll, findById, create, update, remove };
};