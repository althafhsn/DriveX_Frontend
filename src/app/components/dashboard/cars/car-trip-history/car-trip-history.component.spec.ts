import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTripHistoryComponent } from './car-trip-history.component';

describe('CarTripHistoryComponent', () => {
  let component: CarTripHistoryComponent;
  let fixture: ComponentFixture<CarTripHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarTripHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarTripHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
