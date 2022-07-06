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
import { adminAddStaffPage } from "../../cypress/pageObject/admin/adminAddStaffPage";
import { adminAuthorizeUserPage } from "../../cypress/pageObject/admin/adminAuthorizeUserPage";
import { adminStaffsListPage } from "../../cypress/pageObject/admin/adminStaffsListPage";
import { common } from "../../cypress/pageObject/admin/common";

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

Cypress.Commands.add("adminLogin", (username, password) => {
  const ENDPOINT = Cypress.env("admin_login");
  cy.visit(ENDPOINT);

  adminLoginPage.typeUsername(username).typePassword(password).clickLogin();
});

Cypress.Commands.add("addStaff", (staff) => {
  cy.visit(common.LNK_ADD_STAFF).wait(200);
  adminAddStaffPage
    .typeName(staff.name)
    .typeEmail(staff.email)
    .typeUsername(staff.username)
    .typePhone(staff.phone)
    .typeSalary(staff.salary)
    .uploadAvatar(staff.avatar)
    .typeStaffPassword(staff.password)
    .typeRewriteStaffPassword(staff.re_password)
    .typeAdminPassword(Cypress.env("pass_admin"))
    .clickAddNewStaff();
  cy.wait(500);
});

Cypress.Commands.add("deleteStaff", (staff) => {
  cy.contains(staff.name).scrollIntoView();
  adminStaffsListPage.clickDeleteStaff(staff).clickConfirmDetele();
  cy.wait(500);
});

Cypress.Commands.add("authorizeStaff", (staff) => {
  cy.visit(common.LNK_AUTHORIZATION);
  adminAuthorizeUserPage
    .selectStaff(staff)
    .authorizeMultipleRightFor(staff)
    .typePassword(Cypress.env("pass_admin"))
    .clickUpdate();
  cy.wait(500);
});
