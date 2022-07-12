import { common } from "../../pageObject/admin/common";

export const adminAuthorizeUserPage = {
  DDL_SELECT_STAFF_NAME: "select[id='option-staffs']",
  TXT_PASSWORD: "[id='password'][type='password']",
  BTN_UPDATE: "//button[contains(text(),'Cập nhật')]",

  TXT_ERROR_POPUP: "div[id='message-alert-show']",

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
    for (var i = 0; i < staff.right.length; i++) {
      this.selectRight(staff.right[i]);
    }
    return this;
  },

  showCorrectRights(staff) {
    let TXT_STAFF_NAME = `//td[contains(text(),'${staff.name}')]`;

    if (staff.right.length == 0) {
      cy.log("Không có quyển nào hết");
      cy.xpath(TXT_STAFF_NAME)
        .parent()
        .find("td div")
        .should("include.text", "Nhân viên không có quyền hạn");
    } else {
      cy.xpath(TXT_STAFF_NAME)
        .parent()
        .find("ol li")
        .each(($ele, index) => {
          cy.log(staff.right[index], $ele.text().trim());
          expect(staff.right[index]).to.equal($ele.text().trim());
        });
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

  shouldShowErrorMessage() {
    cy.get(this.TXT_ERROR_POPUP)
      .should("be.visible")
      .wait(4000)
      .and("not.be.visible");
    return this;
  },
};
