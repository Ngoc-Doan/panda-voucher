import { modalDialog } from "../../pageObject/share/common-modal-dialog";
import { mainPage } from "../../pageObject/mainPage";
import { cartPage } from "../../pageObject/cartPage";
require("cypress-xpath");


describe('MODULE CART', () => {
  beforeEach(() => {
    cy.fixture('create.json').as('create');
    cy.login();
  });


  it('Add to cart successfully', () => {
    mainPage
      .clickVoucher()
      .clickAddToCart()
      .shouldShowMessageAddToCart('Thêm sản phẩm vào giỏ hàng thành công');
  });


  it('Access to cart successfully', () => {
    modalDialog
      .clickCartPage()
  });

  
  it('Should show error message when clicking sub quantity item', () => {
    modalDialog
    .clickCartPage();
    
    cy.get('input[name="quantity"]').invoke('val').then(($val) => {
      if($val == '1'){
        cartPage
          .clickSubItem()
          .shouldShowErrorMessageSubItem('Số lượng sản phẩm đạt tối thiểu');
      }
      if($val > 1){
        cartPage
          .clickSubItem()
        cy.log('Quantity > 1');
      }
    });
  });

  
  it('Add quantity item to cart successfully', () => {
    modalDialog
      .clickCartPage();
    
    cartPage
      .clickAddItem();
  });

  
  it('Type address information and payment', () => {
    modalDialog
      .clickCartPage();

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


  afterEach(() => {
    cy.logout();
  });
});