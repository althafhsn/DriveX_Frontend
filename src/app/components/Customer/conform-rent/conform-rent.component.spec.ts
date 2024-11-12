import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformRentComponent } from './conform-rent.component';

describe('ConformRentComponent', () => {
  let component: ConformRentComponent;
  let fixture: ComponentFixture<ConformRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConformRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConformRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
