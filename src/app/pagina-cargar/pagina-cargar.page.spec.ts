import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaginaCargarPage } from './pagina-cargar.page';

describe('PaginaCargarPage', () => {
  let component: PaginaCargarPage;
  let fixture: ComponentFixture<PaginaCargarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaCargarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaCargarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
