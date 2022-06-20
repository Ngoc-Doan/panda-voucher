export const mainPage = {
  clickAddToCart(){
    cy.get('.pagination-data > :nth-child(1) > .product-image-wrapper > .single-products > .product-overlay > a').click({force: true});
    //cy.xpath("(//a[contains(text(),'Thêm vào giỏ hàng')])[1]").click();
    return this;
  },

  shouldShowErrorMessage(msg){
    let LBL_ERROR= `//div[@class='content']`;
    cy.xpath(LBL_ERROR).should('have.text', msg);
    return this;
  }

}