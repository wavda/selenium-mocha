const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Login', function() {
  this.timeout(30000);
  let driver;
  before(async function () {
    driver = await new Builder().forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build();
  });

  after(async function () {
    await driver.quit();
  });

  it('Login', async () => {
    await driver.get("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await driver.manage().window().setRect({ width: 1936, height: 1048 });
    await driver.wait(until.titleContains("OrangeHRM"), 30000);
    await driver.wait(until.elementLocated(By.name("username")), 30000);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.name("username"))), 30000);
    await driver.findElement(By.name("username")).sendKeys("Admin");
    await driver.wait(until.elementIsVisible(await driver.findElement(By.name("username"))), 30000);
    await driver.wait(until.elementLocated(By.name("password")), 30000);
    await driver.findElement(By.name("password")).sendKeys("admin123");
    await driver.findElement(By.name("password")).sendKeys(Key.ENTER);
    await driver.wait(until.urlContains("dashboard"), 30000);
  }), 30000;
});