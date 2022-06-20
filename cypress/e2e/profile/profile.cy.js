import { profilePage } from "../../pageObject/profilePage";
require("cypress-xpath");

describe('Update account', () => {
  beforeEach(() => {
    cy.fixture('update.json').as('update');

    cy.visit(Cypress.env('login'));

    cy.login();
  });

  it('Should show error message when updating password does not match', () => {
    cy.get('@update').then((update) => {
      profilePage
        .clickProfile()
        .clickEdit()
        .typePhone(update.profile[0].phone)
        .typeEmail(update.profile[0].email)
        .typeWebsite(update.profile[0].website)
        .typeStreet(update.profile[0].street)
        .typeCity(update.profile[0].city)
        .typeState(update.profile[0].state)
        .typeZip(update.profile[0].zip)
        .typeDescription(update.profile[0].description)
        .typePassword(update.profile[0].password)
        .clickUpdate()
        .shouldShowErrorMessage('Email đã tồn tại hoặc bạn chưa đổi email');
    });
  });

  //it('Update profile successfully', () => {
  //  cy.get('@update').then((update) => {
  //    profilePage
  //      .clickProfile()
  //      .clickEdit()
  //      .typePhone(update.profile[1].phone)
  //      .typeEmail(update.profile[1].email)
  //      .typeWebsite(update.profile[1].website)
  //      .typeStreet(update.profile[1].street)
  //      .typeCity(update.profile[1].city)
  //      .typeState(update.profile[1].state)
  //      .typeZip(update.profile[1].zip)
  //      .typeDescription(update.profile[1].description)
  //      .typePassword(Cypress.env('pass_customer'))
  //      .clickUpdate();
  //  });
  //});

  afterEach(() => {
    cy.logout();
  });
});

