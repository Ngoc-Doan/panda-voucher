import { modalDialog } from "../../pageObject/share/common-modal-dialog";
import { paymentPage } from "../../pageObject/paymentPage";

//run admin order view
import "../admin-order/order.cy"

describe('RECEIVED ORDER', () => {
  beforeEach(() => {
    cy.login().wait(500);
  });


  it('Received order', () => {

    modalDialog.clickPaymentPage();
    
    paymentPage
      .clickLastOrder();
  }); 
});