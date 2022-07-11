export const paymentPage = {
  DGD_ORDER: "//tbody//tr//td//a",
  
  BTN_CANCEL: "//div[@class='cancel-purchase-order']",
  BTN_CONFIRM_YES: '#modal-btn-yes',
  BTN_CONFIRM_NO: '#modal-btn-no',
  BTN_RECEIVED: "//button[contains(text(),'Đã nhận được hàng ?')]",

  clickLastOrder(){
    cy.xpath(this.DGD_ORDER).last().click();
    return this;
  },

  clickReceived(){
    cy.xpath(this.BTN_RECEIVED).last().click();
    return this;
  },

  clickCancel(){
    cy.wait(200);
    cy.xpath(this.BTN_CANCEL).click();
    return this;
  },

  clickConfirmYes(){
    cy.get(this.BTN_CONFIRM_YES).click();
    return this;
  },

  clickConfirmNo(){
    cy.get(this.BTN_CONFIRM_NO).click();
    return this;
  },

  shouldShowMessageSuccess(msg){
    let LBL_SUCCESS = "//div[@class='content']";
    cy.xpath(LBL_SUCCESS).should('have.text', msg);
    return this;
  },
}