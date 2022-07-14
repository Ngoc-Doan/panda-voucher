export const paymentPage = {
  DGD_ORDER: "//tbody//tr//td//a",
  
  BTN_CANCEL: "//div[@class='cancel-purchase-order']",
  BTN_CONFIRM_YES: '#modal-btn-yes',
  BTN_CONFIRM_NO: '#modal-btn-no',
  BTN_RECEIVED: "//button[contains(text(),'Đã nhận được hàng ?')]",

  clickLastOrder(){
    cy.xpath(this.DGD_ORDER).last().click().wait(500);
    return this;
  },

  clickReceived(){
    cy.scrollTo('center');
    cy.xpath(this.BTN_RECEIVED).click().wait(500);
    return this;
  },

  clickCancel(){
    cy.wait(500);
    cy.xpath(this.BTN_CANCEL).click().wait(500);
    return this;
  },

  clickConfirmYes(){
    cy.get(this.BTN_CONFIRM_YES).click().wait(500);
    return this;
  },

  clickConfirmNo(){
    cy.get(this.BTN_CONFIRM_NO).click().wait(500);
    return this;
  },

  shouldShowMessageSuccess(msg){
    let LBL_SUCCESS = "//div[@class='content']";
    cy.xpath(LBL_SUCCESS).should('have.text', msg);
    return this;
  },
}