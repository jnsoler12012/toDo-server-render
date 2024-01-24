import jwt from 'jsonwebtoken';
import { default as auth } from '../../src/api/routes/auth.js';


// Mock the jsonwebtoken library
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));

describe('auth', () => {
    let request;
    let response;
    let next;

    beforeEach(() => {
        // Initialize request, response, and next for each test
        request = {
            headers: {
                authorization: 'Bearer token123',
            },
        };
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    // Test case 1: Successful authentication
    it('should call next() when authentication is successful', async () => {
        // Mock the behavior of jwt.verify for successful authentication
        jwt.verify.mockReturnValue({ userId: 1, useremail: 'test@example.com' });

        // Call the authenticateMiddleware
        await auth(request, response, next);

        // Assertions
        expect(response.status).not.toHaveBeenCalled();
        expect(response.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(request.user).toEqual({ userId: 1, useremail: 'test@example.com' });
    });

    // Test case 2: Failed authentication
    it('should return a 401 status and error message for failed authentication', async () => {
        // Mock the behavior of jwt.verify for failed authentication
        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        // Call the authenticateMiddleware
        await auth(request, response, next);

        // Assertions
        expect(response.status).toHaveBeenCalledWith(401);

        expect(next).not.toHaveBeenCalled();
        expect(request.user).toBeUndefined();
    });
});