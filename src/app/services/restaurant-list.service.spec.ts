import { TestBed } from '@angular/core/testing';

import { RestaurantListService } from './restaurant-list.service';

describe('RestaurantListService', () => {
  let service: RestaurantListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
