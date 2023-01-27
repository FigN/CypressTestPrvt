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

import { formLocators } from '../e2e/locators/evolution'

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

Cypress.Commands.add('submitForm', (button = formLocators.submit) => {
    cy.recaptchaCallback();
    cy.get(button).click();
});
