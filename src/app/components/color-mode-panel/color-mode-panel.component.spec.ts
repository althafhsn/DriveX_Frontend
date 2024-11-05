import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorModePanelComponent } from './color-mode-panel.component';

describe('ColorModePanelComponent', () => {
  let component: ColorModePanelComponent;
  let fixture: ComponentFixture<ColorModePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorModePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorModePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
