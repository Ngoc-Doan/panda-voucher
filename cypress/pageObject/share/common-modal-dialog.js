export const modalDialog = {
  HDR_LOGOUT: "//a[contains(text(),'Đăng xuất')]",
  HDR_MAIN: "//a[contains(text(),'Trang chủ')]",
  HDR_CART: "(//a[contains(text(),'Giỏ hàng')])[1]",
  HDR_PAYMENT: "(//a[contains(text(),'Thanh toán')])[1]",
  HDR_CONTACT: "//a[@href='./contact']",

  TXT_USERNAME: '#login_form > [type="text"]',
  TXT_PASSWORD: '#login_form > [type="password"]',

  BTN_LOGIN: "#login-button",

  typeUsername(username) {
    cy.get(this.TXT_USERNAME).type(username);
    return this;
  },

  typePassword(password) {
    cy.get(this.TXT_PASSWORD).type(password);
    return this;
  },

  clickLogout() {
    cy.xpath(this.HDR_LOGOUT).scrollIntoView().click({ force: true });
    return this;
  },

  clickLogin() {
    cy.get(this.BTN_LOGIN).click();
    return this;
  },

  clickMainPage() {
    cy.xpath(this.HDR_MAIN).click();
    return this;
  },

  clickCartPage() {
    cy.xpath(this.HDR_CART).click();
    return this;
  },

  clickPaymentPage() {
    cy.xpath(this.HDR_PAYMENT).click();
    return this;
  },

  clickContactPage() {
    cy.xpath(this.HDR_CONTACT).click();
    return this;
  },
};
