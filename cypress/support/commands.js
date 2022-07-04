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
import { modalDialog } from "../../cypress/pageObject/share/common-modal-dialog";
import { adminLoginPage } from "../../cypress/pageObject/admin/adminLoginPage";

Cypress.Commands.add("logout", () => {
  modalDialog.clickLogout();
});

Cypress.Commands.add("login", () => {
  const ENDPOINT = Cypress.env("login");
  cy.visit(ENDPOINT);

  modalDialog
    .typeUsername(Cypress.env("user_customer"))
    .typePassword(Cypress.env("pass_customer"))
    .clickLogin();
});

Cypress.Commands.add("login", (username, password) => {
  const ENDPOINT = Cypress.env("admin_login");
  cy.visit(ENDPOINT);

  adminLoginPage.typeUsername(username).typePassword(password).clickLogin();
});

Cypress.Commands.add("shouldShow", (value) => {
  let TXT_MESSAGE = `//*[contains(text(),'${value}')]`;
  cy.xpath(TXT_MESSAGE).should("be.visible");
});
