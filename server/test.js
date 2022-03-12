/**
 * @Author: Cogic
 * @Date: 2022-03-07 22:08:43
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-08 01:19:40
 * @Description:
 */
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:8080/preview-clean/panel/622608bbe313c0da4324a62f', { waitUntil: 'networkidle2' })
  await page.screenshot({ path: 'example.png', fullPage: true })
  await browser.close()
})()
