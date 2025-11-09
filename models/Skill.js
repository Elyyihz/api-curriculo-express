export default (sequelize, DataTypes) => {
    return sequelize.define('Skill', {
        name: {type: DataTypes.STRING, allowNull: false},
        category: DataTypes.STRING,
    });
};