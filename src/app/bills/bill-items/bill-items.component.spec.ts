import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItemsComponent } from './bill-items.component';

describe('BillItemsComponent', () => {
  let component: BillItemsComponent;
  let fixture: ComponentFixture<BillItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
