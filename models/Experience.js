export default (sequelize, DataTypes) => {
    return sequelize.define('Experience', {
        role: {type: DataTypes.STRING, allowNull: false},
        company: {type: DataTypes.STRING, allowNull: false},
        location: DataTypes.STRING,
        start_date: {type: DataTypes.DATEONLY, allowNull: false},
        end_date: DataTypes.DATEONLY,
        description: DataTypes.TEXT,
    });
};