import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import db from './models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ OBRIGATÓRIO para ler o req.body (para o "name")
app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Algo deu errado no servidor!' });
});

db.sequelize.sync({ force: false }).then(() => {
    console.log('✅ Banco de dados sincronizado.');
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('❌ Erro ao sincronizar banco de dados:', err);
});