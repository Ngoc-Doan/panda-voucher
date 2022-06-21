import { mainPage } from "../../pageObject/mainPage";
require("cypress-xpath");

describe('Add to cart', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Add to cart', () => {
    mainPage
      .clickVoucher()
      .clickAddToCart()
      .shouldShowErrorMessage('Thêm sản phẩm vào giỏ hàng thành công')
    
  });

  afterEach(() => {
    cy.logout();
  });
});

