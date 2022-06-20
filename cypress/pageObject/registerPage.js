export const registerPage = {

  typeName(name){
    cy.get('#name').type(name);
    return this;
  },

  typeUsername(username){
    cy.get('#username').type(username);
    return this;
  },

  typeEmail(email){
    cy.get('#email').type(email);
    return this;
  },

  typePassword(password){
    cy.get('#password').type(password);
    return this;
  },

  typeRe_Password(re_password){
    cy.get('#re_password').type(re_password);
    return this;
  },

  clickRegister(){
    cy.get('#register').click();
    return this;
  },

  shouldShowErrorMessage(msg){
    let LBL_ERROR= `//div[@class='show-error-message-signup']`;
    cy.xpath(LBL_ERROR).should('have.text', msg);
    return this;
  }

}