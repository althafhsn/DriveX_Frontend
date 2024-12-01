import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingRentalHistoryComponent } from './ongoing-rental-history.component';

describe('OngoingRentalHistoryComponent', () => {
  let component: OngoingRentalHistoryComponent;
  let fixture: ComponentFixture<OngoingRentalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OngoingRentalHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingRentalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
