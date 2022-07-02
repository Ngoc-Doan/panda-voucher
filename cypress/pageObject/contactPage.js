export const contactPage = {

  TXT_NAME: "//input[@id='name-contact']",
  TXT_EMAIL: "//input[@id='email-contact']",
  TXT_TITLE: "//input[@id='title-contact']",
  TXT_MESSAGE: "//textarea[@id='message']",

  BTN_SUBMIT: '#btn-submit-contact-form',

  typeName(name){
    cy.xpath(this.TXT_NAME).type(name);
    return this;
  },

  typeEmail(email){
    cy.xpath(this.TXT_EMAIL).type(email);
    return this;
  },

  typeTitle(title){
    cy.xpath(this.TXT_TITLE).type(title);
    return this;
  },

  typeMessage(message){
    cy.xpath(this.TXT_MESSAGE).type(message);
    return this;
  },

  clickSubmit(){
    cy.get(this.BTN_SUBMIT).click();
    return this;
  },

  shouldShowMessage(msg){
    let LBL_MESSAGE = "//div[@class='content']";
    cy.xpath(LBL_MESSAGE).should('have.text', msg);
    return this;
  }

}