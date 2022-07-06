export const adminStaffsListPage = {
  BTN_CLOSE: "//button[contains(text(),'Đóng')]",
  BTN_CONFIRM_DELETE:
    "button[id='btn-delete-staff-user-admin-modal'][type='button']",

  clickDeleteStaff(staff) {
    let BTN_DELETE = `//button[@data-name='${staff.name}' and @data-original-title='Xoá nhân viên']`;
    cy.xpath(BTN_DELETE).click({ force: true }).wait(200);
    return this;
  },

  clickEditStaff(staff) {
    let BTN_EDIT = `//td[contains(text(),'${staff.name}')]//following-sibling::*//button[@data-original-title="Chỉnh sửa thông tin nhân viên']`;
    cy.xpath(BTN_EDIT).click({ force: true }).wait(200);
    return this;
  },

  clickConfirmDetele() {
    cy.get(this.BTN_CONFIRM_DELETE).click();
    return this;
  },

  clickClose() {
    cy.xpath(this.BTN_CLOSE).click();
    return this;
  },
};
