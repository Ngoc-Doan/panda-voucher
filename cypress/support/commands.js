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
import { adminEditStaffPage } from "../../cypress/pageObject/admin/adminEditStaffPage";
import { common } from "../../cypress/pageObject/admin/common";

Cypress.Commands.add("logout", () => {
  modalDialog.clickLogout();
});

Cypress.Commands.add("logoutByLink", () => {
  cy.visit(common.LNK_LOGOUT);
  cy.url().should("include", Cypress.env("admin_login"));
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
  cy.wait(1000);
});

Cypress.Commands.add("editStaff", (oldStaff, newStaff) => {
  cy.contains(oldStaff.name).scrollIntoView();
  adminStaffsListPage.clickEditStaff(oldStaff);
  cy.url().should("include", "/edit-user");

  adminEditStaffPage
    .typeEmail(newStaff.email)
    .typeName(newStaff.name)
    .typeURL(newStaff.url)
    .typeAddress(newStaff.address)
    .typePostalCode(newStaff.postalCode)
    .typeSalary(newStaff.salary)
    .typeCity(newStaff.city)
    .typeDistrict(newStaff.district)
    .typePhone(newStaff.phone)
    .typeDescription(newStaff.description)
    .typeAdminPassword(Cypress.env("pass_admin"))
    .clickUpdateStaff();
  cy.wait(1000);
});

Cypress.Commands.add("authorizeStaff", (staff) => {
  cy.visit(common.LNK_AUTHORIZATION);

  if (staff.right.length == 0) {
    cy.log("Không có quyển nào hết");
    cy.visit(common.LNK_STAFF);
  } else {
    adminAuthorizeUserPage
      .selectStaff(staff)
      .authorizeMultipleRightFor(staff)
      .typePassword(Cypress.env("pass_admin"))
      .clickUpdate();
    cy.wait(500);
  }
});
