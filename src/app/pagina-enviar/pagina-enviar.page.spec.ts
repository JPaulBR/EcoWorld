import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaginaEnviarPage } from './pagina-enviar.page';

describe('PaginaEnviarPage', () => {
  let component: PaginaEnviarPage;
  let fixture: ComponentFixture<PaginaEnviarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaEnviarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaEnviarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
