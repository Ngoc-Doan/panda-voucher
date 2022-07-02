import { modalDialog } from "../../pageObject/share/common-modal-dialog";
import { mainPage } from "../../pageObject/mainPage";
require("cypress-xpath");

describe('MODULE MAIN PAGE - ADD TO COMPARE VOUCHER', () => {
  beforeEach(() => {
    cy.login();
  });
  

  it('View main page', () => {
    cy.logout();
    modalDialog
      .clickMainPage();
  });


  it('Add to compare without login', () => {
    cy.logout();
    modalDialog
      .clickMainPage();
    
    mainPage
      .clickCompare(1)
      .clickCompare(2)
      .shouldShowMessageAddToCart('Vui lòng đăng nhập');
  });


  it('Add to compare', () => {
    mainPage
      .clickCompare(1)
      .clickCompare(2)
      .shouldShowMessageCompare('So sánh sản phẩm thành công');
  });

  afterEach(() => {
    cy.logout();
  });
});

