/// <reference types="cypress" />
/// <reference types="../../../support" />

import { formLocators } from '../../locators/evolution'

// Locators
const loc = {...formLocators, ...{
    register: '#register',
    registerError: '#register + ul'
}};

const validateData = (element: string, errorElement: string, acceptedChars: string[] = []) => {
    let specialCharacters = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');
    let ok: boolean = true;
    for (let c of specialCharacters) {
        cy.get(element, {log: false})
            .clear({log: false})
            .type('Testing ' + c + ' character', {log: false, delay: 0});
        let assertion = acceptedChars.includes(c) ? 'not.be.visible' : 'be.visible';
        cy.get(errorElement, {log: false}).should(assertion);
        cy.get(element, {log: false}).clear({log: false});
    }
};

describe('Costa Rica - Contact Us Form', () => {
    beforeEach(() => {
        // Url to visit
        cy.visit('https://www.equifax.co.cr/contactenos');
    });

    it('Has all the form fields', () => {
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

    it('Should display an error message for all required fields', () => {
        cy.submitForm();
        cy.get(loc.nameError).should('be.visible');
        cy.get(loc.registerError).should('be.visible');
        cy.get(loc.lastnameError).should('be.visible');
        cy.get(loc.companyError).should('be.visible');
        cy.get(loc.titleError).should('be.visible');
        cy.get(loc.emailError).should('be.visible');
        cy.get(loc.phoneError).should('be.visible');
    });

    it('Should accept text and underscores in the Name field', () => {
        cy.submitForm();
        let acceptedCharacters = ['_'];
        validateData(loc.name, loc.nameError, ['_']);
    });

    it('Should accept text and underscores in the Last Name field', () => {
        cy.submitForm();
        validateData(loc.lastname, loc.lastnameError, ['_']);
    });

    it('Should accept text and underscores in the Company field', () => {
        cy.submitForm();
        validateData(loc.company, loc.companyError, ['_']);
    });

    it('Should accept text and underscores in the Title field', () => {
        cy.submitForm();
        validateData(loc.title, loc.titleError, ['_']);
    });
});
