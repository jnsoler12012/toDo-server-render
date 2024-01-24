import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
var SequelizeMock = require('sequelize-mock');
import { default as dataBaseConnection } from "../../src/api/DB/dataBaseConnection";
import express, { Router, json } from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { signupUser } from "../../src/api/controllers/auth";
import { default as errorController } from "../../src/api/controllers/errorController.js";

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../src/api/models/');
jest.mock('../../src/api/controllers/errorController.js');

const mockDB = new SequelizeMock();


let productId

describe("POST /api/auth/signup", () => {
    let req;
    let res;
    let next;

    const errorControllerMock = errorController;
    errorControllerMock.mockImplementation(async (error, res) => {
        return (error, res)
    });

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        res = express.response
        next = () => next;
    });

    const validUser = {
        email: "testUser@gmail.com",
        password: "password",
    };

    it('should return a successful login response', async () => {
        const mockUser = {
            id: 1,
            email: 'test@example.com',
            password: 'hashedPassword123', // Replace with the actual hashed password
        };

        // Mock the User.findOne method to simulate a valid user
        require('../../src/api/models/').User.findAll.mockResolvedValue([]);

        // Mock bcrypt.compare to simulate a successful password verification
        require('bcrypt').compare.mockResolvedValue(true);

        // Mock jsonwebtoken.sign to simulate token creation
        require('jsonwebtoken').sign.mockReturnValue('mockedToken');

        // Call the loginUser function
        await signupUser(req, res);
        const response =  res
        console.log(req, response, response);

        // Assertions
        expect(response.statusCode).toBe(200);

    });

    // it('should return a successful login response with a token', async () => {
    //     // Mock the User.findOne method to simulate a valid user

    //     require('../../models/index.js').User.findOne.mockResolvedValue(mockUser);


    //     const response = await request(app)
    //         .post("/api/auth/login")
    //         .send(req)

    //     console.log(response.body);
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toStrictEqual({ success: true, message: 'Login success' });

    // });
});