import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTestComponent } from './product-test.component';

describe('ProductTestComponent', () => {
  let component: ProductTestComponent;
  let fixture: ComponentFixture<ProductTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
