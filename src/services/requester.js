export const request = async (method, url, data, mode) => {
    try {
        const user = localStorage.getItem('auth');
        const auth = JSON.parse(user || '{}');        

        let headers = {};

        if(auth.accessToken && !mode) {
            headers['X-Authorization'] = auth.accessToken;        
        }

        if(mode) {            
            headers['Content-type'] = 'application/json';
        }

        let buildRequest;

        if(method === 'GET' && !mode) {
            buildRequest = fetch(url, {headers});
        } else if(method === 'GET' && mode) {
            buildRequest = fetch(url, {
                mode,
                headers
            });

        } else {
            buildRequest = fetch(url, {
                method,
                headers: {
                    ...headers,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }

        const response = await buildRequest;
        
        if (response.ok === false) {

            if (response.status === 403) {
                localStorage.removeItem('auth');;
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        } else {
            const result = await response.json();
            return result;            
        }        

    } catch (err) {        
        throw err;
    }
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const patch = request.bind(null, 'PATCH');
export const del = request.bind(null, 'DELETE');
