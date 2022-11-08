import axios from 'axios';

// Set config defaults when creating the instance

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

class Api {
  static get(path = '') {
    return client({
      method: 'GET',
      url: path,
    });
  }

  static delete(path = '') {
    return client({
      method: 'DELETE',
      url: path,
    });
  }

  static post(path = '', data = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
    });
  }

  static patch(path = '', data = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data: JSON.stringify(data),
    });
  }

  static put(path = '', data = {}) {
    return client({
      method: 'PUT',
      url: path,
      data,
    });
  }
}
export { Api };