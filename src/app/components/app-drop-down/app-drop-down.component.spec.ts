import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDropDownComponent } from './app-drop-down.component';

describe('AppDropDownComponent', () => {
  let component: AppDropDownComponent;
  let fixture: ComponentFixture<AppDropDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppDropDownComponent]
    });
    fixture = TestBed.createComponent(AppDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
