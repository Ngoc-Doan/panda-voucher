export const adminOrderPage = {
  BTN_DETAIL: "(//i[@class='material-icons'][normalize-space()='preview'])",
  BTN_CONFIRM_ORDER: "(//i[contains(text(),'check')])",

  TAB_UNCONFIRMED: "//a[@class='nav-link active']",
  TAB_CANCEL: "//a[@href='#settings']",
  TAB_REVENUE: "//a[@href='#messages']",
  TAB_SHIPPING: "//a[@href='#receives']",

  clickDetail(){
    cy.xpath(this.BTN_DETAIL).last().click();
    return this;
  },

  clickConfirmOrder(){
    cy.xpath(this.BTN_CONFIRM_ORDER).last().click();
    return this;
  },

  clickTabUnconfirmed(){
    cy.xpath(this.TAB_UNCONFIRMED).click();
    return this;
  },

  clickTabCancel(){
    cy.xpath(this.TAB_CANCEL).click();
    return this;
  },

  clickTabShipping(){
    cy.xpath(this.TAB_SHIPPING).click();
    return this;
  },

  clickTabRevenue(){
    cy.xpath(this.TAB_REVENUE).click();
    return this;
  },
}