import { modalDialog } from "../../pageObject/share/common-modal-dialog";
require("cypress-xpath");


describe('MODULE PAYMENT', () => {
  beforeEach(() => {
    cy.login();
  });


  it('Access to payment successfully', () => {
    modalDialog
      .clickPaymentPage();
  });

  afterEach(() => {
    cy.logout();
  });
});