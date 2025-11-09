export default (sequelize, DataTypes) => {
    return sequelize.define('Profile', {
        name: {
            type: DataTypes.STRING,
            allowNull: false // ✅ Causa o erro "name cannot be null"
        },
        title: DataTypes.STRING,
        bio: DataTypes.TEXT,
        email: DataTypes.STRING,
        linkedin_url: DataTypes.STRING,
        github_url: DataTypes.STRING,
        // 'userId' será adicionado pela associação no index.js
    });
};