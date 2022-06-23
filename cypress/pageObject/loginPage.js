export const loginPage = {

  TXT_USERNAME: '#login_form > [type="text"]',
  TXT_PASSWORD: '#login_form > [type="password"]', 
  BTN_LOGIN: '#login-button',

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

  shouldShowErrorMessage(msg){
    let LBL_ERROR= `//div[@class='show-error-message-signup']`;
    cy.xpath(LBL_ERROR).should('have.text', msg);
    return this;
  }

}
