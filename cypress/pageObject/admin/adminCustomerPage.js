export const adminCustomerPage = {
  BTN_EDIT: "(//i[@class='material-icons'][normalize-space()='edit'])",
  BTN_UPDATE: "//button[@id='btn-update-user-admin']",
  BTN_DELETE: "(//i[@class='material-icons'][normalize-space()='delete'])",
  BTN_CONFIRM_DELETE: '#btn-delete-user-customer-modal',

  TXT_ADDRESS: "//input[@id='address-admin']",
  TXT_DISTRICT: "//input[@id='district-admin']",
  TXT_CITY: "//input[@id='city-admin']",
  TXT_PHONE: "//input[@id='phone-admin']",
  TXT_PASSWORD: "//input[@id='password-admin']",

  clickEdit(){
    cy.xpath(this.BTN_EDIT).last().click().wait(500);
    return this;
  },

  clickUpdate(){
    cy.xpath(this.BTN_UPDATE).click();
  },

  clickDelete(){
    cy.xpath(this.BTN_DELETE).last().click().wait(200);
    return this;
  },

  clickConfirmDetele(){
    cy.get(this.BTN_CONFIRM_DELETE).click();
    return this;
  },

  typeAddress(address){
    cy.xpath(this.TXT_ADDRESS).clear().type(address);
    return this;
  },

  typeDistrict(district){
    cy.xpath(this.TXT_DISTRICT).clear().type(district);
    return this;
  },

  typeCity(city){
    cy.xpath(this.TXT_CITY).clear().type(city);
    return this;
  },

  typePhone(phone){
    cy.xpath(this.TXT_PHONE).clear().type(phone);
    return this;
  },

  typePassword(password){
    cy.xpath(this.TXT_PASSWORD).type(password);
    return this;
  }

}