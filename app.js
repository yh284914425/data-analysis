const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
function ss(time) {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time);
  })

}



setInterval(() => {
  let date = new Date()
   
  let obj = new Object();

  if ((date.getHours() == '10' && date.getMinutes() == '30' && date.getSeconds() == '10')||(date.getHours() == '10' && date.getMinutes() == '30' && date.getSeconds() == '10')) {
      (async () => {
        const browser = await (puppeteer.launch({ //设置超时时间
          timeout: 15000,
          //如果是访问https页面 此属性会忽略https错误
          ignoreHTTPSErrors: true,
          // 打开开发者工具, 当此值为true时, headless总为false
          devtools: true,
          // 关闭headless模式, 不会打开浏览器
          args: ['--disable-gpu', '--no-sandbox', '--lang=en-US', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
          headless: true
        }));
        let page = await browser.newPage();

        await page.goto(`http://www.iwencai.com/stockpick?qs=return_stock`);
        await page.type('.scroll_con textarea', "macd底背离");
        await page.click('#qs-enter');
        await ss(2500)
        let res = await page.$eval('.natl_words .natl_num', el => el.innerHTML);
        obj['macd底背离'] = res

    
        page = await browser.newPage();
        await page.goto(`http://www.iwencai.com/stockpick?qs=return_stock`);
        await page.type('.scroll_con textarea', "macd顶背离");
        await page.click('#qs-enter');
        await ss(2500)
        res = await page.$eval('.natl_words .natl_num', el => el.innerHTML);
        obj['macd顶背离'] = res


        page = await browser.newPage();
        await page.goto(`http://www.iwencai.com/stockpick?qs=return_stock`);
        await page.type('.scroll_con textarea', "上证指数30分钟底背离");
        await page.click('#qs-enter');
        await ss(2500)
        res = await page.$eval('.long_words .natl_num', el => el.innerHTML);
        obj['上证指数30分钟底背离'] = res

        page = await browser.newPage();
        await page.goto(`http://www.iwencai.com/stockpick?qs=return_stock`);
        await page.type('.scroll_con textarea', "上证指数60分钟底背离");
        await page.click('#qs-enter');
        await ss(2500)
        res = await page.$eval('.long_words .natl_num', el => el.innerHTML);
        obj['上证指数60分钟底背离'] = res


        page = await browser.newPage();
        await page.goto(`http://www.iwencai.com/stockpick?qs=return_stock`);
        await page.type('.scroll_con textarea', "创业板指数30分钟底背离");
        await page.click('#qs-enter');
        await ss(2500)
        res = await page.$eval('.long_words .natl_num', el => el.innerHTML);
        obj['创业板指数30分钟底背离'] = res

        page = await browser.newPage();
        await page.goto(`http://www.iwencai.com/stockpick?qs=return_stock`);
        await page.type('.scroll_con textarea', "创业板指数60分钟底背离");
        await page.click('#qs-enter');
        await ss(2500)
        res = await page.$eval('.long_words .natl_num', el => el.innerHTML);
        obj['创业板指数60分钟底背离'] = res

        sendEmail(obj)
        browser.close();
      })();



  }
}, 1000)


function sendEmail(obj) {

  let str = ''
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      str+=`${key}:${obj[key]}   `
      
    }
  }

  // 1. 创建
  const transport = nodemailer.createTransport(smtpTransport({
    host: "smtp.qq.com", // qq邮箱主机
    secure: true, // 使用 SSL
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
      user: "284914425@qq.com", // 账号   你自定义的域名邮箱账号
      pass: "atfozmhtzwovcbah"    // 密码   你自己开启SMPT获取的密码
    }
  }));

  // 2. 邮件的具体信息
  const mailOptions = {
    from: '284914425@qq.com',  //发送邮件的邮箱，与上面 user 相同
    to: 'yh284914425@163.com',  //接收邮件的邮箱，如有多个，用逗号隔开
    subject: `${str}`,  //邮件标题
    html: `<p> ${str}</p>` //邮件内容，可以为html
  };

  // 3. 发送邮件
  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent: ' + info.response);
    }
  });
}