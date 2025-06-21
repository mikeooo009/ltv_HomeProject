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
        id: '1',
        phoneNumber: '+1234567890',
        status: 'active',
        messageCount: 5,
        lastMessage: 'Test message',
        createdAt: '2024-01-01'
      }
    ];

    service.getNumbers().subscribe(numbers => {
      expect(numbers).toEqual(mockNumbers);
    });

    const req = httpMock.expectOne('https://quackr.free.beeceptor.com/numbers');
    expect(req.request.method).toBe('GET');
    req.flush(mockNumbers);
  });

  it('should handle API errors gracefully', () => {
    service.getNumbers().subscribe(numbers => {
      expect(numbers).toEqual([]);
    });

    const req = httpMock.expectOne('https://quackr.free.beeceptor.com/numbers');
    req.error(new ErrorEvent('Network error'));
  });

  it('should update number status', () => {
    service.updateNumberStatus('1', 'inactive').subscribe(result => {
      expect(result).toBe(true);
    });
  });

  it('should handle login', () => {
    service.login('admin', 'password').subscribe(result => {
      expect(result).toBe(true);
    });
  });
});
