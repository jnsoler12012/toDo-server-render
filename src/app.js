import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { notFound } from './middleware.js';
import dataBaseConnection from './api/DB/dataBaseConnection.js';


const defineRelations = () => {

}

const app = express();

try {
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(cors());
    app.use(json());

    app.get('/', async (req, res) => {
        const [result, data] = await dataBaseConnection.query('SELECT NOW()')
        res.json({
            message: 'Deberia cambiar carajo',
            other: result[0]?.now
        });
    });

    app.use(notFound);

    await dataBaseConnection
        .authenticate()
        .then(async () => {
            defineRelations()
            await dataBaseConnection.sync({ force: false })
        })
        .catch((err) => {
            console.error(err);
        })

} catch (error) {
    console.log(error);

}

export default app
