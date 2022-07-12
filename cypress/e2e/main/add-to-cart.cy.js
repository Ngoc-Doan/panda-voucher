import { modalDialog } from "../../pageObject/share/common-modal-dialog";
import { mainPage } from "../../pageObject/mainPage";
require("cypress-xpath");


describe('MODULE MAIN PAGE - ADD TO CART', () => {
  beforeEach(() => {
    cy.login().wait(500);
  });


  it('View main page', () => {
    cy.logout().wait(500);

    modalDialog
      .clickMainPage();
  });


  it('Add to cart without login', () => {
    cy.logout().wait(500);

    modalDialog
      .clickMainPage();
    
    mainPage
      .clickVoucher()
      .clickAddToCart()
      .shouldShowMessageAddToCart('Vui lòng đăng nhập');
  });


  it('Add to cart successfully', () => {
    mainPage
      .clickVoucher()
      .clickAddToCart()
      .shouldShowMessageAddToCart('Thêm sản phẩm vào giỏ hàng thành công');

    cy.logout().wait(500);
  });


  it('Add to cart successfully - loop 2', () => {
    mainPage
      .clickVoucher()
      .clickAddToCart()
      .shouldShowMessageAddToCart('Thêm sản phẩm vào giỏ hàng thành công');

    cy.logout().wait(500);
  });

});

