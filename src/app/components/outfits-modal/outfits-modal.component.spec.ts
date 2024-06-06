import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitsModalComponent } from './outfits-modal.component';

describe('OutfitsModalComponent', () => {
  let component: OutfitsModalComponent;
  let fixture: ComponentFixture<OutfitsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutfitsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
