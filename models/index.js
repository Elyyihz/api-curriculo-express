import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

import userModel from './User.js';
import profileModel from './Profile.js';
import experienceModel from './Experience.js';
import educationModel from './Education.js';
import projectModel from './Project.js';
import skillModel from './Skill.js';

dotenv.config();

if (!process.env.DATABASE_URL) {
    console.error("❌ ERRO: DATABASE_URL não encontrada no .env");
    process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: require('pg'),
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
        keepAlive: true,
    },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = userModel(sequelize, DataTypes);
db.Profile = profileModel(sequelize, DataTypes);
db.Experience = experienceModel(sequelize, DataTypes);
db.Education = educationModel(sequelize, DataTypes);
db.Project = projectModel(sequelize, DataTypes);
db.Skill = skillModel(sequelize, DataTypes);


db.User.hasOne(db.Profile, { foreignKey: { name: 'userId', allowNull: false } });
db.Profile.belongsTo(db.User, { foreignKey: { name: 'userId', allowNull: false } });

db.Profile.hasMany(db.Experience, { foreignKey: { name: 'profileId', allowNull: false }, onDelete: 'CASCADE' });
db.Experience.belongsTo(db.Profile, { foreignKey: { name: 'profileId', allowNull: false } });

db.Profile.hasMany(db.Education, { foreignKey: { name: 'profileId', allowNull: false }, onDelete: 'CASCADE' });
db.Education.belongsTo(db.Profile, { foreignKey: { name: 'profileId', allowNull: false } });

db.Profile.hasMany(db.Project, { foreignKey: { name: 'profileId', allowNull: false }, onDelete: 'CASCADE' });
db.Project.belongsTo(db.Profile, { foreignKey: { name: 'profileId', allowNull: false } });

db.Profile.hasMany(db.Skill, { foreignKey: { name: 'profileId', allowNull: false }, onDelete: 'CASCADE' });
db.Skill.belongsTo(db.Profile, { foreignKey: { name: 'profileId', allowNull: false } });


sequelize.authenticate()
    .then(() => console.log('✅ Conexão com NeonDB estabelecida!'))
    .catch(err => console.error('❌ Falha na conexão NeonDB:', err.message));

export default db;