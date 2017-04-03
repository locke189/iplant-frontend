import { IplantFrontendPage } from './app.po';

describe('iplant-frontend App', function() {
  let page: IplantFrontendPage;

  beforeEach(() => {
    page = new IplantFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
