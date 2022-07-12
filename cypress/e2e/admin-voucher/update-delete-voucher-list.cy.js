import { format, compareAsc } from 'date-fns'
import addDays from 'date-fns/addDays';
import { common } from "../../pageObject/admin/common";
import { adminAddVoucherPage } from "../../pageObject/admin/adminAddVoucherPage";
import { adminVouchersListPage } from "../../pageObject/admin/adminVoucherListPage";
require("cypress-xpath");


//run test case add voucher
import "./add-voucher.cy";

let todayDate = new Date();
let modifyDate = addDays(todayDate, 25);


describe('MODULE VOUCHERS LIST', () => {
  beforeEach(() => {
    cy.fixture('voucher.json').as('voucher');

    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(500);
    cy.url().should("include", common.LNK_DASHBOARD);
  });


  it('Edit voucher successfully', () => {
    cy.visit(common.LNK_VOUCHERS).wait(500);
    
    cy.get('@voucher').then((voucher) => {
      adminVouchersListPage
        .clickEdit();

      adminAddVoucherPage
        .typeName(voucher.voucher[1].name)
        .typePrice(voucher.voucher[1].price)
        .selectOptionBranch(voucher.voucher[1].branch)
        .selectOptionCategory(voucher.voucher[1].category)
        .typeDate(format(modifyDate, 'yyyy-MM-dd'))
        .uploadImage(voucher.voucher[1].image)
        .typeDescription(voucher.voucher[1].description)
      
      adminVouchersListPage
        .clickUpdate()
        .shouldShowSuccessMessage('Cập nhật sản phẩm thành công');
    });
  
  });


  it('Delete voucher successfully', () => {
    cy.visit(common.LNK_VOUCHERS).wait(500);
  
    adminVouchersListPage 
      .clickDelete()
      .clickConfirmDetele()
      .shouldShowSuccessMessage('Xoá sản phẩm thành công');
  });

});


