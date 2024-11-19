import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTripHistoryComponent } from './customer-trip-history.component';

describe('CustomerTripHistoryComponent', () => {
  let component: CustomerTripHistoryComponent;
  let fixture: ComponentFixture<CustomerTripHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTripHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTripHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
