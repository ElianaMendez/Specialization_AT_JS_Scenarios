export interface RegistrationData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    street: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

class DataGenerator {
    generateUniqueUserData(): RegistrationData {
        const uniqueEmail = `test-api-${Date.now()}@test-qa.com`;
        return {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '1985-02-01',
            street: 'calle 30',
            postalCode: '12005',
            city: 'Fantastica',
            state: 'Bolívar',
            country: 'Colombia',
            phone: '123456789',
            email: uniqueEmail,
            password: 'John017*.',
        };
    }

    generateInvalidDataToTest(): LoginCredentials {
        const invalidEmail = `test-api-${Date.now()}@test-qa.com`;
        const invalidPassword = `a${Date.now()}`;

        return {
            email: invalidEmail,
            password: invalidPassword,
        }
    }
}


export default new DataGenerator();
