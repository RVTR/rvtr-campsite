// @ts-check
process.env.CHROMIUM_BIN = require('puppeteer').executablePath();
const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./src/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: process.env.CHROMIUM_BIN,
      args: ['--disable-gpu', '--headless'],
    },
  },
  chromeDriver:
    '../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_80.0.3987.106' +
    (process.platform === 'win32' ? '.exe' : ''),
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {},
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json'),
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
};
