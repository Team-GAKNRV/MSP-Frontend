import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingViewComponent } from './clothing-view.component';

describe('ClothingViewComponent', () => {
  let component: ClothingViewComponent;
  let fixture: ComponentFixture<ClothingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClothingViewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClothingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
