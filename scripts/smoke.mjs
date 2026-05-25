import { chromium } from 'playwright';

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5173/';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const errors = [];

page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(error.message));

await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
await page.getByRole('button', { name: /start lab/i }).first().click();
await page.waitForSelector('canvas', { state: 'visible' });
await page.waitForTimeout(1200);

const canvasBox = await page.locator('canvas').boundingBox();
if (!canvasBox || canvasBox.width < 600 || canvasBox.height < 400) {
  throw new Error(`Canvas did not render at expected size: ${JSON.stringify(canvasBox)}`);
}

await page.getByRole('button', { name: /hint/i }).click();
await page.getByRole('button', { name: /ai teacher/i }).click();
await page.waitForSelector('.hint-toast');
await page.getByRole('button', { name: /^labs$/i }).click();
await page.waitForSelector('.lab-grid');

const labCount = await page.getByRole('button', { name: /start lab/i }).count();
for (let index = 1; index < labCount; index += 1) {
  await page.getByRole('button', { name: /start lab/i }).nth(index).click();
  await page.waitForSelector('canvas', { state: 'visible' });
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: /^labs$/i }).click();
  await page.waitForSelector('.lab-grid');
}

const screenshot = await page.screenshot({ fullPage: true });
if (screenshot.byteLength < 120000) {
  throw new Error(`Screenshot looks too small for a rendered 3D lab: ${screenshot.byteLength} bytes`);
}

if (errors.length) {
  throw new Error(`Browser errors:\n${errors.join('\n')}`);
}

await browser.close();
console.log(`Smoke test passed at ${baseUrl}`);
