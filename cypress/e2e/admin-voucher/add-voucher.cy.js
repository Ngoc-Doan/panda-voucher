import { common } from "../../pageObject/admin/common";
import { adminAddVoucherPage } from "../../pageObject/admin/adminAddVoucherPage";
import { format, compareAsc } from 'date-fns'
import addDays from 'date-fns/addDays';
require("cypress-xpath");

let todayDate = new Date();
let modifyDate = addDays(todayDate, 15);

describe('MODULE ADD VOUCHER', () => {
  beforeEach(() => {
    cy.fixture('voucher.json').as('voucher');

    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(500);
    cy.url().should("include", common.LNK_DASHBOARD);
  });


  it('Add voucher successfully', () => {
    cy.visit(common.LNK_ADD_VOUCHER).wait(500);

    cy.get('@voucher').then((voucher) => {
      adminAddVoucherPage
        .typeName(voucher.voucher[0].name)
        .typePrice(voucher.voucher[0].price)
        .selectOptionBranch(voucher.voucher[0].branch)
        .selectOptionCategory(voucher.voucher[0].category)
        .typeDate(format(modifyDate, 'yyyy-MM-dd'))
        .clickCheckSign()
        .uploadImage(voucher.voucher[0].image)
        .typeDescription(voucher.voucher[0].description) 
        .clickAddVoucher()
        .shouldShowSuccessMessage('Thêm sản phẩm mới thành công');
    });
  });

});


