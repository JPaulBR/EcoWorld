import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VentanaMapaPage } from './ventana-mapa.page';

describe('VentanaMapaPage', () => {
  let component: VentanaMapaPage;
  let fixture: ComponentFixture<VentanaMapaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentanaMapaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VentanaMapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
