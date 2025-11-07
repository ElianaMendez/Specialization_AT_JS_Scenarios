import axios from 'axios';

class LoginPage {
  get loginTitle() { return $('//h3[text()="Login"]') }
  get inputEmail() { return $('#email'); }
  get inputPassword() { return $('#password'); }
  get btnLogin() { return $('input.btnSubmit'); }
  get btnRegisterAccount() { return $('[data-test="register-link"]'); }

  async openLoginPage() {
    await browser.url('auth/login');
  }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
  }

  async submitLogin() {
    await this.btnLogin.click();
  }

  async openCustomerRegistration() {
    await this.btnRegisterAccount.waitForClickable({ timeout: 10000 });
    await this.btnRegisterAccount.click();
  }

  async registerNewUser(userData) {
    const url = `https://api.practicesoftwaretesting.com/users/register`;
    const postData = {
      "first_name": userData.firstName,
      "last_name": userData.lastName,
      "dob": userData.dateOfBirth,
      "phone": userData.phone,
      "email": userData.email,
      "password": userData.password,
      "address": {
        "street": userData.street,
        "city": userData.city,
        "state": userData.state,
        "country": "CO",
        "postal_code": userData.postalCode
      }
    };
    ////////////////////////
    ///////////POST
    const config = {
      headers: {
        // Es crucial especificar que estamos enviando JSON
        'Content-Type': 'application/json',
        // Puedes añadir aquí otras cabeceras como 'Authorization'
      }
    };

    console.log(`Sending POST request to: ${url}`);
    console.log('Payload:', postData);

    try {
      // 2. Ejecución de la solicitud POST
      // axios.post(url, data, [config])
      const response = await axios.post(url, postData, config);

      // 3. Manejo de respuesta exitosa (código 2xx)
      console.log(`Response Status: ${response.status}`);
      console.log('Response Data:', response.data);

      // Retornamos el objeto de respuesta completo
      return response;

    } catch (error) {
      // 4. Manejo de errores
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx (ej: 400, 500)
        console.error(`Error: Server responded with status ${error.response.status}`);
        console.error('Error Data:', error.response.data);
        return error.response;
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta (ej: error de red, timeout)
        console.error('Error: No response received from server.');
      } else {
        // Algo más causó el error (ej: error en la configuración de la solicitud)
        console.error('Error:', error.message);
      }
      // Lanzamos el error de nuevo o retornamos un objeto de error para manejo posterior
      throw error;
    }
    //////////////////////////////
  }
}

export default new LoginPage();
