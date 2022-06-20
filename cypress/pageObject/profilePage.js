export const profilePage = {
  clickProfile(){
    cy.xpath("//ul[@class='nav navbar-nav']//a[contains(text(),'Tài khoản')]").click();
    return this;
  },

  clickEdit(){
    cy.get('#submit').click();
    return this;
  },

  typePhone(phone){
    cy.get('#phone').clear();
    cy.get('#phone').type(phone);
    return this;
  },

  typeEmail(email){
    cy.get('#eMail').clear();
    cy.get('#eMail').type(email);
    return this;
  },

  typeWebsite(website){
    cy.get('#website').clear();
    cy.get('#website').type(website);
    return this;
  },

  typeStreet(street){
    cy.get('#Street').clear();
    cy.get('#Street').type(street);
    return this;
  },

  typeCity(city){
    cy.get('#ciTy').clear();
    cy.get('#ciTy').type(city);
    return this;
  },

  typeState(state){
    cy.get('#sTate').clear();
    cy.get('#sTate').type(state);
    return this;
  },

  typeZip(zip){
    cy.get('#zIp').clear();
    cy.get('#zIp').type(zip);
    return this;
  },

  typeDescription(description){
    cy.get('.description-profile').clear();
    cy.get('.description-profile').type(description);
    return this;
  },

  typePassword(password){
    cy.get('#password').type(password);
    return this;
  },

  clickUpdate(){
    cy.get(':nth-child(4) > .col-xl-12 > .text-right > .btn-primary').click();
    return this;
  },

  shouldShowErrorMessage(msg){
    cy.wait(400);
    let LBL_ERROR= `//div[@class='show-error-message-edit-profile']`;
    cy.xpath(LBL_ERROR).should('have.text', msg);
    return this;
  }

}