import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitsModalClothingCardComponent } from './outfits-modal-clothing-card.component';

describe('OutfitsModalClothingCardComponent', () => {
  let component: OutfitsModalClothingCardComponent;
  let fixture: ComponentFixture<OutfitsModalClothingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitsModalClothingCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutfitsModalClothingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
