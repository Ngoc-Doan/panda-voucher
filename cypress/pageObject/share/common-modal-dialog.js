export const modalDialog = {

  HDR_LOGOUT: "//a[contains(text(),'Đăng xuất')]",
  HDR_MAIN: "//a[contains(text(),'Trang chủ')]",

  TXT_USERNAME: '#login_form > [type="text"]',
  TXT_PASSWORD: '#login_form > [type="password"]',

  BTN_LOGIN: '#login-button',

  clickLogout(){
    cy.xpath(this.HDR_LOGOUT).click();
    return this;
  },
  
  clickMainPage(){
    cy.xpath(this.HDR_MAIN).click();
    return this;
  },

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

}
