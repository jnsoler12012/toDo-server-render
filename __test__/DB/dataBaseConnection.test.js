import { Sequelize } from 'sequelize';

jest.mock('sequelize', () => {
    const mSequelize = {
        authenticate: jest.fn(),
        define: jest.fn(),
    };
    const actualSequelize = jest.requireActual('sequelize');
    return { Sequelize: jest.fn(() => mSequelize), DataTypes: actualSequelize.DataTypes };
});

describe('Postgres DB Connection', () => {


    beforeEach(() => {
        Sequelize.mockClear();
    });

    it("exports an instance of sequelize", () => {
        expect(Sequelize).not.toHaveBeenCalled();
        const db = require("../../src/api/DB/dataBaseConnection");

        expect(Sequelize).toHaveBeenCalled();
    });
});