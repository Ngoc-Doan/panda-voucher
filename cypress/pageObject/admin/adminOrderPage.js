export const adminOrderPage = {
  BTN_DETAIL: "(//i[@class='material-icons'][normalize-space()='preview'])",
  BTN_CONFIRM_ORDER: "(//i[contains(text(),'check')])",

  clickDetail(){
    cy.xpath(this.BTN_DETAIL).last().click();
    return this;
  },

  clickConfirmOrder(){
    cy.xpath(this.BTN_CONFIRM_ORDER).last().click();
    return this;
  },
}