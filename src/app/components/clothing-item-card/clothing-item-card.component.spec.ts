import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingItemCardComponent } from './clothing-item-card.component';

describe('ClothingItemCardComponent', () => {
  let component: ClothingItemCardComponent;
  let fixture: ComponentFixture<ClothingItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClothingItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClothingItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
