/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      recaptchaCallback(): Chainable<any>;
      submitForm(button?: string): Chainable<any>;
    }
}
