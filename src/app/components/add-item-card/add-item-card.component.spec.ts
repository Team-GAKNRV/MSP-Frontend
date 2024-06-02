import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemCardComponent } from './add-item-card.component';

describe('AddItemCardComponent', () => {
  let component: AddItemCardComponent;
  let fixture: ComponentFixture<AddItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddItemCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
