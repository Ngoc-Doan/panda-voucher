import { modalDialog } from "../../pageObject/share/common-modal-dialog";
import { mainPage } from "../../pageObject/mainPage";
require("cypress-xpath");


describe('MODULE MAIN PAGE - ADD TO FAVORITE LIST', () => {
  beforeEach(() => {
    cy.login();
  });


  it('Add to favorite without login', () => {
    cy.logout().wait(500);

    modalDialog
      .clickMainPage();
    
    mainPage
      .clickAddToFavorite()
      .shouldShowMessageAddToFavorite('Vui lòng đăng nhập');
  });


  it('Add to favorite list', () => {
    mainPage
      .clickAddToFavorite()
      .shouldShowMessageAddToFavorite('Thêm sản phẩm vào mục ưu thích thành công');

    cy.logout().wait(500);
  });

});

