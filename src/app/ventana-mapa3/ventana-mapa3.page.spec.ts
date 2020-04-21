import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VentanaMapa3Page } from './ventana-mapa3.page';

describe('VentanaMapa3Page', () => {
  let component: VentanaMapa3Page;
  let fixture: ComponentFixture<VentanaMapa3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentanaMapa3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VentanaMapa3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
