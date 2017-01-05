import { TestImgPage } from './app.po';

describe('test-img App', function() {
  let page: TestImgPage;

  beforeEach(() => {
    page = new TestImgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
