import RegisterView from '../view/register-view.js';
import AuthModel from '../model/auth-model.js';

const RegisterPresenter = {
    async init(container) {
        await RegisterView.render(container);
        RegisterView.bindRegister(this.handleRegister.bind(this));
    },

    async handleRegister({ name, email, password }) {
        try {
            await AuthModel.register(name, email, password);
            RegisterView.showMessage('Registrasi berhasil, silakan login');
            RegisterView.navigateTo('#/login'); // Ganti manipulasi langsung
        } catch (err) {
            RegisterView.showError('Gagal registrasi: ' + err.message);
        }
    }
};

export default RegisterPresenter;
