import { adminStaffsListPage } from "../../pageObject/admin/adminStaffsListPage";
import { adminAuthorizeUserPage } from "../../pageObject/admin/adminAuthorizeUserPage";

import { common } from "../../pageObject/admin/common";
require("cypress-xpath");

describe("Admin - Authorize staff", () => {
  beforeEach(() => {
    cy.fixture("staff.json").as("staff");
  });

  it("Verify that Admin (full-control) add new staff successfully", () => {
    cy.get("@staff").then((staff) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(
        500
      );
      cy.url().should("include", "/admin/dashboard");

      cy.authorizeStaff(staff.add[5]);
      // cy.visit(common.LNK_AUTHORIZATION);
      // adminAuthorizeUserPage
      //   .selectStaff(staff.add[5])
      //   .authorizeMultipleRightFor(staff.add[5])
      //   .typePassword(Cypress.env("pass_admin"))
      //   .clickUpdate();

      cy.url().should("include", common.LNK_STAFF);
    });
  });
});
