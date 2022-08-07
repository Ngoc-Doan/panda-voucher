export const adminStaffsListPage = {
  BTN_CLOSE: "//button[contains(text(),'Đóng') and @type='button']",
  BTN_CONFIRM_DELETE:
    "button[id='btn-delete-staff-user-admin-modal'][type='button']",

  clickDeleteStaff(staff) {
    let BTN_DELETE = `//button[@data-name='${staff.name}' and @data-original-title='Xoá nhân viên']`;
    cy.xpath(BTN_DELETE).click({ force: true }).wait(200);
    return this;
  },

  clickEditStaff(staff) {
    let BTN_EDIT = `//td[contains(text(),'${staff.name}')]`;
    cy.xpath(BTN_EDIT)
      .parent()
      .find(
        "button[title][data-original-title='Chỉnh sửa thông tin nhân viên'] > a"
      )
      .click({ force: true })
      .wait(500);
    return this;
  },

  shouldNotExist(staff) {
    let TXT_STAFF_NAME = `//td[contains(text(),'${staff.name}')]`;
    cy.xpath(TXT_STAFF_NAME).should("not.exist");
  },

  clickConfirmDetele() {
    cy.get(this.BTN_CONFIRM_DELETE).click();
    return this;
  },

  clickClose() {
    cy.xpath(this.BTN_CLOSE).click({ force: true });
    return this;
  },
};
