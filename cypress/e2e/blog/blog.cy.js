import { blogPage } from "../../pageObject/blogPage";
require("cypress-xpath");

describe('Update account', () => {
  beforeEach(() => {
    cy.fixture('update.json').as('update');

    cy.visit(Cypress.env('login'));

    cy.login();
  });

  it('View blog', () => {
    blogPage
      .clickBlog()
      //.clickListBlog()
  });

  afterEach(() => {
    cy.logout();
  });

});

