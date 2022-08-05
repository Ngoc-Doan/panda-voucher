import { adminStaffsListPage } from "../../pageObject/admin/adminStaffsListPage";
import { adminAuthorizeUserPage } from "../../pageObject/admin/adminAuthorizeUserPage";

import { common } from "../../pageObject/admin/common";
require("cypress-xpath");

describe("Admin - Authorize staff", () => {
  beforeEach(() => {
    cy.fixture("staff.json").as("staff");
    cy.fixture("user.json").as("user");

    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"))
      .url()
      .should("include", common.LNK_DASHBOARD);
  });

  it("Verify that Admin (full-control) can add new staff successfully", () => {
    cy.get("@staff").then((staff) => {
      cy.url().should("include", "/admin/dashboard");

      cy.addStaff(staff.add[5]).then(() => {
        cy.url().should("include", common.LNK_STAFF);
        cy.contains(staff.add[5].name)
          .scrollIntoView()
          .should("be.visible")
          .authorizeStaff(staff.add[5]);

        // Original steps of authorizeStaff

        // cy.visit(common.LNK_AUTHORIZATION);
        // adminAuthorizeUserPage
        //   .selectStaff(staff.add[5])
        //   .authorizeMultipleRightFor(staff.add[5])
        //   .typePassword(Cypress.env("pass_admin"))
        //   .clickUpdate();

        adminAuthorizeUserPage.showCorrectRights(staff.add[5]);

        cy.deleteStaff(staff.add[5]);
      });
    });
  });

  it("Verify that Admin HR (manage staff-client) user is authorized to manage user ", () => {
    cy.get("@staff").then((staff) => {
      //prepare test data
      cy.addStaff(staff.add[0]).wait(5000);
      cy.wait(5000).url().should("include", common.LNK_STAFF);

      // steps
      cy.contains(staff.add[0].name)
        .scrollIntoView()
        .should("be.visible")
        .authorizeStaff(staff.add[0]);

      // verify authorized correct rights
      adminAuthorizeUserPage.showCorrectRights(staff.add[0]);

      cy.logoutByLink();
      // verify account can access authorized rights
      cy.adminLogin(staff.add[0].username, staff.add[0].password);
      cy.url()
        .should("include", common.LNK_EDIT_USER)
        .visit(common.LNK_AUTHORIZATION)
        .contains("Phân quyền nhân viên")
        .visit(common.LNK_STAFF)
        .contains("Thông tin cơ bản của nhân viên")
        .visit(common.LNK_CUSTOMER)
        .contains("Danh sách tài khoản khách hàng")
        .visit(common.LNK_ADD_STAFF)
        .contains("Thêm nhân viên mới")
        .visit(common.LNK_EDIT_USER)
        .contains("Hoàn thành thông tin của bạn")
        .visit(common.LNK_CHANGE_PASSWORD)
        .contains("Thay đổi mật khẩu người dùng");

      // clean up
      cy.wait(500)
        .logoutByLink()
        .adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"))
        .url()
        .should("include", common.LNK_DASHBOARD)
        .visit(common.LNK_STAFF)
        .deleteStaff(staff.add[0]);
    });
  });

  it("Verify that Admin (manage voucher) user is authorized to manage voucher ", () => {
    cy.get("@staff").then((staff) => {
      //prepare test data
      cy.addStaff(staff.add[1]);
      cy.wait(5000).url().should("include", common.LNK_STAFF);

      // steps
      cy.contains(staff.add[1].name)
        .scrollIntoView()
        .should("be.visible")
        .authorizeStaff(staff.add[1]);

      // verify authorized correct rights
      adminAuthorizeUserPage.showCorrectRights(staff.add[1]);

      cy.logoutByLink();
      // verify account can access authorized rights
      cy.adminLogin(staff.add[1].username, staff.add[1].password);
      cy.url()
        .should("not.include", Cypress.env("admin_login"))
        .visit(common.LNK_STAFF)
        .contains("Thông tin cơ bản của nhân viên")
        .visit(common.LNK_CUSTOMER)
        .contains("Danh sách tài khoản khách hàng")
        .visit(common.LNK_VOUCHER)
        .url()
        .should("include", common.LNK_VOUCHER)
        .visit(common.LNK_ADD_PRODUCT)
        .contains("Thêm voucher vào shop")
        .visit(common.LNK_ADD_CATEGORY)
        .contains("Thêm các danh mục mới của sản phẩm")
        .visit(common.LNK_ADD_BRAND)
        .contains("Thêm thương hiệu của sản phẩm")
        .visit(common.LNK_EDIT_USER)
        .contains("Hoàn thành thông tin của bạn")
        .visit(common.LNK_CHANGE_PASSWORD)
        .contains("Thay đổi mật khẩu người dùng");

      // clean up
      cy.wait(500)
        .logoutByLink()
        .adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"))
        .url()
        .should("include", common.LNK_DASHBOARD)
        .visit(common.LNK_STAFF)
        .deleteStaff(staff.add[1]);
    });
  });

  it("Verify that Seller user is authorized to access orders ", () => {
    cy.get("@staff").then((staff) => {
      //prepare test data
      cy.addStaff(staff.add[2]);
      cy.url().should("include", common.LNK_STAFF);

      // steps
      cy.contains(staff.add[2].name)
        .scrollIntoView()
        .should("be.visible")
        .authorizeStaff(staff.add[2]);

      // verify authorized correct rights
      adminAuthorizeUserPage.showCorrectRights(staff.add[2]);

      cy.logoutByLink();
      // verify account can access authorized rights
      cy.adminLogin(staff.add[2].username, staff.add[2].password);
      cy.url()
        .should("not.include", Cypress.env("admin_login"))
        .should("include", common.LNK_DASHBOARD)
        .visit(common.LNK_ORDER)
        .url()
        .should("include", common.LNK_ORDER)
        .visit(common.LNK_EDIT_USER)
        .contains("Hoàn thành thông tin của bạn")
        .visit(common.LNK_CHANGE_PASSWORD)
        .contains("Thay đổi mật khẩu người dùng");

      // clean up
      cy.wait(500)
        .logoutByLink()
        .adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"))
        .url()
        .should("include", common.LNK_DASHBOARD)
        .visit(common.LNK_STAFF)
        .deleteStaff(staff.add[2]);
    });
  });

  it("Verify that Admin Seller (manage orders) user is authorized to manage orders ", () => {
    cy.get("@staff").then((staff) => {
      //prepare test data
      cy.addStaff(staff.add[3]);
      cy.url().should("include", common.LNK_STAFF);

      // steps
      cy.contains(staff.add[3].name)
        .scrollIntoView()
        .should("be.visible")
        .authorizeStaff(staff.add[3]);

      // verify authorized correct rights
      adminAuthorizeUserPage.showCorrectRights(staff.add[3]);

      cy.logoutByLink();
      // verify account can access authorized rights
      cy.adminLogin(staff.add[3].username, staff.add[3].password);
      cy.url()
        .should("not.include", Cypress.env("admin_login"))
        .should("include", common.LNK_DASHBOARD)
        .visit(common.LNK_CUSTOMER)
        .contains("Danh sách tài khoản khách hàng")
        .visit(common.LNK_ORDER)
        .url()
        .should("include", common.LNK_ORDER)
        .visit(common.LNK_VOUCHER)
        .url()
        .should("include", common.LNK_VOUCHER)
        .visit(common.LNK_EDIT_USER)
        .contains("Hoàn thành thông tin của bạn")
        .visit(common.LNK_CHANGE_PASSWORD)
        .contains("Thay đổi mật khẩu người dùng");

      // clean up
      cy.wait(500)
        .logoutByLink()
        .adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"))
        .url()
        .should("include", common.LNK_DASHBOARD)
        .visit(common.LNK_STAFF)
        .deleteStaff(staff.add[3]);
    });
  });

  it("Verify that Agent (Contact Center) user is authorized to take care customer's request ", () => {
    cy.get("@staff").then((staff) => {
      //prepare test data
      cy.addStaff(staff.add[4]);
      cy.url().should("include", common.LNK_STAFF);

      // steps
      cy.contains(staff.add[4].name)
        .scrollIntoView()
        .should("be.visible")
        .authorizeStaff(staff.add[4]);

      // verify authorized correct rights
      adminAuthorizeUserPage.showCorrectRights(staff.add[4]);

      cy.logoutByLink();
      // verify account can access authorized rights
      cy.adminLogin(staff.add[4].username, staff.add[4].password);
      cy.url()
        .should("not.include", Cypress.env("admin_login"))
        .visit(common.LNK_SUPPORT)
        .contains("Thông tin cơ bản, hỏi đáp của khách hàng")
        .visit(common.LNK_REVIEWS)
        .contains("Danh sách đánh giá của khách hàng")
        .visit(common.LNK_EDIT_USER)
        .contains("Hoàn thành thông tin của bạn")
        .visit(common.LNK_CHANGE_PASSWORD)
        .contains("Thay đổi mật khẩu người dùng");

      // clean up
      cy.wait(500)
        .logoutByLink()
        .adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"))
        .url()
        .should("include", common.LNK_DASHBOARD)
        .visit(common.LNK_STAFF)
        .deleteStaff(staff.add[4]);
    });
  });

  it("Verify that user is authorized unsuccessfully when missing staff name", () => {
    cy.get("@staff").then((staff) => {
      cy.get("@user").then((user) => {
        // steps
        cy.contains(user.authentication[1].name)
          .scrollIntoView()
          .should("be.visible");
        cy.visit(common.LNK_AUTHORIZATION);
        adminAuthorizeUserPage
          // .selectStaff(staff)
          .selectRight(staff.add[0].right[0])
          .typePassword(Cypress.env("pass_admin"))
          .clickUpdate()
          .shouldShowErrorMessage();
      });
    });
  });

  it("Verify that user is authorized unsuccessfully when missing rights", () => {
    cy.get("@staff").then((staff) => {
      cy.get("@user").then((user) => {
        // steps

        cy.visit(common.LNK_AUTHORIZATION);
        cy.log(user.authentication[2].name);
        adminAuthorizeUserPage
          .selectStaff(user.authentication[2])
          // .selectRight(staff.add[0].right[0])
          .typePassword(Cypress.env("pass_admin"))
          .clickUpdate()
          .shouldShowErrorMessage();
      });
    });
  });

  it("Verify that user is authorized unsuccessfully when missing confirm password", () => {
    cy.get("@staff").then((staff) => {
      cy.get("@user").then((user) => {
        //prepare test data

        // steps
        cy.visit(common.LNK_AUTHORIZATION);
        adminAuthorizeUserPage
          .selectStaff(user.authentication[2])
          .selectRight(staff.add[0].right[0])
          // .typePassword(Cypress.env("pass_admin"))
          .clickUpdate()
          .shouldShowErrorMessage();
      });
    });
  });

  it("Verify the security - New created user does not have the permission to access unauthorized rights ", () => {
    cy.get("@staff").then((staff) => {
      //prepare test data
      cy.addStaff(staff.add[5])
        .url()
        .should("include", common.LNK_STAFF)
        .logoutByLink()
        .wait(500);
      // log into new created account
      cy.adminLogin(staff.add[5].username, staff.add[5].password);

      cy.url()
        .should("not.include", Cypress.env("admin_login"))
        //verify not able to access
        .should("not.include", common.LNK_DASHBOARD)
        .visit(common.LNK_AUTHORIZATION)
        .contains("Phân quyền nhân viên")
        .should("not.exist")
        .visit(common.LNK_STAFF)
        .contains("Thông tin cơ bản của nhân viên")
        .should("not.exist")
        .visit(common.LNK_CUSTOMER)
        .contains("Danh sách tài khoản khách hàng")
        .should("not.exist")
        .visit(common.LNK_ORDER)
        .url()
        .should("not.include", common.LNK_ORDER)
        .visit(common.LNK_VOUCHER)
        .url()
        .should("not.include", common.LNK_VOUCHER)
        .visit(common.LNK_SUPPORT)
        .contains("Thông tin cơ bản, hỏi đáp của khách hàng")
        .should("not.exist")
        .visit(common.LNK_REVIEWS)
        .contains("Danh sách đánh giá của khách hàng")
        .should("not.exist")
        .visit(common.LNK_ADD_STAFF)
        .contains("Thêm nhân viên mới")
        .should("not.exist")
        .visit(common.LNK_ADD_PRODUCT)
        .contains("Thêm voucher vào shop")
        .should("not.exist")
        .visit(common.LNK_ADD_CATEGORY)
        .contains("Thêm các danh mục mới của sản phẩm")
        .should("not.exist")
        .visit(common.LNK_ADD_BRAND)
        .contains("Thêm thương hiệu của sản phẩm")
        .should("not.exist")
        //able to access basic rights
        .visit(common.LNK_EDIT_USER)
        .contains("Hoàn thành thông tin của bạn")
        .visit(common.LNK_CHANGE_PASSWORD)
        .contains("Thay đổi mật khẩu người dùng");

      // clean up
      cy.wait(500)
        .logoutByLink()
        .adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin"))
        .url()
        .should("include", common.LNK_DASHBOARD)
        .visit(common.LNK_STAFF)
        .deleteStaff(staff.add[5]);
    });
  });
});
