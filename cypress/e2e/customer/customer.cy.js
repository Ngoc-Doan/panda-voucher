import { registerPage } from "../../pageObject/registerPage";
import { common } from "../../pageObject/admin/common";
import { adminCustomerPage } from "../../pageObject/admin/adminCustomerPage";
require("cypress-xpath");


describe('REGISTER ACCOUNT', () => {
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
  });
});


describe('MODULE ADMIN CUSTOMER', () => {
  beforeEach(() => {
    cy.fixture('user.json').as('user');

    cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(500);
    cy.url().should("include", common.LNK_DASHBOARD);
  });


  it('Update customer successfully', () => {
    cy.visit(common.LNK_CUSTOMER).wait(500);

    cy.get('@user').then((user) => {
      adminCustomerPage
        .clickEdit()
        .typeAddress(user.customer[0].address)
        .typeDistrict(user.customer[0].district)
        .typeCity(user.customer[0].city)
        .typePhone(`012345678${Math.floor(Math.random() * 10)}`)
        .typePassword(Cypress.env('pass_admin'))
        .clickUpdate()
    });
  });


  it('Delete customer successfully', () => {
    cy.visit(common.LNK_CUSTOMER).wait(500);
    adminCustomerPage
      .clickDelete()
      .clickConfirmDetele();
  });

});


