/* import { Before, setDefaultTimeout } from ('@wdio/cucumber-framework');
import RegisterPage from '../pageObjects/p1_register.page.js';
import LoginPage from '../pageObjects/p2_login.page.js';
import DataGenerator from '../utils/DataGenerator.js';

setDefaultTimeout(60000);

Before({ tags: '@requiresUserLoggedIn' }, async function () {
    const registerPage = new RegisterPage();
    const loginPage = new LoginPage();

    try {
        // Generate unique data for each test
        this.testUser = await dataGenerator.generateUniqueUserData();

        console.log(`Datos generados para: ${this.testUser.email}`);

        // Uses existing methods
        await loginPage.openLoginPage();
        await loginPage.openCustomerRegistration();
        await registerPage.fillRegistrationForm(this.testUser);
        await registerPage.submit(); // It's redirected to Login page

        // Login
        await loginPage.login(this.testUser.email, this.testUser.password);
        await loginPage.submitLogin();

        console.log(`Login exitoso para: ${this.testUser.email}`);
    } catch (error) {
        console.error('Error en el setup de usuario:', error);
        throw error;
    }
}); */