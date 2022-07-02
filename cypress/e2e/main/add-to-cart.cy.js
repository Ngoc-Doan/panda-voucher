import { modalDialog } from "../../pageObject/share/common-modal-dialog";
import { mainPage } from "../../pageObject/mainPage";
require("cypress-xpath");


describe('MODULE MAIN PAGE - ADD TO CART', () => {
  beforeEach(() => {
    cy.login();
  });


  it('View main page', () => {
    cy.logout();
    modalDialog
      .clickMainPage();
  });


  it('Add to cart without login', () => {
    cy.logout();
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
  });

  afterEach(() => {
    cy.logout();
  });
});

