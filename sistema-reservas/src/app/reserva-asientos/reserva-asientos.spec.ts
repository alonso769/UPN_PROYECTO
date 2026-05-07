import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaAsientos } from './reserva-asientos';

describe('ReservaAsientos', () => {
  let component: ReservaAsientos;
  let fixture: ComponentFixture<ReservaAsientos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaAsientos],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaAsientos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
