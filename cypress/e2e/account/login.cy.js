import { loginPage } from "../../pageObject/loginPage";
import { adminLoginPage } from "../../pageObject/admin/adminLoginPage";
import { common } from "../../pageObject/admin/common";
require("cypress-xpath");

describe("Login with created account", () => {
  beforeEach(() => {
    cy.fixture("user.json").as("user");

    cy.visit(Cypress.env("login"));
    cy.wait(3000);
  });

  it("Should redirect to main page when login successfully", () => {
    loginPage
      .typeUsername(Cypress.env("user_customer"))
      .typePassword(Cypress.env("pass_customer"))
      .clickLogin();
    cy.url("/");
  });

  it("Should show error message when missing username", () => {
    cy.get("@user").then((user) => {
      loginPage
        .typePassword(user.login[0].password)
        .clickLogin()
        .shouldShowErrorMessage("Vui lòng nhập username");
    });
  });

  it("Should show error message when missing password", () => {
    cy.get("@user").then((user) => {
      loginPage
        .typeUsername(user.login[1].username)
        .clickLogin()
        .shouldShowErrorMessage("Vui lòng nhập mật khẩu");
    });
  });

  /*=== ISSUE ===*/
  it("Should show error message when missing username and password", () => {
    throw new Error(
      "[CLIENT] No error message is shown when login missing username and password"
    );
    loginPage
      .clickLogin()
      .shouldShowErrorMessage("Vui lòng nhập username và password");
  });

  it("Should show error message when invalid username", () => {
    cy.get("@user").then((user) => {
      loginPage
        .typeUsername(user.login[3].username)
        .typePassword(user.login[3].password)
        .clickLogin()
        .shouldShowErrorMessage(
          "Username hoặc password sai, vui lòng nhập lại"
        );
    });
  });

  it("Should show error message when invalid password", () => {
    cy.get("@user").then((user) => {
      loginPage
        .typeUsername(user.login[4].username)
        .typePassword(user.login[4].password)
        .clickLogin()
        .shouldShowErrorMessage(
          "Username hoặc password sai, vui lòng nhập lại"
        );
    });
  });

  it("Should show error message when invalid username and password", () => {
    cy.get("@user").then((user) => {
      loginPage
        .typeUsername(user.login[5].username)
        .typePassword(user.login[5].password)
        .clickLogin()
        .shouldShowErrorMessage(
          "Username hoặc password sai, vui lòng nhập lại"
        );
    });
  });
});

describe("Admin - Authentication", () => {
  beforeEach(() => {
    cy.fixture("user.json").as("user");
  });

  it("Verify that Admin (full-control) user logins successfully when entering the correct Username and Password", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(
        500
      );
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_EDIT_USER).wait(200);
      cy.contains("Đinh Thức").should("be.visible");
    });
  });

  it("Verify that Admin (manage staff-client) user logins successfully when entering the correct Username and Password", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[0].username,
        user.authentication[0].password
      ).wait(500);
      cy.url().should("include", "/admin/user");

      cy.visit(common.LNK_EDIT_USER).wait(200);
      cy.contains(user.authentication[0].name).should("be.visible");
    });
  });

  it("Verify that Admin (manage voucher) user logins successfully when entering the correct Username and Password", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[1].username,
        user.authentication[1].password
      ).wait(500);
      cy.url().should("include", "/admin/user");

      cy.visit(common.LNK_EDIT_USER).wait(200);
      cy.contains(user.authentication[1].name).should("be.visible");
    });
  });

  it("Verify that Seller user logins successfully when entering the correct Username and Password", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[2].username,
        user.authentication[2].password
      ).wait(500);
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_EDIT_USER).wait(200);
      cy.contains(user.authentication[2].name).should("be.visible");
    });
  });

  it("Verify that Admin (manage orders) user logins successfully when entering the correct Username and Password", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[3].username,
        user.authentication[3].password
      ).wait(500);
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_EDIT_USER).wait(200);
      cy.contains(user.authentication[3].name).should("be.visible");
    });
  });

  it("Verify that Agent user logins successfully when entering the correct Username and Password", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[4].username,
        user.authentication[4].password
      ).wait(500);
      cy.url().should("include", "/admin/user");

      cy.visit(common.LNK_EDIT_USER).wait(200);
      cy.contains(user.authentication[4].name).should("be.visible");
    });
  });

  it("Verify that Admin (full-control) user logout successfully when clicking logout", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(
        500
      );
      common.clickProfile().clickLogout();

      cy.url().should("include", "/login");
      cy.contains("Đăng nhập").should("be.visible");
    });
  });

  it("Verify that Admin (manage staff-client) user logout successfully when clicking logout", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[0].username,
        user.authentication[0].password
      ).wait(500);
      common.clickProfile().clickLogout();

      cy.url().should("include", "/login");
      cy.contains("Đăng nhập").should("be.visible");
    });
  });

  it("Verify that Admin (manage voucher) user logout successfully when clicking logout", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[1].username,
        user.authentication[1].password
      ).wait(500);
      common.clickProfile().clickLogout();

      cy.url().should("include", "/login");
      cy.contains("Đăng nhập").should("be.visible");
    });
  });

  it("Verify that Seller user logout successfully when clicking logout", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[2].username,
        user.authentication[2].password
      ).wait(500);
      common.clickProfile().clickLogout();

      cy.url().should("include", "/login");
      cy.contains("Đăng nhập").should("be.visible");
    });
  });

  it("Verify that Admin (manage orders) user logout successfully when clicking logout", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[3].username,
        user.authentication[3].password
      ).wait(500);
      common.clickProfile().clickLogout();

      cy.url().should("include", "/login");
      cy.contains("Đăng nhập").should("be.visible");
    });
  });

  it("Verify that Agent user logout successfully when clicking logout", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[4].username,
        user.authentication[4].password
      ).wait(500);
      common.clickProfile().clickLogout();

      cy.url().should("include", "/login");
      cy.contains("Đăng nhập").should("be.visible");
    });
  });

  it("Verify that it redirects to use's info page when clicking Information at top left dropdown list", () => {
    throw new Error(
      "[ADMIN-Login] Unable to view user information when clicking Information at top left dropdown list"
    );

    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[4].username,
        user.authentication[4].password
      ).wait(500);
      common.clickProfile().clickInfo();

      cy.url().should("include", "/user");
    });
  });
});
