import { BtcWalletPage } from './app.po';

describe('btc-wallet App', () => {
  let page: BtcWalletPage;

  beforeEach(() => {
    page = new BtcWalletPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
