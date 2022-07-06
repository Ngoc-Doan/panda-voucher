export const adminAddStaffPage = {
  TXT_EMAIL: "[id='email-staff'][type='email']",
  TXT_NAME: "[id='name-staff'][type='text']",
  TXT_USERNAME: "[id='username-staff'][type='text']",
  TXT_PHONE: "[id='phone-staff'][type='text']",
  TXT_SALARY: "[id='salary-staff'][type='number']",
  BTN_AVATAR: "[id='img-upload-input'][type='file']",
  TXT_STAFF_PASSWORD: "[id='password-staff'][type='password']",
  TXT_REWRITE_STAFF_PASSWORD: "[id='re-password-staff'][type='password']",
  TXT_ADMIN_PASSWORD: "[id='password-admin'][type='password']",

  BTN_ADD_NEW_STAFF: "[id='btn-add-staff-user-admin'][type='button']",

  TXT_ERROR_POPUP: "div[id='message-alert-show']",

  clickAddNewStaff() {
    cy.get(this.BTN_ADD_NEW_STAFF).click();
    return this;
  },

  typeName(name) {
    cy.get(this.TXT_NAME).clear().type(name);
    return this;
  },

  typeEmail(email) {
    cy.get(this.TXT_EMAIL).clear().type(email);
    return this;
  },

  typeUsername(username) {
    cy.get(this.TXT_USERNAME).clear().type(username);
    return this;
  },

  typePhone(phone) {
    cy.get(this.TXT_PHONE).clear().type(phone);
    return this;
  },

  typeSalary(number) {
    cy.get(this.TXT_SALARY).clear().type(number);
    return this;
  },

  typeStaffPassword(password) {
    cy.get(this.TXT_STAFF_PASSWORD).type(password);
    return this;
  },

  typeRewriteStaffPassword(password) {
    cy.get(this.TXT_REWRITE_STAFF_PASSWORD).type(password);
    return this;
  },

  typeAdminPassword(password) {
    cy.get(this.TXT_ADMIN_PASSWORD).type(password);
    return this;
  },

  uploadAvatar(file) {
    cy.fixture(file, { encoding: null }).as("myImage");
    cy.get(this.BTN_AVATAR).selectFile("@myImage", { force: true }).wait(200);
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
