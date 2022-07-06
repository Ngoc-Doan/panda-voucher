export const adminAuthorizeUserPage = {
  DDL_SELECT_STAFF_NAME: "select[id='option-staffs']",
  TXT_PASSWORD: "[id='password'][type='password']",
  BTN_UPDATE: "//button[contains(text(),'Cập nhật')]",

  selectStaff(staff) {
    cy.get(this.DDL_SELECT_STAFF_NAME).select(staff.name);
    return this;
  },

  selectRight(right) {
    let CHK_RIGHT = `//label[contains(text(),'${right}')]//parent::label//input[@type="checkbox"]`;
    cy.xpath(CHK_RIGHT).check({ force: true });
    return this;
  },

  authorizeMultipleRightFor(staff) {
    if (staff.right.length == 0) {
      cy.log("Không có quyển nào hết");
      return this;
    }
    for (var i = 0; i < staff.right.length; i++) {
      this.selectRight(staff.right[i]);
    }
    return this;
  },

  typePassword(password) {
    cy.get(this.TXT_PASSWORD).type(password);
    return this;
  },

  clickUpdate() {
    cy.xpath(this.BTN_UPDATE).click();
    return this;
  },
};
