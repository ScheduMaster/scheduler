import Cookies from 'js-cookie';

export class JwtInterceptor {
  constructor() {
    this.fetchInterceptor = this.fetchInterceptor.bind(this);
  }

  fetchInterceptor(url, options) {
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
          const res = await fetch(`${process.env.REACT_APP_SERVER}/auth/refresh-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: Cookies.get('refreshToken') }),
          });
          const data = await res.json();

          Cookies.set('accessToken', data?.access?.token, { expires: new Date(data?.access?.expires) });

          const newOptions = { ...options };
          newOptions.headers.Authorization = `bearer ${data?.access?.token}`;

          return this.fetchInterceptor(url, newOptions);
        } catch (error) {
          return Promise.reject(error);
        }
      } else {
        return response;
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

  logout() {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    window.location.href = '/login';
  }
}