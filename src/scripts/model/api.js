import CONFIG from '../config.js';

const Api = {
  async login(email, password) {
    const res = await fetch(`${CONFIG.BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  async register(name, email, password) {
    const res = await fetch(`${CONFIG.BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return res.json();
  },

  async getStories(token) {
    const res = await fetch(`${CONFIG.BASE_URL}/stories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  async uploadStory(formData, token) {
    const res = await fetch(`${CONFIG.BASE_URL}/poststories`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    return res.json();
  },

  logout() {
    localStorage.removeItem('token');
  }
};

export default Api;
