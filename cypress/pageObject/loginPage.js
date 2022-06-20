export const loginPage = {
  typeUsername(username) {
    cy.get('#login_form > [type="text"]').type(username);
    return this;
  },

  typePassword(password) {
    cy.get('#login_form > [type="password"]').type(password);
    return this;
  },

  clickLogin() {
    cy.get('#login-button').click();
    return this;
  },

  shouldShowErrorMessage(msg){
    let LBL_ERROR= `//div[@class='show-error-message-signup']`;
    cy.xpath(LBL_ERROR).should('have.text', msg);
    return this;
  }


}
