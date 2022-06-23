export const blogPage = {

  BTN_DETAIL: "(//a[@class='btn btn-primary'][contains(text(),'Đọc thêm')])[1]",

  clickBlog(){
    cy.get('.sub-menu').invoke('show').contains('a', 'Danh sách Blog').should('have.attr', 'href', './blog');
    cy.visit('/blog');
    return this;
  },

  clickDetailBlog(){
    cy.xpath(this.BTN_DETAIL).click();
    return this;
  },

}