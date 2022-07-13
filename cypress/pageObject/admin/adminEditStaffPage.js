export const adminEditStaffPage = {
  TXT_COMPANY_NAME:
    "//label[contains(text(),'Công ty')]//following-sibling::input",
  TXT_EMAIL: "[id='email-admin'][type='email']",
  TXT_NAME: "[id='name-admin'][type='text']",
  TXT_URL: "[id='url-admin'][type='text']",
  TXT_ADDRESS: "[id='address-admin'][type='text']",
  TXT_POSTCODE: "[id='code-admin'][type='number']",
  TXT_SALARY: "[id='salary-admin'][type='number']",
  TXT_CITY: "[id='city-admin'][type='text']",
  TXT_DISTRICT: "[id='district-admin'][type='text']",
  TXT_PHONE: "[id='phone-admin'][type='text']",
  TXT_DESCRIPTION: "textarea[id='desc-admin']",
  TXT_ADMIN_PASSWORD: "[id='password-admin'][type='password']",

  BTN_UPDATE_STAFF: "[id='btn-update-user-admin'][type='button']",

  TXT_ERROR_POPUP: "div[id='message-alert-show']",

  clickUpdateStaff() {
    cy.get(this.BTN_UPDATE_STAFF).click();
    return this;
  },

  typeEmail(email) {
    cy.get(this.TXT_EMAIL).clear().type(email);
    return this;
  },

  clearEmail() {
    cy.get(this.TXT_EMAIL).clear();
    return this;
  },

  typeName(name) {
    cy.get(this.TXT_NAME).clear().type(name);
    return this;
  },

  clearName() {
    cy.get(this.TXT_NAME).clear();
    return this;
  },

  typeURL(url) {
    cy.get(this.TXT_URL).clear().type(url);
    return this;
  },

  clearURL() {
    cy.get(this.TXT_URL).clear();
    return this;
  },

  typeAddress(address) {
    cy.get(this.TXT_ADDRESS).clear().type(address);
    return this;
  },

  clearAddress() {
    cy.get(this.TXT_ADDRESS).clear();
    return this;
  },

  typePostalCode(code) {
    cy.get(this.TXT_POSTCODE).clear().type(code);
    return this;
  },

  clearPostalCode() {
    cy.get(this.TXT_POSTCODE).clear();
    return this;
  },

  typeCity(city) {
    cy.get(this.TXT_CITY).clear().type(city);
    return this;
  },

  clearCity() {
    cy.get(this.TXT_CITY).clear();
    return this;
  },

  typeDistrict(district) {
    cy.get(this.TXT_DISTRICT).clear().type(district);
    return this;
  },

  clearDistrict() {
    cy.get(this.TXT_DISTRICT).clear();
    return this;
  },

  typePhone(phone) {
    cy.get(this.TXT_PHONE).clear().type(phone);
    return this;
  },

  clearPhone() {
    cy.get(this.TXT_PHONE).clear();
    return this;
  },

  typeSalary(number) {
    cy.get(this.TXT_SALARY).clear().type(number);
    return this;
  },

  clearSalary() {
    cy.get(this.TXT_SALARY).clear();
    return this;
  },

  typeDescription(description) {
    cy.get(this.TXT_DESCRIPTION).clear().type(description);
    return this;
  },

  typeAdminPassword(password) {
    cy.get(this.TXT_ADMIN_PASSWORD).type(password);
    return this;
  },

  shouldShowErrorMessage() {
    cy.get(this.TXT_ERROR_POPUP)
      .should("be.visible")
      .wait(4000)
      .and("not.be.visible");
    return this;
  },
};
