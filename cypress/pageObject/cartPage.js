export const cartPage = {
  BTN_ADD_ITEM: "(//a[@class='cart_quantity_up'][normalize-space()='+'])[1]",
  BTN_SUB_ITEM: "(//a[@class='cart_quantity_down'][normalize-space()='-'])",
  BTN_CHECKOUT_PROFILE: "//a[@id='check-out-profile']",
  BTN_PAYMENT: "//button[normalize-space()='Thanh toán']",

  TXT_DISTRICT: "//input[@placeholder='Quận / Thị xã']",
  TXT_ADDRESS: "//input[@placeholder='Địa chỉ']",
  TXT_NAME: "//input[@placeholder='Họ và tên*']",
  TXT_PHONE: "//input[@placeholder='Số điện thoại*']",
  TXT_EMAIL: "//input[@placeholder='Email*']",
  TXT_PASSWORD: "//input[@placeholder='Mật khẩu*']",
  TXT_NOTE: "//textarea[@placeholder='Ghi chú về đơn đặt hàng của bạn.']",

  DDL_SHIP: '#select-shipper-checkout',

  clickAddItem(){
    cy.xpath(this.BTN_ADD_ITEM).click();
    return this;
  },

  clickSubItem(){
    cy.xpath(this.BTN_SUB_ITEM).click();
    return this;
  },

  clickCheckOutProfile(){
    cy.xpath(this.BTN_CHECKOUT_PROFILE).click();
    return this;
  },

  clickPayment(){
    cy.xpath(this.BTN_PAYMENT).click();
    return this;
  },

  typeDistrict(district){
    cy.xpath(this.TXT_DISTRICT).type(district);
    return this;
  },

  typeAddress(address){
    cy.xpath(this.TXT_ADDRESS).type(address);
    return this;
  },

  typeName(name){
    cy.xpath(this.TXT_NAME).type(name);
    return this;
  },

  typePhone(phone){
    cy.xpath(this.TXT_PHONE).type(phone);
    return this;
  },

  typeEmail(email){
    cy.xpath(this.TXT_EMAIL).type(email);
    return this;
  },

  typePassword(password){
    cy.xpath(this.TXT_PASSWORD).type(password);
    return this;
  },

  typeNote(note){
    cy.xpath(this.TXT_NOTE).type(note);
    return this;
  },

  selectShip(ship){
    cy.get(this.DDL_SHIP).select(ship);
    return this;
  },

  shouldShowErrorMessageSubItem(msg){
    let LBL_SUCCESS = "//div[@class='content']";
    cy.xpath(LBL_SUCCESS).should('have.text', msg);
    return this;
  },

  shouldShowMessageShip(msg){
    let LBL_SUCCESS = "//div[@class='content']";
    cy.xpath(LBL_SUCCESS).should('have.text', msg);
    return this;
  },

}