import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRevenueDetailsComponent } from './car-revenue-details.component';

describe('CarRevenueDetailsComponent', () => {
  let component: CarRevenueDetailsComponent;
  let fixture: ComponentFixture<CarRevenueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarRevenueDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarRevenueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
