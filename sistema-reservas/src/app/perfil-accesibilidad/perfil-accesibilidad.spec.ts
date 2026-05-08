import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAccesibilidad } from './perfil-accesibilidad';

describe('PerfilAccesibilidad', () => {
  let component: PerfilAccesibilidad;
  let fixture: ComponentFixture<PerfilAccesibilidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilAccesibilidad],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilAccesibilidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
