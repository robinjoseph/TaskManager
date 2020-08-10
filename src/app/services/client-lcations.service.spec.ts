import { TestBed } from '@angular/core/testing';

import { ClientLcationsService } from './client-lcations.service';

describe('ClientLcationsService', () => {
  let service: ClientLcationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLcationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
