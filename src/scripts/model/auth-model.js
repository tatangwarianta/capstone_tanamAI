const AuthModel = {
    async login(email, password) {
        // ⛔ Cek offline dan cocokkan data yang disimpan
        if (!navigator.onLine) {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');

        // Login offline hanya jika data cocok
        if (
            email === storedEmail &&
            password === storedPassword &&
            token &&
            name
        ) {
            console.log('[AuthModel] Login offline berhasil');
            return {
            loginResult: { token, name }
            };
        } else {
            throw new Error('Tidak dapat login saat offline. Silakan login saat online terlebih dahulu.');
        }
        }

        // ✅ Proses login online
        const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok || data.error) {
        throw new Error(data.message || 'Login gagal.');
        }

        // 🗂️ Simpan untuk login offline selanjutnya (tidak aman, hanya untuk simulasi)
        localStorage.setItem('token', data.loginResult.token);
        localStorage.setItem('name', data.loginResult.name);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        return data;
    },

    async register(name, email, password) {
        const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok || data.error) {
        throw new Error(data.message || 'Registrasi gagal.');
        }

        return data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
    },

    getToken() {
        return localStorage.getItem('token');
    },

    getUserName() {
        return localStorage.getItem('name');
    },

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }
};

export default AuthModel;
