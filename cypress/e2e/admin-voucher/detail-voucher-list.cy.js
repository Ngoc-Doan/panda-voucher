import { common } from "../../pageObject/admin/common";
import { adminVouchersListPage } from "../../pageObject/admin/adminVoucherListPage";
require("cypress-xpath");


describe('MODULE VOUCHERS LIST', () => {
  beforeEach(() => {
    cy.fixture('voucher.json').as('voucher');

    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(500);
    cy.url().should("include", common.LNK_DASHBOARD);
  });


  it('Detail voucher', () => {
    cy.visit(common.LNK_VOUCHERS).wait(500);
    
    adminVouchersListPage
      .clickDetail();
  });
});


