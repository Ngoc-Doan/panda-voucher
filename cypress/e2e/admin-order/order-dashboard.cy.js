import { common } from "../../pageObject/admin/common";
import { adminOrderPage } from "../../pageObject/admin/adminOrderPage";
require("cypress-xpath");


describe('ORDER DASHBOARD', () => {
  beforeEach(() => {
    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(500);
    cy.url().should("include", common.LNK_DASHBOARD);
  });


  it('Click tab unconfirmed', () => {
    cy.visit(common.LNK_DASHBOARD).wait(500);
    
    adminOrderPage
      .clickTabUnconfirmed();
  });


  it('Click tab cancel', () => {
    cy.visit(common.LNK_DASHBOARD).wait(500);
    
    adminOrderPage
      .clickTabCancel();
  });


  it('Click tab shipping', () => {
    cy.visit(common.LNK_DASHBOARD).wait(500);

    adminOrderPage
      .clickTabShipping();
  });

  
  it('Click tab revenue', () => {
    cy.visit(common.LNK_DASHBOARD).wait(500);

    adminOrderPage
      .clickTabRevenue();
  });

});


