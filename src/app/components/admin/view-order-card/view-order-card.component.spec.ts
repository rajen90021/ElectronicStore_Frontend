import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderCardComponent } from './view-order-card.component';

describe('ViewOrderCardComponent', () => {
  let component: ViewOrderCardComponent;
  let fixture: ComponentFixture<ViewOrderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOrderCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
