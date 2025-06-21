import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NumberService, PhoneNumber } from './number.service';

describe('NumberService', () => {
  let service: NumberService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NumberService]
    });
    service = TestBed.inject(NumberService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch numbers from API', () => {
    const mockNumbers: PhoneNumber[] = [
      {
        id: 1,
        phoneNumber: '+1234567890',
        status: 'active',
        messageCount: 15
      }
    ];

    service.getNumbers().subscribe(numbers => {
      expect(numbers).toEqual(mockNumbers);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/numbers');
    expect(req.request.method).toBe('GET');
    req.flush(mockNumbers);
  });

  it('should update number status', () => {
    const number: PhoneNumber = {
      id: 1,
      phoneNumber: '+1234567890',
      status: 'active',
      messageCount: 15
    };

    service.updateNumberStatus(1, 'inactive').subscribe(result => {
      expect(result.id).toBe(1);
      expect(result.status).toBe('inactive');
    });
  });

  it('should return authentication status', () => {
    expect(service.isAuthenticated()).toBe(true);
  });
});
