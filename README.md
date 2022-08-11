### CYPRESS TESTING:

# RUN CYPRESS ON LOCAL

- Install package:
  `npm install`

- Run app:
  `npm start`

- Run cypress with GUI:
  `npx cypress open`
  Choose specific spec file and run

- Run all specs without GUI:
  `npx cypress run --e2e --browser chrome`

- Run specs without GUI - report on Dashboard Cypress:
  `npx cypress run --record --key ba91936f-b6a9-4220-8b4d-96e4968aaa83`

# (CI/CD)

- Check the latest action in: https://github.com/Ngoc-Doan/panda-voucher/actions

# HOW TO WATCH TEST RESULT ON CYPRESS DASHBOARD:

- Open browser and go to https://dashboard.cypress.io/projects/j2zxfj/runs
- Choose latest runs and view

or

- Open defects list: https://github.com/users/hangocmy/projects/10/views/5

# ABOUT PANDAS VOUCHER SHOP

Web được phát triển dựa trên framework Nodejs + Cloud MongoAtlas + Cloud Cloudinary:

- Github: https://github.com/Ngoc-Doan/panda-voucher.git

- Website bán voucher (customer server): Cung cấp các Voucher cho khách hàng có thể lựa chọn của các doanh nghiệp kinh doanh, cửa hàng nhỏ,... trên các tỉnh thành tại Việt Nam.
  http://pandasnd.azurewebsites.net/
  Username: hangocmy
  Password: M@123456

- Website quản lý bán voucher (Admin server): Quản lý các nhân viên kinh doanh, doanh số bán hàng, yêu cầu đổi trả, hủy đơn đặt hàng, chăm sóc khách hàng...
  http://pandasnd.azurewebsites.net/22012000/login
  Username: admin30
  Password: 123123
