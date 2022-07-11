import { registerPage } from "../../pageObject/registerPage";
require("cypress-xpath");

describe('Register account', () => {
  beforeEach(() => {
    cy.fixture('user.json').as('user');

    cy.visit(Cypress.env('login'));
  });


  it('Register account successfully', () => {
    cy.get('@user').then((user) => {
      registerPage
        .typeName('Mỹ Hà')
        .typeUsername(user.register[0].username+`${Math.floor(Math.random() * 100) + 1}`)
        .typeEmail(`hangocmy${Math.floor(Math.random() * 100) + 1}@gmail.com`)
        .typePassword(user.register[0].password)
        .typeRe_Password(user.register[0].re_password)
        .clickRegister()
        .shouldShowErrorMessage('Đăng ký người dùng mới thành công');
    });

    //cy.wait(500);
    //cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(500);
    //cy.url().should("include", "/admin/dashboard");
    //cy.wait(500);
    //cy.visit('/admin/customers');
    //cy.wait(500);
    //cy.xpath("(//i[@class='material-icons'][normalize-space()='delete'])").last().click();
    //cy.wait(500);
    //cy.get('#btn-delete-user-customer-modal').click()
  });


  it('Should show error message when registering an already existing username', () => {
    cy.get('@user').then((user) => {
      registerPage
        .typeName(user.register[0].name)
        .typeUsername(user.register[0].username)
        .typeEmail(user.register[0].email)
        .typePassword(user.register[0].password)
        .typeRe_Password(user.register[0].re_password)
        .clickRegister()
        .shouldShowErrorMessage('Username người dùng đăng ký đã tồn tại');
    });
  });

  it('Should show error message when registering an already existing email', () => {
    cy.get('@user').then((user) => {
      registerPage
        .typeName(user.register[1].name)
        .typeUsername(user.register[1].username)
        .typeEmail(user.register[1].email)
        .typePassword(user.register[1].password)
        .typeRe_Password(user.register[1].re_password)
        .clickRegister()
        .shouldShowErrorMessage('Username người dùng đăng ký đã tồn tại');
    });
  });

  it('Should show error message when registering a password shorter than 6 characters', () => {
    cy.get('@user').then((user) => {
      registerPage
        .typeName(user.register[2].name)
        .typeUsername(user.register[2].username)
        .typeEmail(user.register[2].email)
        .typePassword(user.register[2].password)
        .typeRe_Password(user.register[2].re_password)
        .clickRegister()
        .shouldShowErrorMessage('Mật khẩu không ngắn hơn 6 ký tự');
    });
  });

  it('Should show error message when registering a password does not match', () => {
    cy.get('@user').then((user) => {
      registerPage
        .typeName(user.register[3].name)
        .typeUsername(user.register[3].username)
        .typeEmail(user.register[3].email)
        .typePassword(user.register[3].password)
        .typeRe_Password(user.register[3].re_password)
        .clickRegister()
        .shouldShowErrorMessage('Xác thực password không giống với password vừa nhập');
    });
  });


});

