import { Injectable, Module } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as path from 'path';

@Injectable()
export class PuppeteerService {
  public brs: puppeteer.Browser;

  constructor() {
    const initBrowser = async () => {
      try {
        this.brs = await puppeteer.launch({
          headless: false,
          userDataDir: `${path.join(__dirname, '../../', 'UserData')}`,
          args: [
            '--no-sandbox',
            // `--window-size=${process.env.BRS_WIDTH},${process.env.BRS_HEIGHT}`,
            '--disable-notifications',
          ],
        });
        console.log('✔ puppeteer is running');
      } catch (e) {
        console.log(e);
        console.log('❌ puppeteer is fail');
      }
    };
    initBrowser();
  }
}
