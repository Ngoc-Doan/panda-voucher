export const adminAddVoucherPage = {
  TXT_NAME: '#name-product',
  TXT_PRICE: '#price-product',
  TXT_DESCRIPTION: '#description-product',

  LST_OPTION_BRANCH: '#option-brand',
  LST_OPTION_CATEGORY: '#option-category',

  CHK_SIGN: '.check',

  DTP_EX: '#expiration-date-product',

  BTN_ADD: "//button[contains(text(),'Thêm sản phẩm')]",
  BTN_UPLOAD_IMAGE: '.label-for-img-upload-input',
  
  typeName(name) {
    cy.get(this.TXT_NAME).clear().type(name);
    return this;
  },

  typePrice(price) {
    cy.get(this.TXT_PRICE).clear().type(price);
    return this;
  },

  selectOptionBranch(option) {
    cy.get(this.LST_OPTION_BRANCH).select(option);
    return this;
  },

  selectOptionCategory(option) {
    cy.get(this.LST_OPTION_CATEGORY).select(option);
    return this;
  },

  typeDate(date){
    cy.get(this.DTP_EX).click().type(date);
    return this;
  },

  clickCheckSign(){
    cy.get(this.CHK_SIGN).click();
    return this;
  },

  typeDescription(description){
    cy.get(this.TXT_DESCRIPTION).clear().type(description);
    return this;
  },

  uploadImage(file) {
    cy.fixture(file, { encoding: null }).as("myImage");
    cy.get(this.BTN_UPLOAD_IMAGE).selectFile("@myImage", { force: true }).wait(200);
    return this;
  },

  clickAddVoucher(){
    cy.wait(500);
    cy.xpath(this.BTN_ADD).click();
    return this;
  },

  shouldShowSuccessMessage(msg){
    let LBL_SUCCESS = "//div[@class='popup']//div[1]";
    cy.xpath(LBL_SUCCESS).should('have.text', msg);
    return this;
  },


}