import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/components/Customer/landing-page/brand/brand.component.spec.ts
import { BrandComponent } from './brand.component';

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandComponent);
========
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
>>>>>>>> 8ec732e0f4f75ce7018fb7d67811950255b288ae:src/app/components/dashboard/dashboard.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
