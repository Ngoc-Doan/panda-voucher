export const adminAddCategory = {
  TXT_NAME_CATEGORY: "//input[@id='name-category']",
  
  SDD_GROUP_CATEGORY: "//select[@id='option-groups']",

  BTN_ADD_CATEGORY: "//button[contains(text(),'Thêm phân loại mới')]",

  typeNameCategory(category) {
    cy.xpath(this.TXT_NAME_CATEGORY).type(category);
    return this;
  },
  
  selectGroupCategory(group) {
    cy.xpath(this.SDD_GROUP_CATEGORY).select(group);
    return this;
  },

  clickAddCategory(){
    cy.xpath(this.BTN_ADD_CATEGORY).click();
    return this;
  },

  shouldShowMessage(msg){
    let LBL_MSG = "//div[@class='popup']//div[1]";
    cy.xpath(LBL_MSG).should('have.text', msg);
    return this;
  },

}