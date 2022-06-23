export const profilePage = {

  HDR_PROFILE: "//ul[@class='nav navbar-nav']//a[contains(text(),'Tài khoản')]",

  BTN_EDIT: '#submit',
  BTN_UPDATE: "//button[@class='btn btn-primary update-profile btn-update-edit']",
  
  TXT_PHONE: '#phone',
  TXT_EMAIL: '#eMail',
  TXT_WEBSITE: '#website',
  TXT_STREET: '#Street',
  TXT_CITY: '#ciTy',
  TXT_STATE: '#sTate',
  TXT_ZIP: '#zIp',
  TXT_DESCRIPTION: '.description-profile',
  TXT_PASSWORD: '#password',

  clickProfile(){
    cy.xpath(this.HDR_PROFILE).click();
    return this;
  },

  clickEdit(){
    cy.get(this.BTN_EDIT).click();
    return this;
  },

  typePhone(phone){
    cy.get(this.TXT_PHONE).clear();
    cy.get(this.TXT_PHONE).type(phone);
    return this;
  },

  typeEmail(email){
    cy.get(this.TXT_EMAIL).clear();
    cy.get(this.TXT_EMAIL).type(email);
    return this;
  },

  typeWebsite(website){
    cy.get(this.TXT_WEBSITE).clear();
    cy.get(this.TXT_WEBSITE).type(website);
    return this;
  },

  typeStreet(street){
    cy.get(this.TXT_STREET).clear();
    cy.get(this.TXT_STREET).type(street);
    return this;
  },

  typeCity(city){
    cy.get(this.TXT_CITY).clear();
    cy.get(this.TXT_CITY).type(city);
    return this;
  },

  typeState(state){
    cy.get(this.TXT_STATE).clear();
    cy.get(this.TXT_STATE).type(state);
    return this;
  },

  typeZip(zip){
    cy.get(this.TXT_ZIP).clear();
    cy.get(this.TXT_ZIP).type(zip);
    return this;
  },

  typeDescription(description){
    cy.get(this.TXT_DESCRIPTION).clear();
    cy.get(this.TXT_DESCRIPTION).type(description);
    return this;
  },

  typePassword(password){
    cy.get(this.TXT_PASSWORD).type(password);
    return this;
  },

  clickUpdate(){
    cy.xpath(this.BTN_UPDATE).click();
    return this;
  },
  
  shouldShowErrorMessage(msg){
    cy.wait(400);
    let LBL_ERROR= `//div[@class='show-error-message-edit-profile']`;
    cy.xpath(LBL_ERROR).should('have.text', msg);
    return this;
  }

}
