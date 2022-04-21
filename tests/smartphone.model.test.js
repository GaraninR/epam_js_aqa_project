const SmartPhone = require('../models/smartphone.model');

describe('Smoke tests for SmartPhone', () => {
    test('Calling with valid number ', () => {
        const smtph = new SmartPhone('MPX200', '1080x1920');
        const phoneNumber = '+380973855262';
        expect(smtph.callToNumber(phoneNumber)).toBe('Calling to number +380973855262');
    });
    test('Calling with invalid number ', () => {
        const smtph = new SmartPhone('MPX200', '1080x1920');
        const phoneNumber = '48658745456';
        expect(smtph.callToNumber(phoneNumber)).toBe('Invalid number!');
    });

    test('Failed test ', () => {
        expect(true).toBe(true);
    });
});