import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCustomerDetailsComponent } from './booking-customer-details.component';

describe('BookingCustomerDetailsComponent', () => {
  let component: BookingCustomerDetailsComponent;
  let fixture: ComponentFixture<BookingCustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingCustomerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
