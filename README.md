# PANDAS VOUCHER SHOP

Web được phát triển dựa trên framework Nodejs + Cloud MongoAtlas + Cloud Cloudinary:

- Website bán voucher (customer server): Cung cấp các Voucher cho khách hàng có thể lựa chọn của các doanh nghiệp kinh doanh, cửa hàng nhỏ,... trên các tỉnh thành tại Việt Nam.

- Website quản lý bán voucher (Admin server): Quản lý các nhân viên kinh doanh, doanh số bán hàng, yêu cầu đổi trả, hủy đơn đặt hàng, chăm sóc khách hàng...


### CYPRESS TESTING:

- Install package:
  `npm install`

- Run cypress without GUI:
  `npx cypress open`

or

- Run all specs:
  `npx cypress run --e2e --browser chrome`

- Run specs with GUI - Dashboard Cypress:
  `npx cypress run --record --key a9faa678-4a36-43b5-beee-fe57e802c763`