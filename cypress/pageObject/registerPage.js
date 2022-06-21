export const registerPage = {

  TXT_NAME: '#name',
  TXT_USERNAME: '#username',
  TXT_EMAIL: '#email',
  TXT_PASSWORD: '#password',
  TXT_CONFIRM_PASSWORD: '#re_password',
  BTN_REGISTER: '#register',

  typeName(name){
    cy.get(this.TXT_NAME).type(name);
    return this;
  },

  typeUsername(username){
    cy.get(this.TXT_USERNAME).type(username);
    return this;
  },

  typeEmail(email){
    cy.get(this.TXT_EMAIL).type(email);
    return this;
  },

  typePassword(password){
    cy.get(this.TXT_PASSWORD).type(password);
    return this;
  },

  typeRe_Password(re_password){
    cy.get(this.TXT_CONFIRM_PASSWORD).type(re_password);
    return this;
  },

  clickRegister(){
    cy.get(this.BTN_REGISTER).click();
    return this;
  },

  shouldShowErrorMessage(msg){
    let LBL_ERROR= `//div[@class='show-error-message-signup']`;
    cy.xpath(LBL_ERROR).should('have.text', msg);
    return this;
  }

}
