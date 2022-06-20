const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    supportFile: 'cypress/support/commands.js',
    baseUrl: process.env.URL,
  },
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  responseTimeout: 30000,
  requestTimeout: 30000,
  projectId: process.env.PROJECT_ID,
  env: {
    user_admin: process.env.USER_ADMIN_CYPRESS,
    pass_admin: process.env.PASS_ADMIN_CYPRESS,
    user_customer: process.env.USER_CUSTOMER_CYPRESS,
    pass_customer: process.env.PASS_CUSTOMER_CYPRESS,
    login: process.env.LOGIN_CYPRESS
  }
})
