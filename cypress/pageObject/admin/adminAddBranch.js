export const adminAddBranch = {
  TXT_NAME_BRANCH: "//input[@id='name-brand']",
  TXT_ADDRESS_BRANCH: "//input[@id='address-brand']",
  TXT_PHONE_BRANCH: "//input[@id='phone-brand']",
  
  SDD_CITY_BRANCH: "//select[@id='option-cities']",

  BTN_ADD_BRANCH: "//button[contains(text(),'Thêm Thương hiệu mới')]",

  typeNameBranch(branch) {
    cy.xpath(this.TXT_NAME_BRANCH).type(branch);
    return this;
  },

  typeAddressBranch(address) {
    cy.xpath(this.TXT_ADDRESS_BRANCH).type(address);
    return this;
  },

  typePhoneBranch(phone) {
    cy.xpath(this.TXT_PHONE_BRANCH).type(phone);
    return this;
  },
  
  selectCityBranch(city) {
    cy.xpath(this.SDD_CITY_BRANCH).select(city);
    return this;
  },

  clickAddBranch(){
    cy.xpath(this.BTN_ADD_BRANCH).click();
    return this;
  },

  shouldShowMessage(msg){
    let LBL_MSG = "//div[@class='popup']//div[1]";
    cy.xpath(LBL_MSG).should('have.text', msg);
    return this;
  },



}