import { adminAddStaffPage } from "../../pageObject/admin/adminAddStaffPage";
import { adminStaffsListPage } from "../../pageObject/admin/adminStaffsListPage";
import { adminEditStaffPage } from "../../pageObject/admin/adminEditStaffPage";
import { common } from "../../pageObject/admin/common";
require("cypress-xpath");

describe("Admin - Edit staff", () => {
  beforeEach(() => {
    cy.fixture("staff.json").as("staff");

    cy.log("LOGIN");
    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
    cy.url().should("include", "/admin/dashboard");

    cy.log("ADD NEW STAFF");
    cy.get("@staff").then((staff) => {
      cy.addStaff(staff.edit[0]);
      cy.url().should("include", common.LNK_STAFF);
    });
  });

  it("Verify that Admin (full-control) edit staff successfully", () => {
    cy.get("@staff").then((staff) => {
      cy.visit(common.LNK_STAFF).wait(200);

      cy.contains(staff.edit[0].name).scrollIntoView().should("be.visible");
      adminStaffsListPage.clickEditStaff(staff.edit[0]);
      cy.url().should("include", "/edit-user");

      cy.xpath(adminEditStaffPage.TXT_COMPANY_NAME).should("be.disabled");

      adminEditStaffPage
        .typeEmail(staff.edit[1].email)
        .typeName(staff.edit[1].name)
        .typeURL(staff.edit[1].url)
        .typeAddress(staff.edit[1].address)
        .typePostalCode(staff.edit[1].postalCode)
        .typeSalary(staff.edit[1].salary)
        .typeCity(staff.edit[1].city)
        .typeDistrict(staff.edit[1].district)
        .typePhone(staff.edit[1].phone)
        .typeDescription(staff.edit[1].description)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickUpdateStaff();
      cy.wait(1000);

      cy.visit(common.LNK_STAFF).wait(200).deleteStaff(staff.edit[1]);
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
