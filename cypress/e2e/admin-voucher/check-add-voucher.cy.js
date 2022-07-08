import { common } from "../../pageObject/admin/common";
import { adminAddVoucherPage } from "../../pageObject/admin/adminAddVoucherPage";
import { format, compareAsc } from 'date-fns'
import addDays from 'date-fns/addDays';
require("cypress-xpath");

let todayDate = new Date();
let modifyDate = addDays(todayDate, 1);

describe('CHECK ADD VOUCHER', () => {
  beforeEach(() => {
    cy.fixture('voucher.json').as('voucher');

    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(500);
    cy.url().should("include", common.LNK_DASHBOARD);
  });


  it('Should show error message when missing name voucher', () => {
    cy.visit(common.LNK_ADD_VOUCHER).wait(500);

    cy.get('@voucher').then((voucher) => {
      adminAddVoucherPage
        .typePrice(voucher.voucher[0].price)
        .selectOptionBranch(voucher.voucher[0].branch)
        .selectOptionCategory(voucher.voucher[0].category)
        .typeDate(format(modifyDate, 'yyyy-MM-dd'))
        .clickCheckSign()
        .uploadImage(voucher.voucher[0].image)
        .typeDescription(voucher.voucher[0].description) 
        .clickAddVoucher()
        .shouldShowSuccessMessage('Vui lòng cung cấp tên sản phẩm');
    });
  });


  it('Should show error message when missing price voucher', () => {
    cy.visit(common.LNK_ADD_VOUCHER).wait(500);

    cy.get('@voucher').then((voucher) => {
      adminAddVoucherPage
        .typeName(voucher.voucher[0].name)
        .selectOptionBranch(voucher.voucher[0].branch)
        .selectOptionCategory(voucher.voucher[0].category)
        .typeDate(format(modifyDate, 'yyyy-MM-dd'))
        .clickCheckSign()
        .uploadImage(voucher.voucher[0].image)
        .typeDescription(voucher.voucher[0].description) 
        .clickAddVoucher()
        .shouldShowSuccessMessage('Vui lòng cung cấp giá tiền sản phẩm');
    });
  });


  it('Should show error message when missing branch', () => {
    cy.visit(common.LNK_ADD_VOUCHER).wait(500);

    cy.get('@voucher').then((voucher) => {
      adminAddVoucherPage
        .typeName(voucher.voucher[0].name)
        .typePrice(voucher.voucher[0].price)
        .selectOptionCategory(voucher.voucher[0].category)
        .typeDate(format(modifyDate, 'yyyy-MM-dd'))
        .clickCheckSign()
        .uploadImage(voucher.voucher[0].image)
        .typeDescription(voucher.voucher[0].description) 
        .clickAddVoucher()
        .shouldShowSuccessMessage('Vui lòng chọn tên thương hiệu');
    });
  });


  it('Should show error message when missing type', () => {
    cy.visit(common.LNK_ADD_VOUCHER).wait(500);

    cy.get('@voucher').then((voucher) => {
      adminAddVoucherPage
        .typeName(voucher.voucher[0].name)
        .typePrice(voucher.voucher[0].price)
        .selectOptionBranch(voucher.voucher[0].branch)
        .typeDate(format(modifyDate, 'yyyy-MM-dd'))
        .clickCheckSign()
        .uploadImage(voucher.voucher[0].image)
        .typeDescription(voucher.voucher[0].description) 
        .clickAddVoucher()
        .shouldShowSuccessMessage('Vui lòng chọn nhóm phân loại');
    });
  });


  it('Should show error message when missing date', () => {
    cy.visit(common.LNK_ADD_VOUCHER).wait(500);

    cy.get('@voucher').then((voucher) => {
      adminAddVoucherPage
        .typeName(voucher.voucher[0].name)
        .typePrice(voucher.voucher[0].price)
        .selectOptionBranch(voucher.voucher[0].branch)
        .selectOptionCategory(voucher.voucher[0].category)
        .clickCheckSign()
        .uploadImage(voucher.voucher[0].image)
        .typeDescription(voucher.voucher[0].description) 
        .clickAddVoucher()
        .shouldShowSuccessMessage('Vui lòng chọn ngày hết hạn sản phẩm');
    });
  });

});


