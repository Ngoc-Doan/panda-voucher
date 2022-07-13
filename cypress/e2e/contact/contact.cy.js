import { modalDialog } from "../../pageObject/share/common-modal-dialog";
import { contactPage } from "../../pageObject/contactPage";
require("cypress-xpath");


describe('MODULE CONTACT', () => {
  beforeEach(() => {
    cy.fixture('create.json').as('create');
    cy.login().wait(1000);
  });


  it('Send message', () => {
    cy.logout().wait(1000);

    modalDialog
      .clickContactPage();
    
    cy.wait(1000);

    cy.get('@create').then((create) => {
      contactPage
        .typeName(create.contact[0].name)
        .typeEmail(create.contact[0].email)
        .typeTitle(create.contact[0].title)
        .typeMessage(create.contact[0].message)
        .clickSubmit()
        .shouldShowMessage('Gửi yêu cầu thành công');
    });
  });


  it('Should show error message when missing add field', () => {
    cy.logout().wait(1000);

    modalDialog
      .clickContactPage();

    cy.wait(1000);
    
    contactPage
      .clickSubmit()
      .shouldShowMessage('Vui lòng cung cấp họ tên của bạn');
  });


  it('Should show error message when missing name', () => {
    cy.logout().wait(1000);

    modalDialog
      .clickContactPage();

    cy.wait(1000);
    
    cy.get('@create').then((create) => {
      contactPage
        .typeEmail(create.contact[1].email)
        .typeTitle(create.contact[1].title)
        .typeMessage(create.contact[1].message)
        .clickSubmit()
        .shouldShowMessage('Vui lòng cung cấp họ tên của bạn');
    });
  });


  it('Should show error message when missing email', () => {
    cy.logout().wait(1000);

    modalDialog
      .clickContactPage();

    cy.wait(1000);
    
    cy.get('@create').then((create) => {
      contactPage
        .typeName(create.contact[1].name)
        .typeTitle(create.contact[1].title)
        .typeMessage(create.contact[1].message)
        .clickSubmit()
        .shouldShowMessage('Vui lòng nhập địa chỉ email');
    });
  });


  it('Should show error message when missing title', () => {
    cy.logout().wait(1000);

    modalDialog
      .clickContactPage();

    cy.wait(1000);
    
    cy.get('@create').then((create) => {
      contactPage
        .typeName(create.contact[1].name)
        .typeEmail(create.contact[1].email)
        .typeMessage(create.contact[1].message)
        .clickSubmit()
        .shouldShowMessage('Vui lòng cung cấp tiêu đề');
    });
  });


  it('Should show error message when missing message', () => {
    cy.logout().wait(1000);

    modalDialog
      .clickContactPage();

    cy.wait(1000);
    
    cy.get('@create').then((create) => {
      contactPage
        .typeName(create.contact[1].name)
        .typeEmail(create.contact[1].email)
        .typeTitle(create.contact[1].title)
        .clickSubmit()
        .shouldShowMessage('Vui lòng cung cấp tin nhắn mà bạn cần gửi');
    });
  });
  

  //afterEach(() => {
  //  cy.logout();
  //});
});