import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersComponentComponent } from './admin-orders-component.component';

describe('AdminOrdersComponentComponent', () => {
  let component: AdminOrdersComponentComponent;
  let fixture: ComponentFixture<AdminOrdersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrdersComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrdersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
