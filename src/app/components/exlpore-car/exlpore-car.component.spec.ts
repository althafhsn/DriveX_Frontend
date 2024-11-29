import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExlporeCarComponent } from './exlpore-car.component';

describe('ExlporeCarComponent', () => {
  let component: ExlporeCarComponent;
  let fixture: ComponentFixture<ExlporeCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExlporeCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExlporeCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
