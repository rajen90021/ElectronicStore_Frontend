import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCategoriesViewComponent } from './single-categories-view.component';

describe('SingleCategoriesViewComponent', () => {
  let component: SingleCategoriesViewComponent;
  let fixture: ComponentFixture<SingleCategoriesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleCategoriesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleCategoriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
