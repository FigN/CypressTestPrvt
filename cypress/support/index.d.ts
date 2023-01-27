/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      recaptchaCallback(): Chainable<any>;
      submitForm(button?: string): Chainable<any>;
      validateSpecialCharactersAcceptance(element: string, errorElement: string, acceptedCharacters?: string[], prefix?: string, sufix?: string): Chainable<any>;
      validateNumbersAcceptance(element: string, errorElement: string, accepted: boolean, len?: number, prefix?: string, sufix?: string): Chainable<any>;
      validateTextAcceptance(element: string, errorElement: string, accepted: boolean, len?: number, prefix?: string, sufix?: string): Chainable<any>;
      validateRequiredInput(element: string, errorElement: string): Chainable<any>;
      validatePhoneInput(element: string, errorElement: string, minLen: number): Chainable<any>;
    }
}
