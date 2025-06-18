import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipTestComponent } from './tooltip-test.component';

describe('TooltipTestComponent', () => {
  let component: TooltipTestComponent;
  let fixture: ComponentFixture<TooltipTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TooltipTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
