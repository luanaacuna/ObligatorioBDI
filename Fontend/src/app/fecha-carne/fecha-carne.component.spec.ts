import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaCarneComponent } from './fecha-carne.component';

describe('FechaCarneComponent', () => {
  let component: FechaCarneComponent;
  let fixture: ComponentFixture<FechaCarneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechaCarneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FechaCarneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
