require('dotenv').config();

exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: process.env.END_POINT,
      show: true,          // bật browser UI (set false để chạy headless)
      browser: 'chromium'
    }
  },
  include: {
    I: './steps_file.js'
  },
  plugins: {
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
    }
  },
  bootstrap: null,
  mocha: {},
  name: 'ridervolt-end-to-end-tests'
}
