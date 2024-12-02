import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookingListComponent } from './all-booking-list.component';

describe('AllBookingListComponent', () => {
  let component: AllBookingListComponent;
  let fixture: ComponentFixture<AllBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBookingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
