import { PhotoAppPage } from './app.po';

describe('photo-app App', () => {
  let page: PhotoAppPage;

  beforeEach(() => {
    page = new PhotoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
