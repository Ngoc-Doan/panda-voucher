import { adminAddStaffPage } from "../../pageObject/admin/adminAddStaffPage";
import { adminStaffsListPage } from "../../pageObject/admin/adminStaffsListPage";
import { adminLoginPage } from "../../pageObject/admin/adminLoginPage";
import { common } from "../../pageObject/admin/common";
require("cypress-xpath");

describe("Admin - Add new staff", () => {
  beforeEach(() => {
    cy.fixture("staff.json").as("staff");
    cy.fixture("user.json").as("user");
  });

  it("Verify that Admin (full-control) add new staff successfully", () => {
    cy.get("@staff").then((staff) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(
        500
      );
      cy.url().should("include", "/admin/dashboard");

      cy.addStaff(staff.add[0]);
      // cy.visit(common.LNK_ADD_STAFF).wait(200);
      // adminAddStaffPage
      //   .typeName(staff.add[0].name)
      //   .typeEmail(staff.add[0].email)
      //   .typeUsername(staff.add[0].username)
      //   .typePhone(staff.add[0].phone)
      //   .typeSalary(staff.add[0].salary)
      //   .uploadAvatar(staff.add[0].avatar)
      //   .typeStaffPassword(staff.add[0].password)
      //   .typeRewriteStaffPassword(staff.add[0].re_password)
      //   .typeAdminPassword(Cypress.env("pass_admin"))
      //   .clickAddNewStaff();
      cy.wait(10000);

      cy.url().should("include", common.LNK_STAFF);
      cy.contains(staff.add[0].name).scrollIntoView().should("be.visible");

      cy.deleteStaff(staff.add[0]);
    });
  });

  it("Verify that warning message is shown when missing staff Name", () => {
    cy.get("@staff").then((staff) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(
        500
      );
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_ADD_STAFF).wait(200);
      adminAddStaffPage
        //   .typeName(staff.add[0].name)
        .typeEmail(staff.add[0].email)
        .typeUsername(staff.add[0].username)
        .typePhone(staff.add[0].phone)
        .typeSalary(staff.add[0].salary)
        .uploadAvatar(staff.add[0].avatar)
        .typeStaffPassword(staff.add[0].password)
        .typeRewriteStaffPassword(staff.add[0].re_password)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickAddNewStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff Username", () => {
    cy.get("@staff").then((staff) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_ADD_STAFF).wait(200);
      adminAddStaffPage
        .typeName(staff.add[0].name)
        .typeEmail(staff.add[0].email)
        // .typeUsername(staff.add[0].username)
        .typePhone(staff.add[0].phone)
        .typeSalary(staff.add[0].salary)
        .uploadAvatar(staff.add[0].avatar)
        .typeStaffPassword(staff.add[0].password)
        .typeRewriteStaffPassword(staff.add[0].re_password)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickAddNewStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when entering duplicate staff Username", () => {
    cy.get("@user").then((user) => {
      cy.get("@staff").then((staff) => {
        cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
        cy.url().should("include", "/admin/dashboard");

        cy.visit(common.LNK_ADD_STAFF).wait(200);
        adminAddStaffPage
          .typeName(staff.add[0].name)
          .typeEmail(staff.add[0].email)
          .typeUsername(user.authentication[0].username)
          .typePhone(staff.add[0].phone)
          .typeSalary(staff.add[0].salary)
          .uploadAvatar(staff.add[0].avatar)
          .typeStaffPassword(staff.add[0].password)
          .typeRewriteStaffPassword(staff.add[0].re_password)
          .typeAdminPassword(Cypress.env("pass_admin"))
          .clickAddNewStaff()
          .shouldShowErrorMessage();
      });
    });
  });

  it("Verify that warning message is shown when missing staff Email", () => {
    cy.get("@staff").then((staff) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_ADD_STAFF).wait(200);
      adminAddStaffPage
        .typeName(staff.add[0].name)
        // .typeEmail(staff.add[0].email)
        .typeUsername(staff.add[0].username)
        .typePhone(staff.add[0].phone)
        .typeSalary(staff.add[0].salary)
        .uploadAvatar(staff.add[0].avatar)
        .typeStaffPassword(staff.add[0].password)
        .typeRewriteStaffPassword(staff.add[0].re_password)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickAddNewStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when entering duplicate staff Email", () => {
    cy.get("@user").then((user) => {
      cy.get("@staff").then((staff) => {
        cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
        cy.url().should("include", "/admin/dashboard");

        cy.visit(common.LNK_ADD_STAFF).wait(200);
        adminAddStaffPage
          .typeName(staff.add[0].name)
          .typeEmail(user.authentication[0].email)
          .typeUsername(staff.add[0].username)
          .typePhone(staff.add[0].phone)
          .typeSalary(staff.add[0].salary)
          .uploadAvatar(staff.add[0].avatar)
          .typeStaffPassword(staff.add[0].password)
          .typeRewriteStaffPassword(staff.add[0].re_password)
          .typeAdminPassword(Cypress.env("pass_admin"))
          .clickAddNewStaff()
          .shouldShowErrorMessage();
      });
    });
  });

  it("Verify that warning message is shown when missing staff Phone number ", () => {
    cy.get("@staff").then((staff) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_ADD_STAFF).wait(200);
      adminAddStaffPage
        .typeName(staff.add[0].name)
        .typeEmail(staff.add[0].email)
        .typeUsername(staff.add[0].username)
        // .typePhone(staff.add[0].phone)
        .typeSalary(staff.add[0].salary)
        .uploadAvatar(staff.add[0].avatar)
        .typeStaffPassword(staff.add[0].password)
        .typeRewriteStaffPassword(staff.add[0].re_password)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickAddNewStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when entering duplicate staff Phone number", () => {
    throw new Error(
      "[ADMIN-Create new staff] User are able to add new staff with duplicate phone number"
    );
    cy.get("@user").then((user) => {
      cy.get("@staff").then((staff) => {
        cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
        cy.url().should("include", "/admin/dashboard");

        cy.visit(common.LNK_ADD_STAFF).wait(200);
        adminAddStaffPage
          .typeName(staff.add[0].name)
          .typeEmail(staff.add[0].email)
          .typeUsername(staff.add[0].username)
          .typePhone(user.authentication[0].phone)
          .typeSalary(staff.add[0].salary)
          .uploadAvatar(staff.add[0].avatar)
          .typeStaffPassword(staff.add[0].password)
          .typeRewriteStaffPassword(staff.add[0].re_password)
          .typeAdminPassword(Cypress.env("pass_admin"))
          .clickAddNewStaff()
          .shouldShowErrorMessage();

        cy.url().should("include", common.LNK_ADD_STAFF);
      });
    });
  });

  it("Verify that warning message is shown when missing staff Salary", () => {
    cy.get("@staff").then((staff) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_ADD_STAFF).wait(200);
      adminAddStaffPage
        .typeName(staff.add[0].name)
        .typeEmail(staff.add[0].email)
        .typeUsername(staff.add[0].username)
        .typePhone(staff.add[0].phone)
        // .typeSalary(staff.add[0].salary)
        .uploadAvatar(staff.add[0].avatar)
        .typeStaffPassword(staff.add[0].password)
        .typeRewriteStaffPassword(staff.add[0].re_password)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickAddNewStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff Avatar", () => {
    cy.get("@staff").then((staff) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_ADD_STAFF).wait(200);
      adminAddStaffPage
        .typeName(staff.add[0].name)
        .typeEmail(staff.add[0].email)
        .typeUsername(staff.add[0].username)
        .typePhone(staff.add[0].phone)
        .typeSalary(staff.add[0].salary)
        // .uploadAvatar(staff.add[0].avatar)
        .typeStaffPassword(staff.add[0].password)
        .typeRewriteStaffPassword(staff.add[0].re_password)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickAddNewStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff Password", () => {
    cy.get("@staff").then((staff) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_ADD_STAFF).wait(200);
      adminAddStaffPage
        .typeName(staff.add[0].name)
        .typeEmail(staff.add[0].email)
        .typeUsername(staff.add[0].username)
        .typePhone(staff.add[0].phone)
        .typeSalary(staff.add[0].salary)
        .uploadAvatar(staff.add[0].avatar)
        // .typeStaffPassword(staff.add[0].password)
        .typeRewriteStaffPassword(staff.add[0].re_password)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickAddNewStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing staff Re-enter password", () => {
    cy.get("@staff").then((staff) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_ADD_STAFF).wait(200);
      adminAddStaffPage
        .typeName(staff.add[0].name)
        .typeEmail(staff.add[0].email)
        .typeUsername(staff.add[0].username)
        .typePhone(staff.add[0].phone)
        .typeSalary(staff.add[0].salary)
        .uploadAvatar(staff.add[0].avatar)
        .typeStaffPassword(staff.add[0].password)
        // .typeRewriteStaffPassword(staff.add[0].re_password)
        .typeAdminPassword(Cypress.env("pass_admin"))
        .clickAddNewStaff()
        .shouldShowErrorMessage();
    });
  });

  it("Verify that warning message is shown when missing admin's confirmation Password", () => {
    cy.get("@staff").then((staff) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"));
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_ADD_STAFF).wait(200);
      adminAddStaffPage
        .typeName(staff.add[0].name)
        .typeEmail(staff.add[0].email)
        .typeUsername(staff.add[0].username)
        .typePhone(staff.add[0].phone)
        .typeSalary(staff.add[0].salary)
        .uploadAvatar(staff.add[0].avatar)
        .typeStaffPassword(staff.add[0].password)
        .typeRewriteStaffPassword(staff.add[0].re_password)
        // .typeAdminPassword(Cypress.env("pass_admin"))
        .clickAddNewStaff()
        .shouldShowErrorMessage();
    });
  });
});
