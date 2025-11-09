export default (sequelize, DataTypes) => {
    return sequelize.define('Project', {
        title: {type: DataTypes.STRING, allowNull: false},
        description: DataTypes.TEXT,
        repo_url: DataTypes.STRING,
        live_url: DataTypes.STRING,
        technologies: DataTypes.ARRAY(DataTypes.STRING),
    });
};