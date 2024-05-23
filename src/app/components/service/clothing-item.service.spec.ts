import { TestBed } from '@angular/core/testing';

import { ClothingItemService } from './clothing-item.service';

describe('ClothingItemService', () => {
  let service: ClothingItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClothingItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
