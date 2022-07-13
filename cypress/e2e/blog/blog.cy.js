import { blogPage } from "../../pageObject/blogPage";
require("cypress-xpath");

describe('MODULE BLOG', () => {
  
  beforeEach(() => {
    cy.login().wait(500);
  });


  it('Visit blog', () => {
    blogPage
      .clickBlog();
  });


  it('View blog', () => {
    blogPage
      .clickBlog()
      .clickDetailBlog();
  });
});

