import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCarStatusComponent } from './live-car-status.component';

describe('LiveCarStatusComponent', () => {
  let component: LiveCarStatusComponent;
  let fixture: ComponentFixture<LiveCarStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveCarStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveCarStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
