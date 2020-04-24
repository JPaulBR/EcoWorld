import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaginaUsuariosPage } from './pagina-usuarios.page';

describe('PaginaUsuariosPage', () => {
  let component: PaginaUsuariosPage;
  let fixture: ComponentFixture<PaginaUsuariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaUsuariosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
