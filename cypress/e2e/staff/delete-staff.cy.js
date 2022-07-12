import { adminAddStaffPage } from "../../pageObject/admin/adminAddStaffPage";
import { adminStaffsListPage } from "../../pageObject/admin/adminStaffsListPage";
import { adminEditStaffPage } from "../../pageObject/admin/adminEditStaffPage";
import { common } from "../../pageObject/admin/common";
require("cypress-xpath");

describe("Admin - Delete staff", () => {
  beforeEach(() => {
    cy.fixture("staff.json").as("staff");

    cy.log("LOGIN");
    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
    cy.url().should("include", "/admin/dashboard");

    cy.log("ADD NEW STAFF");
    cy.get("@staff").then((staff) => {
      cy.addStaff(staff.delete[0]);
      cy.url().should("include", common.LNK_STAFF);
    });
  });

  it.only("Verify that Admin (full-control) edit staff successfully", () => {
    cy.get("@staff").then((staff) => {
      cy.visit(common.LNK_STAFF).wait(200);

      cy.contains(staff.delete[0].name).scrollIntoView();
      adminStaffsListPage
        .clickDeleteStaff(staff.delete[0])
        .clickConfirmDetele();
      cy.wait(1000);

      adminStaffsListPage.shouldNotExist(staff.delete[0].name);
    });
  });

  it("Verify that warning message is shown when missing staff Name ", () => {});
  it("Verify that warning message is shown when missing staff Social media url", () => {});
  it("Verify that warning message is shown when missing staff Email ", () => {});
  it("Verify that warning message is shown when entering duplicate staff Email", () => {});
  it("Verify that warning message is shown when missing staff Phone number ", () => {});
  it("Verify that warning message is shown when entering duplicate staff Phone number ", () => {});
  it("Verify that warning message is shown when missing staff Salary ", () => {});
  it("Verify that warning message is shown when missing staff Postcode", () => {});
  it("Verify that warning message is shown when missing staff Address", () => {});
  it("Verify that warning message is shown when missing staff City", () => {});
  it("Verify that warning message is shown when missing staff District", () => {});
  it("Verify that warning message is shown when missing staff confirm password", () => {});
});
