import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { notFound } from './middleware.js';
import dataBaseConnection from './api/DB/dataBaseConnection.js';
import { authRouter, categoryRouter, taskRouter, userRouter } from './api/routes/index.js';
import { Category, Task, User } from './api/models/index.js';


const defineRelations = () => {
    const common = (options) => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    User.hasMany(Task, common({ foreignKey: 'userToDoId' }))
    Task.belongsTo(User);


    Category.hasOne(Task, common({ foreignKey: 'categoryId' }))
    Task.belongsTo(Category);


}

var app;

const paths = {
    auth: '/api/auth',
    user: '/api/user',
    category: '/api/category',
    task: '/api/task'
}

app = express();

try {
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(cors());
    app.use(json());

    app.use(paths.auth, authRouter);
    app.use(paths.user, userRouter);
    app.use(paths.category, categoryRouter);
    app.use(paths.task, taskRouter);

    app.get('/', async (req, res) => {
        const [result, data] = await dataBaseConnection.query('SELECT NOW()')
        res.json({
            message: 'API for task manager operations',
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
