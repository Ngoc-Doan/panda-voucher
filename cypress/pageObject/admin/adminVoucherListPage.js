export const adminVouchersListPage = {
  BTN_DETAIL: "(//i[@class='material-icons'][normalize-space()='preview'])",
  BTN_EDIT: "(//i[@class='material-icons'][normalize-space()='edit'])",
  BTN_UPDATE: "//button[contains(text(),'Cập nhật sản phẩm')]",
  BTN_DELETE: "(//i[@class='material-icons'][normalize-space()='delete'])",
  BTN_CONFIRM_DELETE: "//button[@id='btn-delete-product-user-admin']",

  clickDetail(){
    cy.xpath(this.BTN_DETAIL).last().click();
    return this;
  },

  clickEdit(){
    cy.xpath(this.BTN_EDIT).last().click();
    return this;
  },

  clickUpdate(){
    cy.xpath(this.BTN_UPDATE).click();
    return this;
  },

  clickDelete(){
    cy.xpath(this.BTN_DELETE).last().click();
    return this;
  },

  clickConfirmDetele(){
    cy.xpath(this.BTN_CONFIRM_DELETE).click();
    return this;
  },

  shouldShowSuccessMessage(msg){
    let LBL_SUCCESS = "//div[@class='popup']//div[1]";
    cy.xpath(LBL_SUCCESS).should('have.text', msg);
    return this;
  },

}