import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaginaReciclajePage } from './pagina-reciclaje.page';

describe('PaginaReciclajePage', () => {
  let component: PaginaReciclajePage;
  let fixture: ComponentFixture<PaginaReciclajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaReciclajePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaReciclajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
