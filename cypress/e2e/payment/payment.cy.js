import { modalDialog } from "../../pageObject/share/common-modal-dialog";
import { mainPage } from "../../pageObject/mainPage";
import { cartPage } from "../../pageObject/cartPage";
import { paymentPage } from "../../pageObject/paymentPage";
require("cypress-xpath");


describe('ADD TO CART AND PURCHASE', () => {
  beforeEach(() => {
    cy.fixture('create.json').as('create');
    cy.login().wait(500);
  });


  it('Add to cart successfully', () => {
    mainPage
      .clickVoucher()
      .clickAddToCart()
      .shouldShowMessageAddToCart('Thêm sản phẩm vào giỏ hàng thành công');
  });


  it('Type address information and payment', () => {
    modalDialog
      .clickCartPage();

    cy.wait(1000);

    cy.get('@create').then((create) => {
      cartPage
        .typeDistrict(create.checkout[0].district)
        .typeAddress(create.checkout[0].address)
        .clickCheckOutProfile();
        
      cy.wait(1000);

      cartPage
        .typeName(create.payment[0].name)
        .typePhone(create.payment[0].phone)
        .typeEmail(create.payment[0].email)
        .typePassword(Cypress.env('pass_customer'))
        .selectShip(create.payment[0].ship)
        .typeNote(create.payment[0].note)
        .shouldShowMessageShip('Cập nhật phí vận chuyển thành công');

      cy.wait(1000);

      cartPage
        .clickPayment();
    })
  });
})


describe('MODULE PAYMENT', () => {
  beforeEach(() => {
    cy.login().wait(500);
  });


  it('Access to payment successfully', () => {
    modalDialog
      .clickPaymentPage();
  });


  it('Click last order code, cancel purchase order and confirm no', () => {
    modalDialog
      .clickPaymentPage();
    
    paymentPage
      .clickLastOrder()
      .clickCancel()
      .clickConfirmNo();
  });


  it('Click last order code, cancel purchase order and confirm yes', () => {
    modalDialog
      .clickPaymentPage();
    
    paymentPage
      .clickLastOrder()
      .clickCancel()
      .clickConfirmYes();
  });


  afterEach(() => {
    cy.logout().wait(500);
  });
});