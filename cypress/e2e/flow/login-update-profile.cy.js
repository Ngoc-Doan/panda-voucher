import { loginPage } from "../../pageObject/loginPage";
import { profilePage } from "../../pageObject/profilePage";
require("cypress-xpath");

describe("FLOW PROFILE: LOGIN - UPDATE ACCOUNT SUCCESSFULLY", () => {
  beforeEach(() => {
    cy.fixture("user.json").as("user");

    cy.visit(Cypress.env("login"));
    cy.wait(3000);
  });

  it("Should redirect to main page when login successfully", () => {
    loginPage
      .typeUsername(Cypress.env("user_customer"))
      .typePassword(Cypress.env("pass_customer"))
      .clickLogin();
    cy.url('/');
  });

  /*=== ISSUE ===*/
  //it('Update profile successfully', () => {
  //  let r = (Math.random() + 1).toString(36).substring(7);
  //  cy.get('@update').then((update) => {
  //    profilePage
  //      .clickProfile()
  //      .clickEdit()
  //      .typePhone(update.profile[1].phone)
  //      .typeEmail(update.profile[1].email)
  //      .typeWebsite(update.profile[1].website)
  //      .typeStreet(`District ${r}${Math.floor(Math.random() * 100) + 1}`)
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