import { TestBed, getTestBed } from '@angular/core/testing';
import{HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let injector: TestBed;
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
      providers: [CustomerService]
    });
    injector = getTestBed();
      service = injector.inject(CustomerService);
  });

  afterEach(() => { // ensures there are no outstanding requests between tests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
