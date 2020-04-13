import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VentanaMapa2Page } from './ventana-mapa2.page';

describe('VentanaMapa2Page', () => {
  let component: VentanaMapa2Page;
  let fixture: ComponentFixture<VentanaMapa2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentanaMapa2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VentanaMapa2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
