import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInputAutocompleteComponent } from './app-input-autocomplete.component';

describe('AppInputAutocompleteComponent', () => {
  let component: AppInputAutocompleteComponent;
  let fixture: ComponentFixture<AppInputAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInputAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppInputAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
