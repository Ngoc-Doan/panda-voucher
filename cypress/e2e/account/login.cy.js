import { loginPage } from "../../pageObject/loginPage";
require("cypress-xpath");

describe('Login with created account', () => {
  beforeEach(() => {
    cy.fixture('user.json').as('user');

    cy.visit(Cypress.env('login'));
    cy.wait(3000);
  });


  it('Should redirect to main page when login successfully', () => {
    loginPage
      .typeUsername(Cypress.env('user_customer'))
      .typePassword(Cypress.env('pass_customer'))
      .clickLogin();
  });


  it('Should show error message when missing username', () => {
    cy.get('@user').then((user) => {
      loginPage
        .typePassword(user.login[0].password)
        .clickLogin()
        .shouldShowErrorMessage('Vui lòng nhập username');
    });
  });


  it('Should show error message when missing password', () => {
    cy.get('@user').then((user) => {
      loginPage
        .typeUsername(user.login[1].username)
        .clickLogin()
        .shouldShowErrorMessage('Vui lòng nhập mật khẩu');
    });
  });


  it('Should show error message when missing username and password', () => {
    loginPage
      .clickLogin()
      .shouldShowErrorMessage('Vui lòng nhập username');
  });


  it('Should show error message when invalid username', () => {
    cy.get('@user').then((user) => {
      loginPage
        .typeUsername(user.login[3].username)
        .typePassword(user.login[3].password)
        .clickLogin()
        .shouldShowErrorMessage('Username hoặc password sai, vui lòng nhập lại');
    });
  });


  it('Should show error message when invalid password', () => {
    cy.get('@user').then((user) => {
      loginPage
        .typeUsername(user.login[4].username)
        .typePassword(user.login[4].password)
        .clickLogin()
        .shouldShowErrorMessage('Username hoặc password sai, vui lòng nhập lại');
    });
  });


  it('Should show error message when invalid username and password', () => {
    cy.get('@user').then((user) => {
      loginPage
        .typeUsername(user.login[5].username)
        .typePassword(user.login[5].password)
        .clickLogin()
        .shouldShowErrorMessage('Username hoặc password sai, vui lòng nhập lại');
    })
  });
});

