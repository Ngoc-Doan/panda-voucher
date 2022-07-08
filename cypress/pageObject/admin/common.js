export const common = {
  LNK_DASHBOARD: "/admin/dashboard",
  LNK_AUTHORIZATION: "/admin/permissions",
  LNK_STAFF: "/admin/staffs",
  LNK_CUSTOMER: "/admin/customers",
  LNK_ORDER: "/admin/table",
  LNK_VOUCHER: "/admin/vouchers",
  LNK_SUPPORT: "/admin/questions",
  LNK_REVIEWS: "/admin/reviews",
  LNK_ADD_PRODUCT: "/admin/add-product",
  LNK_ADD_STAFF: "/admin/add-staff",
  LNK_ADD_CATEGORY: "/admin/add-category",
  LNK_ADD_BRAND: "/admin/add-brand",
  LNK_EDIT_USER: "/admin/user",
  LNK_CHANGE_PASSWORD: "/admin/passwords",
  LNK_CUSTOMER: "/admin/customers",
  LNK_ORDER: "/admin/table",

  LNK_LOGOUT: "/22012000/login/logout",

  DDL_PROFILE: "#navbarDropdownProfile",
  DDL_LOGOUT: "//a[contains(text(),'Đăng xuất')]",

  clickProfile() {
    cy.get(this.DDL_PROFILE).click();
    return this;
  },

  clickLogout() {
    cy.xpath(this.DDL_LOGOUT).click();
    return this;
  },
};
