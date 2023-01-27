/// <reference types="cypress" />
/// <reference types="../../../support" />

import { formLocators } from '../../locators/evolution'

// Locators
const loc = {
    ...formLocators,
    ...{
        register: '#register',
        registerError: '#register + ul'
    }
};

describe('Costa Rica - Contact Us Form', () => {
    beforeEach(() => {
        cy.visit('https://www.equifax.co.cr/contactenos');
    });

    it('Has all the specified form fields', () => {
        cy.get(loc.name).should('be.visible');
        cy.get(loc.register).should('be.visible');
        cy.get(loc.lastname).should('be.visible');
        cy.get(loc.company).should('be.visible');
        cy.get(loc.title).should('be.visible');
        cy.get(loc.email).should('be.visible');
        cy.get(loc.phone).should('be.visible');
        cy.get(loc.comments).should('be.visible');
        cy.get(loc.submit).should('be.visible');
        cy.get(loc.cancel).should('be.visible');
    });

    it('Name field should be required and accept only text and underscores', () => {
        cy.submitForm();
        cy.validateRequiredInput(loc.name, loc.nameError);
        cy.validateSpecialCharactersAcceptance(loc.name, loc.nameError, ['_']);
        cy.validateNumbersAcceptance(loc.name, loc.nameError, false);
        cy.validateTextAcceptance(loc.name, loc.nameError, true);
    });

    it('Last Name field should be required and accept only text and underscores', () => {
        cy.submitForm();
        cy.validateRequiredInput(loc.lastname, loc.lastnameError);
        cy.validateSpecialCharactersAcceptance(loc.lastname, loc.lastnameError, ['_']);
        cy.validateNumbersAcceptance(loc.lastname, loc.lastnameError, false);
        cy.validateTextAcceptance(loc.lastname, loc.lastnameError, true);
    });

    it('Company field should be required and accept only text and underscores', () => {
        cy.submitForm();
        cy.validateRequiredInput(loc.company, loc.companyError);
        cy.validateSpecialCharactersAcceptance(loc.company, loc.companyError, ['_']);
        cy.validateNumbersAcceptance(loc.company, loc.companyError, false);
        cy.validateTextAcceptance(loc.company, loc.companyError, true);
    });

    it('Title field should be required and accept only text and underscores', () => {
        cy.submitForm();
        cy.validateRequiredInput(loc.title, loc.titleError);
        cy.validateSpecialCharactersAcceptance(loc.title, loc.titleError, ['_']);
        cy.validateNumbersAcceptance(loc.title, loc.titleError, false);
        cy.validateTextAcceptance(loc.title, loc.titleError, true);
    });

    it('Phone field should be required, accept only numbers with a minimum length of 1', () => {
        cy.submitForm();
        cy.validateRequiredInput(loc.phone, loc.phoneError);
        cy.validatePhoneInput(loc.phone, loc.phoneError, 1);
    });
});
