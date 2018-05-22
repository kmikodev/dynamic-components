import { ViewsRoutingModule } from './views-routing.module';

describe('ViewsRoutingModule', () => {
  let viewsRoutingModule: ViewsRoutingModule;

  beforeEach(() => {
    viewsRoutingModule = new ViewsRoutingModule();
  });

  it('should create an instance', () => {
    expect(viewsRoutingModule).toBeTruthy();
  });
});
