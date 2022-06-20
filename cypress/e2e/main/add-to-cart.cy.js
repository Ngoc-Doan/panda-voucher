import { mainPage } from "../../pageObject/mainPage";
require("cypress-xpath");

describe('Add to cart', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('login'));

    cy.login();
  });

  it('Add to cart', () => {
    cy.visit('/');

    mainPage
      .clickAddToCart()
      //.shouldShowErrorMessage('Thêm sản phẩm vào giỏ hàng thành công')
    
  });

  //afterEach(() => {
  //  cy.logout();
  //});
});

