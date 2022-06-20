export const modalDialog = {
  clickLogout(){
    cy.xpath("//a[contains(text(),'Đăng xuất')]").click();
  },
  
  typeUsername(username) {
    cy.get('#login_form > [type="text"]').type(username);
    return this;
  },

  typePassword(password) {
    cy.get('#login_form > [type="password"]').type(password);
    return this;
  },

  clickLogin() {
    cy.get('#login-button').click();
    return this;
  },

}
