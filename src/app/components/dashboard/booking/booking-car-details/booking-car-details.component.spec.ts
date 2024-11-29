import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCarDetailsComponent } from './booking-car-details.component';

describe('BookingCarDetailsComponent', () => {
  let component: BookingCarDetailsComponent;
  let fixture: ComponentFixture<BookingCarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingCarDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
