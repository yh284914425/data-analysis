const puppeteer = require('puppeteer');

function ss(time) {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time);
  })

}

(async () => {
  const browser = await (puppeteer.launch({ //设置超时时间
    timeout: 15000,
    //如果是访问https页面 此属性会忽略https错误
    ignoreHTTPSErrors: true,
    // 打开开发者工具, 当此值为true时, headless总为false
    devtools: true,
    // 关闭headless模式, 不会打开浏览器
    headless: true
  }));
  const page = await browser.newPage();

  await page.goto(`http://www.iwencai.com/stockpick?qs=return_stock`);

  // 浏览器内执行

  
  await page.type('.scroll_con textarea', "macd底背离");
  await page.click('#qs-enter');
  await ss(1500)
  let res = await page.$eval('.natl_words .natl_num', el => el.innerHTML);
  console.log(res)
  browser.close();
})();


(async () => {
  const browser = await (puppeteer.launch({ //设置超时时间
    timeout: 15000,
    //如果是访问https页面 此属性会忽略https错误
    ignoreHTTPSErrors: true,
    // 打开开发者工具, 当此值为true时, headless总为false
    devtools: true,
    // 关闭headless模式, 不会打开浏览器
    headless: true
  }));
  const page = await browser.newPage();

  await page.goto(`http://www.iwencai.com/stockpick?qs=return_stock`);

  // 浏览器内执行

  await page.type('.scroll_con textarea', "macd顶背离");
  await page.click('#qs-enter');

  await ss(1500)
  let res = await page.$eval('.natl_words .natl_num', el => el.innerHTML);
  console.log(res)
  browser.close();
//xixi
})();