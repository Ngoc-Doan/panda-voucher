export const blogPage = {

  clickBlog(){
    cy.get('.mainmenu > .nav > :nth-child(3) > [href="#"]').trigger('mouseover', 20, 20).click();

    //cy.contains('Danh sách Blog').click()
    //cy.xpath("//a[normalize-space()='Danh sách Blog']").click();  
    return this;
  },

  clickListBlog(){
    cy.get('.sub-menu').click();
    return this;
  },

  shouldShowErrorMessage(msg){
    cy.wait(400);
    let LBL_ERROR= `//div[@class='show-error-message-edit-profile']`;
    cy.xpath(LBL_ERROR).should('have.text', msg);
    return this;
  }

}