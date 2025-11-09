export default (sequelize, DataTypes) => {
    return sequelize.define('Education', {
        institution: {type: DataTypes.STRING, allowNull: false},
        degree: {type: DataTypes.STRING, allowNull: false},
        field_of_study: DataTypes.STRING,
        start_date: DataTypes.DATEONLY,
        end_date: DataTypes.DATEONLY,
    });
};