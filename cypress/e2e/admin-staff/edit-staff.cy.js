import { adminAddStaffPage } from "../../pageObject/admin/adminAddStaffPage";
import { adminStaffsListPage } from "../../pageObject/admin/adminStaffsListPage";
import { adminEditStaffPage } from "../../pageObject/admin/adminEditStaffPage";
import { common } from "../../pageObject/admin/common";
require("cypress-xpath");

describe("Admin - Edit staff", () => {
  beforeEach(() => {
    cy.fixture("staff.json").as("staff");

    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
    cy.url().should("include", "/admin/dashboard");
  });

  it.only("Verify that Admin (full-control) edit staff successfully", () => {
    cy.get("@staff").then((staff) => {
      cy.addStaff(staff.edit[2]).wait(5000);
      cy.url().should("include", common.LNK_STAFF);

      cy.contains(staff.edit[2].name).scrollIntoView().should("be.visible");
      adminStaffsListPage.clickEditStaff(staff.edit[2]);
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

      cy.contains(staff.edit[1].name).scrollIntoView().should("be.visible");

      cy.visit(common.LNK_STAFF).wait(200).deleteStaff(staff.edit[1]);
    });
  });

  it("Verify that warning message is shown when missing staff Name ", () => {
    cy.get("@staff").then((staff) => {
      cy.visit(common.LNK_STAFF);
      cy.url().should("include", common.LNK_STAFF);

      cy.contains(staff.edit[0].name).scrollIntoView().should("be.visible");
      adminStaffsListPage.clickEditStaff(staff.edit[0]);
      cy.url().should("include", "/edit-user");

      cy.xpath(adminEditStaffPage.TXT_COMPANY_NAME).should("be.disabled");

      adminEditStaffPage
        .typeEmail(staff.edit[1].email)
        .clearName()
        // .typeName(staff.edit[1].name)
        .typeURL(staff.edit[1].url)
        .typeAddress(staff.edit[1].address)
        .typePostalCode(staff.edit[1].postalCode)
        .typeSalary(staff.edit[1].salary)
        .typeCity(staff.edit[1].city)
        .typeDistrict(staff.edit[1].district)
        .typePhone(staff.edit[1].phone)
        .typeDescription(staff.edit[1].description)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickUpdateStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff Social media url", () => {
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
        .clickUpdateStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff Email ", () => {
    cy.get("@staff").then((staff) => {
      cy.visit(common.LNK_STAFF).wait(200);

      cy.contains(staff.edit[0].name).scrollIntoView().should("be.visible");
      adminStaffsListPage.clickEditStaff(staff.edit[0]);
      cy.url().should("include", "/edit-user");

      cy.xpath(adminEditStaffPage.TXT_COMPANY_NAME).should("be.disabled");

      adminEditStaffPage
        .clearEmail()
        // .typeEmail(staff.edit[1].email)
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
        .clickUpdateStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when entering duplicate staff Email", () => {
    cy.get("@staff").then((staff) => {
      cy.visit(common.LNK_STAFF).wait(200);

      cy.contains(staff.edit[0].name).scrollIntoView().should("be.visible");
      adminStaffsListPage.clickEditStaff(staff.edit[0]);
      cy.url().should("include", "/edit-user");

      cy.xpath(adminEditStaffPage.TXT_COMPANY_NAME).should("be.disabled");

      adminEditStaffPage
        // .typeEmail(staff.edit[1].email)
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
        .clickUpdateStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff Phone number ", () => {
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
        .clearPhone()
        // .typePhone(staff.edit[1].phone)
        .typeDescription(staff.edit[1].description)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickUpdateStaff()
        .shouldShowErrorMessage();
    });
  });

  // ISSUE //
  it("Verify that warning message is shown when entering duplicate staff Phone number ", () => {
    throw new Error(
      "[ADMIN-Edit staff] User are able to edit new staff with duplicate phone number"
    );
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
        // .typePhone(staff.edit[1].phone)
        .typeDescription(staff.edit[1].description)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickUpdateStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff Salary ", () => {
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
        .clearSalary()
        // .typeSalary(staff.edit[1].salary)
        .typeCity(staff.edit[1].city)
        .typeDistrict(staff.edit[1].district)
        .typePhone(staff.edit[1].phone)
        .typeDescription(staff.edit[1].description)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickUpdateStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff Postcode", () => {
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
        .clearPostalCode()
        // .typePostalCode(staff.edit[1].postalCode)
        .typeSalary(staff.edit[1].salary)
        .typeCity(staff.edit[1].city)
        .typeDistrict(staff.edit[1].district)
        .typePhone(staff.edit[1].phone)
        .typeDescription(staff.edit[1].description)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickUpdateStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff Address", () => {
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
        .clearAddress()
        // .typeAddress(staff.edit[1].address)
        .typePostalCode(staff.edit[1].postalCode)
        .typeSalary(staff.edit[1].salary)
        .typeCity(staff.edit[1].city)
        .typeDistrict(staff.edit[1].district)
        .typePhone(staff.edit[1].phone)
        .typeDescription(staff.edit[1].description)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickUpdateStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff City", () => {
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
        .clearCity()
        // .typeCity(staff.edit[1].city)
        .typeDistrict(staff.edit[1].district)
        .typePhone(staff.edit[1].phone)
        .typeDescription(staff.edit[1].description)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickUpdateStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff District", () => {
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
        .clearDistrict()
        // .typeDistrict(staff.edit[1].district)
        .typePhone(staff.edit[1].phone)
        .typeDescription(staff.edit[1].description)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickUpdateStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff confirm password", () => {
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
        .clearSalary()
        .typeSalary(staff.edit[1].salary)
        .typeCity(staff.edit[1].city)
        .typeDistrict(staff.edit[1].district)
        .typePhone(staff.edit[1].phone)
        .typeDescription(staff.edit[1].description)
        // .typeAdminPassword(Cypress.env("pass_admin"))
        .clickUpdateStaff()
        .shouldShowErrorMessage();
    });
  });
});
