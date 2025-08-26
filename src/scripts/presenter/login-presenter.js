import LoginView from '../view/login-view.js';
import AuthModel from '../model/auth-model.js';

    const LoginPresenter = {
    async init(container) {
        await LoginView.render(container);
        LoginView.bindLogin(this.handleLogin.bind(this));

        // Jika sudah pernah login dan sedang offline, langsung redirect ke home
        if (!navigator.onLine && AuthModel.isLoggedIn()) {
        LoginView.showAlert('Anda sedang offline, masuk menggunakan data tersimpan.');
        LoginView.navigateTo('#/home');
        }
    },

    async handleLogin({ email, password }) {
        try {
        await AuthModel.login(email, password);

        // Tampilkan peringatan jika dalam kondisi offline
        if (!navigator.onLine) {
            LoginView.showAlert('Login offline berhasil. Anda menggunakan data yang tersimpan.');
        }

        LoginView.navigateTo('#/home');
        } catch (err) {
        LoginView.showError(err.message);
        }
    },
};

export default LoginPresenter;
