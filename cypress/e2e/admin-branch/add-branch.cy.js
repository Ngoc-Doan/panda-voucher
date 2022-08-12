import { common } from "../../pageObject/admin/common";
import { adminAddBranch } from "../../pageObject/admin/adminAddBranch";
require("cypress-xpath");

describe("MODULE ADMIN BRANCH", () => {
  beforeEach(() => {
    cy.fixture("branch.json").as("branch");

    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(
      500
    );
    cy.url().should("include", common.LNK_DASHBOARD);
  });

  // Don't have delete brand feature
  it("Add branch successfully", () => {
    cy.visit(common.LNK_ADD_BRANCH).wait(500);

    cy.get("@branch").then((branch) => {
      adminAddBranch
        .typeNameBranch(branch.branch[0].name)
        .typeAddressBranch(branch.branch[0].address)
        .typePhoneBranch(branch.branch[0].phone)
        .selectCityBranch(branch.branch[0].city);
      //.clickAddBranch()
      //.shouldShowMessage('Thêm thương hiệu thành công');
    });
  });

  it("Should show error message when missing branch name", () => {
    cy.visit(common.LNK_ADD_BRANCH).wait(500);

    cy.get("@branch").then((branch) => {
      adminAddBranch
        .typeAddressBranch(branch.branch[0].address)
        .typePhoneBranch(branch.branch[0].phone)
        .selectCityBranch(branch.branch[0].city)
        .clickAddBranch()
        .shouldShowMessage("Vui lòng cung cấp tên thương hiệu");
    });
  });

  it("Should show error message when missing branch address", () => {
    cy.visit(common.LNK_ADD_BRANCH).wait(500);

    cy.get("@branch").then((branch) => {
      adminAddBranch
        .typeNameBranch(branch.branch[0].name)
        .typePhoneBranch(branch.branch[0].phone)
        .selectCityBranch(branch.branch[0].city)
        .clickAddBranch()
        .shouldShowMessage("Vui lòng cung cấp địa chỉ");
    });
  });

  it("Should show error message when missing branch phone", () => {
    cy.visit(common.LNK_ADD_BRANCH).wait(500);

    cy.get("@branch").then((branch) => {
      adminAddBranch
        .typeNameBranch(branch.branch[0].name)
        .typeAddressBranch(branch.branch[0].address)
        .selectCityBranch(branch.branch[0].city)
        .clickAddBranch()
        .shouldShowMessage("Vui lòng cung cấp số điện thoại");
    });
  });

  it("Should show error message when missing branch city", () => {
    cy.visit(common.LNK_ADD_BRANCH).wait(500);

    cy.get("@branch").then((branch) => {
      adminAddBranch
        .typeNameBranch(branch.branch[0].name)
        .typeAddressBranch(branch.branch[0].address)
        .typePhoneBranch(branch.branch[0].phone)
        .clickAddBranch()
        .shouldShowMessage("Vui lòng chọn tỉnh thành");
    });
  });

  /*=== ISSUE ===*/
  it("Should show error message when entering a phone number less than 10 digits", () => {
    throw new Error(
      "[ADMIN-Create brand] No error message is shown when entering a phone number less than 10 digits"
    );
    cy.visit(common.LNK_ADD_BRANCH).wait(500);

    cy.get("@branch").then((branch) => {
      adminAddBranch
        .typeNameBranch(branch.branch[0].name)
        .typeAddressBranch(branch.branch[0].address)
        .selectCityBranch(branch.branch[0].city)
        .typePhoneBranch("0888")
        .clickAddBranch()
        .shouldShowMessage("Vui lòng nhập số điện thoại hợp lệ");
    });
  });
});
