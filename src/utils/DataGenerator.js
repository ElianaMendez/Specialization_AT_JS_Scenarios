import { faker } from '@faker-js/faker';

class DataGenerator {
    async generateUniqueUserData() {
        const firstName = 'John';
        const lastName = 'Doe';

        const uniqueEmail = faker.internet.email({
            firstName: firstName,
            lastName: lastName,
            provider: 'test-qa.com',
        })
        //const timestamp = Date.now();
        //const random = Math.floor(Math.random() * 100);
        return {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '1985-02-01',
            street: 'calle 30',
            postalCode: '12005',
            city: 'Fantastica',
            state: 'Bolívar',
            country: 'CO',
            phone: '123456789',
            email: uniqueEmail,
            password: 'John017*.',
        };
    }
}


export default new DataGenerator();
