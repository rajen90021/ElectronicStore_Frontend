import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProducttComponent } from './view-productt.component';

describe('ViewProducttComponent', () => {
  let component: ViewProducttComponent;
  let fixture: ComponentFixture<ViewProducttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProducttComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewProducttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
