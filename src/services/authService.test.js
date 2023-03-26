import * as request from "./requester";
import { login, logout, register } from "./authService";

const baseUrl = 'http://localhost:3030/users';

jest.mock('./requester');

describe('login', () => {
  afterEach(() => {
    jest.resetAllMocks();
    localStorage.removeItem('auth');
  });

  test('login', async () => {
    const email = 'test@example.com';
    const password = 'password';    
    const token = 'testToken';
    const response = { ok: true, json: jest.fn(() => ({ accessToken: token })) };
    request.post.mockResolvedValue(response);
    await login(email, password);

    expect(request.post).toHaveBeenCalledWith(`${baseUrl}/login`, { email, password });    
  });
});

describe('register', () => {
    afterEach(() => {
      jest.resetAllMocks();
      localStorage.removeItem('auth');
    });
  
    test('register', async () => {
      const email = 'test@example.com';
      const password = 'password';    
      const token = 'testToken';
      const response = { ok: true, json: jest.fn(() => ({ accessToken: token })) };
      request.post.mockResolvedValue(response);
      await register(email, password);
  
      expect(request.post).toHaveBeenCalledWith(`${baseUrl}/register`, { email, password });    
    });
  });

describe('logout', () => {
    test('sends a request to the logout endpoint with the access token in the header', async () => {
        const accessToken = '1234567890';
        const mockResponse = { status: 200 };
        const mockFetch = jest.fn().mockResolvedValue(mockResponse);
        global.fetch = mockFetch;

        const response = await logout(accessToken);

        expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        });
        expect(response).toEqual(mockResponse);
    });

    test('logs an error if the request fails', async () => {
        const accessToken = '1234567890';
        const mockError = new Error('Request failed');
        const mockFetch = jest.fn().mockRejectedValue(mockError);
        global.fetch = mockFetch;

        const consoleSpy = jest.spyOn(console, 'log');

        await logout(accessToken);

        expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        });
        expect(consoleSpy).toHaveBeenCalledWith(mockError);
    });
});






