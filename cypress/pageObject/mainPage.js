export const mainPage = {

  BTN_ADD_TO_CART: "//button[@class='btn btn-fefault cart add-to-cart-each']",
  BTN_ADD_OVERLAY: '.pagination-data > :nth-child(1) > .product-image-wrapper > .single-products > .product-overlay > a',

  clickVoucher(){
    cy.get(this.BTN_ADD_OVERLAY).click({force: true});
    return this;
  },

  clickAddToCart(){
    cy.xpath(this.BTN_ADD_TO_CART).click();
    return this;
  },

  shouldShowErrorMessage(msg){
    let LBL_SUCCESS= `.show-error-message-detail`;
    cy.get(LBL_SUCCESS).should('have.text', msg);
    return this;
  }

}