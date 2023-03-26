import { request } from "./requester";

describe('Test the request function', () => {
    afterEach(() => {
        jest.resetAllMocks();
        localStorage.removeItem('auth');
    });

    test('GET request without accessToken returns response object', async () => {
        const method = 'GET';
        const url = 'https://example.com';
        const data = null;
        const mode = null;
        const expected = { foo: 'bar' };
        const response = { ok: true, status: 200, json: jest.fn(() => expected) };
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(response);

        const result = await request(method, url, data, mode);

        expect(fetchMock).toHaveBeenCalledWith(url, { headers: {} });
        expect(result).toEqual(expected);
    });

    test('GET request with accessToken returns response object', async () => {
        const method = 'GET';
        const url = 'https://example.com';
        const data = null;
        const mode = null;
        const accessToken = 'expired-token';
        localStorage.setItem('auth', JSON.stringify({ accessToken }));
        const expected = { foo: 'bar' };
        const response = { ok: true, status: 200, json: jest.fn(() => expected) };
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(response);

        const result = await request(method, url, data, mode);

        expect(fetchMock).toHaveBeenCalledWith(url, { headers: { 'X-Authorization': accessToken } });
        expect(result).toEqual(expected);
    });

    test('GET request with mode returns response object', async () => {
        const method = 'GET';
        const url = 'https://example.com';
        const data = null;
        const mode = 'cors';
        const expected = { foo: 'bar' };
        const response = { ok: true, status: 200, json: jest.fn(() => expected) };
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(response);

        const result = await request(method, url, data, mode);

        expect(fetchMock).toHaveBeenCalledWith(url, { mode, headers: { 'Content-type': 'application/json' } });
        expect(result).toEqual(expected);
    });

    test('POST request returns response object', async () => {
        const method = 'POST';
        const url = 'https://example.com';
        const data = { title: 'Elantris' };
        const mode = null;
        const accessToken = 'expired-token';
        localStorage.setItem('auth', JSON.stringify({ accessToken }));
        const expected = { foo: 'bar' };
        const response = { ok: true, status: 200, json: jest.fn(() => expected) };
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(response);

        const result = await request(method, url, data, mode);

        expect(fetchMock).toHaveBeenCalledWith(url, {
            method,
            headers: {
                'X-Authorization': accessToken,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        expect(result).toEqual(expected);
    });

    test('PUT request returns response object', async () => {
        const method = 'PUT';
        const url = 'https://example.com';
        const data = { title: 'Elantris' };
        const mode = null;
        const accessToken = 'expired-token';
        localStorage.setItem('auth', JSON.stringify({ accessToken }));
        const expected = { foo: 'bar' };
        const response = { ok: true, status: 200, json: jest.fn(() => expected) };
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(response);

        const result = await request(method, url, data, mode);

        expect(fetchMock).toHaveBeenCalledWith(url, {
            method,
            headers: {
                'X-Authorization': accessToken,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        expect(result).toEqual(expected);
    });

    test('DELETE request returns response object', async () => {
        const method = 'DELETE';
        const url = 'https://example.com';
        const data = null;
        const mode = null;
        const accessToken = 'expired-token';
        localStorage.setItem('auth', JSON.stringify({ accessToken }));
        const expected = { foo: 'bar' };
        const response = { ok: true, status: 200, json: jest.fn(() => expected) };
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(response);

        const result = await request(method, url, data, mode);

        expect(fetchMock).toHaveBeenCalledWith(url, {
            method,
            headers: {
                'X-Authorization': accessToken,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        expect(result).toEqual(expected);
    });

    test('request removes auth object from localStorage when response status code is 403', async () => {
        const method = 'GET';
        const url = 'https://example.com';
        const data = null;
        const mode = null;
        const accessToken = 'expired-token';
        localStorage.setItem('auth', JSON.stringify({ accessToken }));
        const response = { ok: false, status: 403, };
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(response);

        await expect(request(method, url, data, mode)).rejects.toThrow(Error);

        expect(fetchMock).toHaveBeenCalledWith(url, { headers: { 'X-Authorization': accessToken } });
        expect(localStorage.getItem('auth')).toBeNull();
    });

    test('request throws an error when response is not OK', async () => {
        const method = 'GET';
        const url = 'https://example.com';
        const data = null;
        const mode = null;
        const errorMessage = 'Not found';
        const response = { ok: false, status: 404, json: jest.fn(() => ({ message: errorMessage })) };
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(response);

        await expect(request(method, url, data, mode)).rejects.toThrow(errorMessage);

        expect(fetchMock).toHaveBeenCalledWith(url, { headers: {} });
    });

    test('request returns response object with status 204', async () => {
        const method = 'POST';
        const url = 'https://example.com';
        const data = { foo: 'bar' };
        const mode = 'cors';
        const response = { ok: true, status: 204 };
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(response);

        const result = await request(method, url, data, mode);

        expect(fetchMock).toHaveBeenCalledWith(url, {
            method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        expect(result).toEqual(response);
    });
})