export const adminLoginPage = {
  TXT_USERNAME: '[id="user"][name="username"]',
  TXT_PASSWORD: '[id="pass"][name="password"]',
  BTN_LOGIN: "[id='btn-login-admin'][value='Đăng nhập']",

  typeUsername(username) {
    cy.get(this.TXT_USERNAME).type(username);
    return this;
  },

  typePassword(password) {
    cy.get(this.TXT_PASSWORD).type(password);
    return this;
  },

  clickLogin() {
    cy.get(this.BTN_LOGIN).click();
    return this;
  },

  // shouldShowErrorMessage(msg) {
  //   let LBL_ERROR = `//div[@class='show-error-message-signup']`;
  //   cy.xpath(LBL_ERROR).should("have.text", msg);
  //   return this;
  // },
};
