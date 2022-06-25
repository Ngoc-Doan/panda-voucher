import { modalDialog } from "../../pageObject/share/common-modal-dialog";
import { mainPage } from "../../pageObject/mainPage";
require("cypress-xpath");


describe('Add to favorite list', () => {
  beforeEach(() => {
    cy.login();
  });
  

  it('View main page', () => {
    cy.logout();
    modalDialog
      .clickMainPage();
  });


  it('Add to favorite without login', () => {
    cy.logout();
    modalDialog
      .clickMainPage();
    
    mainPage
      .clickAddToFavorite()
      .shouldShowMessageAddToCart('Vui lòng đăng nhập');
  });


  it('Add to favorite list', () => {
    mainPage
      .clickAddToFavorite()
      .shouldShowMessageAddToFavorite('Thêm sản phẩm vào mục ưu thích thành công');
  });


  afterEach(() => {
    cy.logout();
  });
});

