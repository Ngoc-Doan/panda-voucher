import { common } from "../../pageObject/admin/common";
import { adminAddCategory } from "../../pageObject/admin/adminAddCategory";
require("cypress-xpath");

describe("MODULE ADMIN CATEGORY", () => {
  beforeEach(() => {
    cy.fixture("category.json").as("category");

    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(
      500
    );
    cy.url().should("include", common.LNK_DASHBOARD);
  });

  //Don't have delete category feature
  it("Add category successfully", () => {
    cy.visit(common.LNK_ADD_CATEGORY).wait(500);

    cy.get("@category").then((category) => {
      adminAddCategory
        .typeNameCategory(category.category[0].name)
        .selectGroupCategory(category.category[0].group);
      //.clickAddCategory()
      //.shouldShowMessage('Thêm phân loại thành công');
    });
  });

  it("Should show error message when missing category group", () => {
    cy.visit(common.LNK_ADD_CATEGORY).wait(500);

    cy.get("@category").then((category) => {
      adminAddCategory
        .typeNameCategory(category.category[0].name)
        .clickAddCategory()
        .shouldShowMessage("Vui lòng chọn nhóm phân loại");
    });
  });

  it("Should show error message when missing category name", () => {
    cy.visit(common.LNK_ADD_CATEGORY).wait(500);

    cy.get("@category").then((category) => {
      adminAddCategory
        .selectGroupCategory(category.category[0].group)
        .clickAddCategory()
        .shouldShowMessage("Vui lòng cung cấp tên phân loại");
    });
  });
});
