import { modalDialog } from "../../pageObject/share/common-modal-dialog";
import { mainPage } from "../../pageObject/mainPage";
import { cartPage } from "../../pageObject/cartPage";
import { common } from "../../pageObject/admin/common";
import { adminOrderPage } from "../../pageObject/admin/adminOrderPage";
require("cypress-xpath");

describe("ADD TO CART AND PURCHASE", () => {
  beforeEach(() => {
    cy.fixture("create.json").as("create");
    cy.login();
  });

  it("Add to cart successfully", () => {
    mainPage
      .clickVoucher()
      .clickAddToCart()
      .shouldShowMessageAddToCart("Thêm sản phẩm vào giỏ hàng thành công");
  });

  it("Type address information and payment", () => {
    modalDialog.clickCartPage();

    cy.get("@create").then((create) => {
      cartPage
        .typeDistrict(create.checkout[0].district)
        .typeAddress(create.checkout[0].address)
        .clickCheckOutProfile();

      cy.wait(1000);

      cartPage
        .typeName(create.payment[0].name)
        .typePhone(create.payment[0].phone)
        .typeEmail(create.payment[0].email)
        .typePassword(Cypress.env("pass_customer"))
        .selectShip(create.payment[0].ship)
        .typeNote(create.payment[0].note)
        .shouldShowMessageShip("Cập nhật phí vận chuyển thành công");

      cy.wait(1000);

      cartPage.clickPayment();
    });
  });
});

describe("CONFIRM ORDER", () => {
  beforeEach(() => {
    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(
      500
    );
    cy.url().should("include", common.LNK_DASHBOARD);
  });

  it.skip("Click detail order", () => {
    cy.visit(common.LNK_ORDER).wait(500);

    adminOrderPage.clickDetail();
  });

  it("Confirmed order", () => {
    cy.visit(common.LNK_ORDER).wait(500);

    adminOrderPage.clickConfirmOrder();
  });
});
