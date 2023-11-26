import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfDateComponent } from './out-of-date.component';

describe('OutOfDateComponent', () => {
  let component: OutOfDateComponent;
  let fixture: ComponentFixture<OutOfDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutOfDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutOfDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
