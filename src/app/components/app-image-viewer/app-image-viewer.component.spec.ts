import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppImageViewerComponent } from './app-image-viewer.component';

describe('AppImageViewerComponent', () => {
  let component: AppImageViewerComponent;
  let fixture: ComponentFixture<AppImageViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppImageViewerComponent]
    });
    fixture = TestBed.createComponent(AppImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
