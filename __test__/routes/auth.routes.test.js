import request from 'supertest';
import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import authRouter from '../../src/api/routes/auth.routes';

import { loginUser, signupUser } from '../../src/api/controllers/auth';

jest.mock('./../../src/api/controllers/auth/loginUser', () => jest.fn());
jest.mock('./../../src/api/controllers/auth/signupUser', () => jest.fn());
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(json());
app.use('/api/auth', authRouter);


describe('authRouter endpoints', () => {

    const loginUserMock = loginUser;
    loginUserMock.mockImplementation(async (req, res) => {

        res.status(200).json({ success: true, message: 'Login success' });
    });

    const SignupMock = signupUser
    SignupMock.mockImplementation(async (req, res) => {

        res.status(200).json({ success: true, message: 'User created' });
    });

    console.log(loginUserMock);

    it('should respond with 200 OK for POST /login', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        console.log(response.body);

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({ success: true, message: 'Login success' });
        expect(loginUserMock).toHaveBeenCalledTimes(1)
    });


    // Test case 2: Test the /signup endpoint
    it('should respond with 200 OK for POST /signup', async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({ success: true, message: 'User created' });
        expect(SignupMock).toHaveBeenCalledTimes(1)
    });
});