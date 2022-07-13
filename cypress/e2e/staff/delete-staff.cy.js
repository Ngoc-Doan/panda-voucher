import { adminAddStaffPage } from "../../pageObject/admin/adminAddStaffPage";
import { adminStaffsListPage } from "../../pageObject/admin/adminStaffsListPage";
import { adminEditStaffPage } from "../../pageObject/admin/adminEditStaffPage";
import { common } from "../../pageObject/admin/common";
require("cypress-xpath");

describe("Admin - Delete staff", () => {
  beforeEach(() => {
    cy.fixture("staff.json").as("staff");
    cy.fixture("user.json").as("user");

    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
    cy.url().should("include", "/admin/dashboard");
  });

  it("Verify that Admin (full-control) edit staff successfully", () => {
    cy.get("@staff").then((staff) => {
      cy.visit(common.LNK_STAFF).wait(200);

      cy.addStaff(staff.delete[0]);
      cy.url().should("include", common.LNK_STAFF);

      cy.contains(staff.delete[0].name).scrollIntoView();
      adminStaffsListPage
        .clickDeleteStaff(staff.delete[0])
        .clickConfirmDetele()
        .shouldNotExist(staff.delete[0].name);

      cy.logoutByLink()
        .adminLogin(staff.delete[0].username, staff.delete[0].password)
        .then(() => {
          cy.get("a.message-alert-error").should("be.visible");
          cy.url().should("include", Cypress.env("admin_login"));
        });
    });
  });

  it("Verify that deleting staft unsuccessfully when confirming to cancel", () => {
    cy.get("@user").then((user) => {
      //steps
      cy.visit(common.LNK_STAFF).wait(200);
      cy.contains(user.authentication[2].name).scrollIntoView();
      adminStaffsListPage.clickDeleteStaff(staff.delete[0]).clickClose();
      //verify
      cy.contains(user.authentication[2].name).should("be.visible");
    });
  });
});
