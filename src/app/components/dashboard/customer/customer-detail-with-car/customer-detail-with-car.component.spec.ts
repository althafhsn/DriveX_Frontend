import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailWithCarComponent } from './customer-detail-with-car.component';

describe('CustomerDetailWithCarComponent', () => {
  let component: CustomerDetailWithCarComponent;
  let fixture: ComponentFixture<CustomerDetailWithCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDetailWithCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailWithCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
