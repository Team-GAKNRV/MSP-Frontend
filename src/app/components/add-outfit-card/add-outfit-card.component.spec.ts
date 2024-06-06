import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutfitCardComponent } from './add-outfit-card.component';

describe('AddOutfitCardComponent', () => {
  let component: AddOutfitCardComponent;
  let fixture: ComponentFixture<AddOutfitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOutfitCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOutfitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
