import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileInputComponent } from './add-file-input.component';

describe('AddFileInputComponent', () => {
  let component: AddFileInputComponent;
  let fixture: ComponentFixture<AddFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFileInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
