import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSetComponent } from './profile-set.component';

describe('ProfileSetComponent', () => {
  let component: ProfileSetComponent;
  let fixture: ComponentFixture<ProfileSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
