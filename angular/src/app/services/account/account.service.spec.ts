import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AccountService } from './account.service';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Configuration } from './config';
const accounts = require('./data.json');

describe('HttpClient testing', () => {
  let service: AccountService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let config: Configuration


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        AccountService,
        Configuration
      ]
    });
    
    // Inject the http service and test controller for each test
    service = TestBed.inject(AccountService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    config = TestBed.inject(Configuration);
  });

  it('can test AccountService.get', () => {
    
    //const mockData = ACCOUNT;
    //const testData: Data = {name: 'Test Data'};
    // const testAccount = ACCOUNT;
    let url = './data.json';

    

    httpClient.get<Account>(url).subscribe(data => expect(data));
    
    service.get().subscribe(data => expect(data));
    console.log(JSON.stringify(accounts));
    
    // const req = httpTestingController.expectOne(req => req.method === 'GET' && req.url === 'http://example.org');
    const req = httpTestingController.expectOne('/data'); 
    console.log(req.request.url+ ' HERREEEEEEEEEEEEEEEEEEE!!!!!!!!!!');


    

    //expect(req.request.method).toEqual('GET');

    //req.flush(testData)

    //httpTestingController.verify();    
    
    //expect(service).toBeTruthy();
  });
});



