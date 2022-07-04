export const adminMainPage = {
  MENU_EDIT_USER: "//a[contains(text(),'Chỉnh sửa thông tin')]",
  MENU_MAIN: "//a[contains(text(),'Trang chủ')]",
  
  clickEditUser() {
    cy.get(this.MENU_EDIT_USER)
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });
    return this;
  },

  // clickAddToCart() {
  //   cy.xpath(this.BTN_ADD_TO_CART).click();
  //   return this;
  // },

  // clickAddToFavorite() {
  //   cy.xpath(this.BTN_FAVORITE).click();
  //   return this;
  // },

  // clickCompare(i) {
  //   let BTN_COMPARE = `(//a[contains(text(),'So sánh')])[${i}]`;
  //   cy.xpath(BTN_COMPARE).click();
  //   return this;
  // },

  // shouldShowMessageAddToCart(msg) {
  //   let LBL_SUCCESS = `.show-error-message-detail`;
  //   cy.get(LBL_SUCCESS).should("have.text", msg);
  //   return this;
  // },

  // shouldShowMessageAddToFavorite(msg) {
  //   let LBL_SUCCESS = "//div[@class='content']";
  //   cy.xpath(LBL_SUCCESS).should("have.text", msg);
  //   return this;
  // },

  // shouldShowMessageCompare(msg) {
  //   let LBL_SUCCESS = "//div[@class='content']";
  //   cy.xpath(LBL_SUCCESS).should("have.text", msg);
  //   return this;
  // },
};
