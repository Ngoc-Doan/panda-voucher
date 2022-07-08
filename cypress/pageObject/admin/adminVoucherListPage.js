export const adminVouchersListPage = {
  BTN_DETAIL: "(//i[@class='material-icons'][normalize-space()='preview'])",
  BTN_EDIT: "(//i[@class='material-icons'][normalize-space()='edit'])",


  clickDetail(){
    cy.xpath(this.BTN_DETAIL).last().click();
    return this;
  },

  clickEdit(){
    cy.xpath(this.BTN_EDIT).last().click();
    return this;
  },

}