import Cookies from 'js-cookie';

export class JwtInterceptor {
  constructor() {
    this.fetchInterceptor = this.fetchInterceptor.bind(this);
  }

  async fetchInterceptor(url, options) {
    let token = Cookies.get("accessToken");

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `bearer ${token}`,
      };
    }
    options.credentials = 'include';

    return fetch(url, options).then(async (response) => {
      if (response.status === 401) {
        try {
          const res = await fetch(`${process.env.REACT_APP_SERVER ?? ``}api/auth/refresh-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: Cookies.get('refreshToken') }),
          });
          const data = await res.json();

          Cookies.set('accessToken', data?.accessToken, { expires: new Date(data?.expiresAt) });
          
          if (!options.headers) {
            options.headers = {};
          }
          options.headers.Authorization = `bearer ${data?.accessToken}`;

          return this.fetchInterceptor(url, options);
        } catch (error) {
          return Promise.reject(error);
        }
      } else {
        if (!response.ok) {
          const responseJson = await response.json();
          throw new Error(JSON.stringify(responseJson));
        }
          
        const data = await response.json();
        return data;
      }
    });
  }

  get(url, options = {}) {
    return this.fetchInterceptor(url, { ...options, method: 'GET' });
  }

  post(url, body, options = {}) {
    return this.fetchInterceptor(url, { ...options, method: 'POST', body: JSON.stringify(body) });
  }

  put(url, body, options = {}) {
    return this.fetchInterceptor(url, { ...options, method: 'PUT', body: JSON.stringify(body) });
  }

  patch(url, body, options = {}) {
    return this.fetchInterceptor(url, { ...options, method: 'PATCH', body: JSON.stringify(body) });
  }

  delete(url, options = {}) {
    return this.fetchInterceptor(url, { ...options, method: 'DELETE' });
  }
}