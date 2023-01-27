// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="./" />

import { formLocators } from '../e2e/locators/evolution'
import { randomString } from './utils'

Cypress.Commands.add('recaptchaCallback', () => {
    cy.window().then((win) => {
        let functionCalled = true;
        try {
            win.recaptchaCallback();
            cy.log('Captcha passed successfully');
        } catch (error) {
            cy.log('Could not pass the captcha');
            functionCalled = false;
        }
        expect(functionCalled).to.be.true;
    });
});

Cypress.Commands.add('submitForm', (button = formLocators.submit, doRecaptcha = true) => {
    if (doRecaptcha) { cy.recaptchaCallback(); }
    cy.get(button).click();
});

Cypress.Commands.add(
    'validateSpecialCharactersAcceptance',
    (element, errorElement, acceptedCharacters = [], prefix = 'Testing ', sufix = ' character') => {
        let specialCharacters = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');
        if (specialCharacters.length > 0 && specialCharacters[0] == 'all') {
            acceptedCharacters = specialCharacters;
        }
        for (let c of specialCharacters) {
            cy.get(element, {log: false})
                .clear({log: false})
                .type(prefix + c + sufix, {log: false, delay: 0});
            let assertion = acceptedCharacters.includes(c) ? 'not.be.visible' : 'be.visible';
            cy.get(errorElement, {log: false}).should(assertion);
            cy.get(element, {log: false}).clear({log: false});
        }
    }
);

Cypress.Commands.add(
    'validateNumbersAcceptance',
    (element, errorElement, accepted, len = 5, prefix = '', suffix = '') => {
        let n = randomString(len, '#');
        cy.get(element, {log: false})
            .clear({log: false})
            .type(prefix + n + suffix, {log: false, delay: 0});
        let assertion = accepted ? 'not.be.visible' : 'be.visible';
        cy.get(errorElement, {log: false}).should(assertion);
        cy.get(element, {log: false}).clear({log: false});
    }
);

Cypress.Commands.add(
    'validateTextAcceptance',
    (element, errorElement, accepted, len = 5, prefix = '', suffix = '') => {
        let t = randomString(len);
        cy.get(element, {log: false})
            .clear({log: false})
            .type(prefix + t + suffix, {log: false, delay: 0});
        let assertion = accepted ? 'not.be.visible' : 'be.visible';
        cy.get(errorElement, {log: false}).should(assertion);
        cy.get(element, {log: false}).clear({log: false});
    }
);

Cypress.Commands.add(
    'validateRequiredInput',
    (element, errorElement) => {
        cy.get(element).clear().then(() => {
            cy.get(errorElement).should('be.visible');
        });
    }
);

Cypress.Commands.add(
    'validatePhoneInput',
    (element, errorElement, minLen) => {
        cy.log('No text should be allowed');
        cy.validateTextAcceptance(element, errorElement, false);
        cy.log('No special characters should be allowed');
        cy.validateSpecialCharactersAcceptance(element, errorElement, [], randomString(minLen - 1), '');
        cy.log('Testing valid phone length');
        cy.validateNumbersAcceptance(element, errorElement, true, minLen);
        cy.log('Testing invalid phone length: short phone number');
        if (minLen > 1) {
            cy.validateNumbersAcceptance(element, errorElement, false, minLen - 1);
        } else {
            cy.validateRequiredInput(element, errorElement);
        }
    }
);
