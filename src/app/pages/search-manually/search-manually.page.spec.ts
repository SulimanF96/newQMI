import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchManuallyPage } from './search-manually.page';

describe('SearchManuallyPage', () => {
  let component: SearchManuallyPage;
  let fixture: ComponentFixture<SearchManuallyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchManuallyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchManuallyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
