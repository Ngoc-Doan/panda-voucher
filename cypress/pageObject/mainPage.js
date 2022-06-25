export const mainPage = {

  BTN_ADD_TO_CART: "//button[@class='btn btn-fefault cart add-to-cart-each']",
  BTN_ADD_OVERLAY: '.pagination-data > :nth-child(1) > .product-image-wrapper > .single-products > .product-overlay > a',
  BTN_FAVORITE: "(//a[contains(text(),'Ưa thích')])[3]",

  clickVoucher(){
    cy.get(this.BTN_ADD_OVERLAY).click({force: true});
    return this;
  },

  clickAddToCart(){
    cy.xpath(this.BTN_ADD_TO_CART).click();
    return this;
  },

  clickAddToFavorite(){
    cy.xpath(this.BTN_FAVORITE).click();
    return this;  
  },

  clickCompare(i){
    let BTN_COMPARE = `(//a[contains(text(),'So sánh')])[${i}]`;
    cy.xpath(BTN_COMPARE).click();
    return this;  
  },

  shouldShowMessageAddToCart(msg){
    let LBL_SUCCESS= `.show-error-message-detail`;
    cy.get(LBL_SUCCESS).should('have.text', msg);
    return this;
  },

  shouldShowMessageAddToFavorite(msg){
    let LBL_SUCCESS = "//div[@class='content']";
    cy.xpath(LBL_SUCCESS).should('have.text', msg);
    return this;
  },

  shouldShowMessageCompare(msg){
    let LBL_SUCCESS = "//div[@class='content']";
    cy.xpath(LBL_SUCCESS).should('have.text', msg);
    return this;
  },

}